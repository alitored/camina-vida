'use client';

export default function BotonWhatsapFlot() {
  return (
    <a
      href="https://wa.me/5491151501147?text=Hola%20!%20Quiero%20consultar%20sobre%20Camina%20Vida"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl p-4 transition-all"
      aria-label="WhatsApp Camina Vida"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="28"
        height="28"
      >
        <path d="M20.52 3.48A11.87 11.87 0 0012.07 0C5.4 0 .07 5.33.07 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.93 11.93 0 005.87 1.5h.01c6.66 0 12.09-5.43 12.09-12.1 0-3.23-1.26-6.26-3.55-8.55zM12.07 22.1c-1.8 0-3.56-.48-5.1-1.38l-.36-.21-3.68.96.98-3.58-.23-.37a9.96 9.96 0 01-1.52-5.33c0-5.5 4.48-9.98 9.98-9.98 2.67 0 5.18 1.04 7.07 2.93a9.94 9.94 0 012.93 7.06c0 5.5-4.48 9.98-9.98 9.98zm5.66-7.54l-1.6-.8c-.22-.11-.48-.05-.65.13l-.83.96a.51.51 0 01-.64.1c-.68-.34-2.97-1.45-4.23-4.13a.51.51 0 01.1-.64l.96-.83c.18-.17.24-.43.13-.65l-.8-1.6a.52.52 0 00-.58-.27c-.64.16-1.38.52-1.9 1.04-1.03 1.03-1.2 2.57-.43 4.3.76 1.72 2.3 3.58 5.3 4.9.74.32 1.42.48 2.05.48.9 0 1.66-.3 2.2-.84.52-.52.88-1.26 1.04-1.9a.52.52 0 00-.27-.58z" />
      </svg>
    </a>
  );
}
