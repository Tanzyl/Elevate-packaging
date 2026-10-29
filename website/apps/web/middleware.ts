import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "pp_session";

/**
 * Verify an HS256 JWT (signature + exp) using WebCrypto, which is available in
 * the Edge middleware runtime. Hand-rolled instead of pulling in `jose` because
 * this is the only JWT the web app ever inspects.
 *
 * Returns false on anything suspicious: wrong shape, wrong algorithm, bad
 * signature, missing/expired exp.
 */
async function isValidSession(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [headerB64, payloadB64, signatureB64] = parts;

  const decode = (b64url: string) => {
    const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
    return atob(b64 + pad);
  };

  try {
    const header = JSON.parse(decode(headerB64)) as { alg?: string };
    // Reject alg confusion / unsigned tokens outright.
    if (header.alg !== "HS256") return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const rawSig = decode(signatureB64);
    const sigBytes = Uint8Array.from(rawSig, (c) => c.charCodeAt(0));
    const signedOk = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(`${headerB64}.${payloadB64}`)
    );
    if (!signedOk) return false;

    const payload = JSON.parse(decode(payloadB64)) as { exp?: number };
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Compare case-insensitively: the matcher below is case-insensitive, so a
  // case-varied path like /ADMIN/products reached this function but slipped
  // past a case-sensitive startsWith("/admin") check un-gated.
  if (!pathname.toLowerCase().startsWith("/admin")) {
    return NextResponse.next();
  }

  // The admin panel talks to the NestJS API, which is NOT deployed to
  // production (see CLAUDE.md → Deployment). Shipping it on the public domain
  // is pure attack surface, so it is off unless explicitly enabled. Fail
  // closed: no ADMIN_ENABLED, no admin — not even the login page.
  const adminEnabled =
    process.env.NODE_ENV !== "production" || process.env.ADMIN_ENABLED === "true";
  if (!adminEnabled) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "content-type": "text/plain", "x-robots-tag": "noindex" }
    });
  }

  // Login page is the only /admin/* route reachable without a session.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.JWT_SECRET;
  const isProd = process.env.NODE_ENV === "production";

  // A cookie must exist AND carry a valid, unexpired signature. Presence alone
  // previously let anyone render the admin shell with `Cookie: pp_session=x`.
  //
  // JWT_SECRET is not part of apps/web's env by default (the shared
  // website/.env is loaded by the API, not by Next), so signature checking is
  // opt-in: set JWT_SECRET for this app — matching the API's — to enable it.
  // Without the secret we cannot verify anything, so:
  //   - production (admin explicitly enabled): refuse. Never fall back to a
  //     presence check on a public origin; that is not authentication.
  //   - local dev: allow presence, because localhost admin work is the only
  //     reason this panel exists and there is no trust boundary to cross.
  let authorized = Boolean(token);
  if (authorized) {
    if (secret) {
      authorized = await isValidSession(token!, secret);
    } else if (isProd) {
      authorized = false;
    }
  }

  if (!authorized) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    const res = NextResponse.redirect(url);
    // Clear the rejected cookie so a tampered value can't linger.
    if (token) res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
