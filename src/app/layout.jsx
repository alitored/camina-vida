import './globals.css';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Header from '@/components/Header.jsx';
import Image from 'next/image';
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://buenas-caminatas.vercel.app/'),
  title: 'Camina Vida',
  description: 'Caminatas terapéuticas para mejorar tu salud física y emocional.',
  openGraph: {
    title: 'Camina Vida | Sembramos pasos, cosechamos Vida',
    description: 'Caminatas terapéuticas para mejorar tu salud física y emocional.',
    url: 'https://buenas-caminatas.vercel.app/',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="bg-fondo text-texto font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-verde-oscuro text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/logo.jpeg"
              alt="Logo Caminatas"
              width={40}
              height={40}
              className="h-10 w-10 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold">camina vida</h3>
            <p className="text-sm text-white/80">sembramos pasos, cosechamos vida</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>📧 hola@caminatassaludables.com</li>
              <li>📱 +54 9 11 1234-5678</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Legales</h3>
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
        <div className="border-t border-white/30 pt-8 text-center">
          <p className="text-xs text-white/50">© 2024 Camina Vida. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
