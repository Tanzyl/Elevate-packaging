import { site } from "@/lib/site-config";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.02 0C5.43 0 .1 5.33.1 11.92a11.85 11.85 0 0 0 1.59 5.94L0 24l6.28-1.65a11.92 11.92 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.33 11.92-11.92a11.83 11.83 0 0 0-3.43-8.41Zm-8.5 18.33h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.63-.23-.38a9.86 9.86 0 0 1-1.51-5.27c0-5.46 4.45-9.9 9.92-9.9a9.87 9.87 0 0 1 9.89 9.9c0 5.46-4.44 9.89-9.93 9.89Zm5.45-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.93-2.25-.24-.58-.49-.5-.68-.51-.17 0-.38-.02-.58-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const href = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${site.brand}, I have a question about your packaging.`
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      translate="no"
      className="notranslate fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition hover:scale-105 hover:bg-emerald-400"
    >
      <WhatsAppIcon className="h-6 w-6 fill-current" />
    </a>
  );
}
