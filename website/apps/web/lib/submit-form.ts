// Client-side form submission for a static-hostable site: POSTs the form's
// fields directly to a form-handling service (Formspree, Web3Forms, Basin, …)
// set via NEXT_PUBLIC_FORM_ENDPOINT. No backend/API required, so it works on
// plain static hosting (e.g. Bluehost public_html) as well as anywhere else.
//
// Set NEXT_PUBLIC_FORM_ENDPOINT to your form endpoint, e.g.
//   https://formspree.io/f/xxxxxxxx
// Returns "sent" | "error" | "unconfigured".

export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export async function submitForm(
  form: HTMLFormElement,
  extra?: Record<string, string>
): Promise<"sent" | "error" | "unconfigured"> {
  if (!FORM_ENDPOINT) return "unconfigured";
  try {
    const data = new FormData(form);
    if (extra) for (const [k, v] of Object.entries(extra)) data.set(k, v);
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });
    if (!res.ok) return "error";
    // FormSubmit answers HTTP 200 with success:"false" (e.g. form not yet activated).
    const body = await res.json().catch(() => null);
    return body?.success === false || body?.success === "false" ? "error" : "sent";
  } catch {
    return "error";
  }
}
