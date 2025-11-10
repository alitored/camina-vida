// components/Footer.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-verde-oscuro text-white py-12" aria-label="Footer institucional">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Bloque superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Marca institucional */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative shrink-0">
              <Image
                src="/logo-vida.png" // 👈 Asegúrate de que este archivo exista en /public/
                alt="Logo Camina Vida"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <h3 className="text-lg font-semibold">camina vida</h3>
              <p className="text-sm text-white/80">sembramos pasos, cosechamos vida</p>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>📧 <a href="mailto:hola@caminatassaludables.com" className="hover:underline">hola@caminatassaludables.com</a></li>
              <li>📱 <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="hover:underline">+54 9 11 1234-5678</a></li>
            </ul>
          </div>

          {/* Enlaces legales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legales</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/notion-page/privacy" className="hover:underline text-white">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/notion-page/consent" className="hover:underline text-white">
                  Consentimiento Informado
                </Link>
              </li>
              <li>
                <Link href="/notion-page/terms" className="hover:underline text-white">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie institucional */}
        <div className="border-t border-white/30 pt-8 text-center">
          <p className="text-xs text-white/50">
            © 2024 Camina Vida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}