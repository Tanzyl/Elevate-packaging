import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";

export const SESSION_COOKIE = "pp_session";

/**
 * Resolve the JWT signing secret, refusing to boot without a real one.
 *
 * There used to be a `?? "change-me-in-prod"` fallback here and in
 * auth.module.ts. Since that literal is published in this repo (and in
 * .env.example), any deploy that forgot to set JWT_SECRET could be handed a
 * self-signed `{ role: "ADMIN" }` token by anyone who read the source. Failing
 * to start is the only safe behaviour for a missing auth secret.
 */
export function requireJwtSecret(cfg: ConfigService): string {
  const secret = cfg.get<string>("JWT_SECRET");
  if (!secret || secret.length < 32 || /change-me/i.test(secret)) {
    throw new Error(
      "JWT_SECRET must be set to a random value of at least 32 characters " +
        "(generate one with: openssl rand -base64 48)"
    );
  }
  return secret;
}

function cookieExtractor(req: Request): string | null {
  const raw = (req?.cookies as Record<string, string> | undefined)?.[SESSION_COOKIE];
  return raw ?? null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    cfg: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      // Pin the algorithm so a token can never be accepted under a different one.
      algorithms: ["HS256"],
      secretOrKey: requireJwtSecret(cfg)
    });
  }

  /**
   * Re-read the user (and crucially the role) from the database on every
   * request. Trusting the `role` claim off the token meant a demoted or deleted
   * account kept its old privileges until the token expired, with no way to
   * revoke it.
   */
  async validate(payload: { sub?: string }) {
    if (!payload?.sub) throw new UnauthorizedException();

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true }
    });
    if (!user) throw new UnauthorizedException();

    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    };
  }
}
