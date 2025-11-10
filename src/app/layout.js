// app/layout.tsx
'use client';

import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BotonWhatsapFlot from '@/components/BotonWhatsapFlot';

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
      <body className="bg-fondo-claro text-texto-oscuro font-sans relative overflow-x-hidden">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BotonWhatsapFlot />
      </body>
    </html>
  );
}