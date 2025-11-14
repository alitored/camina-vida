import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
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
    <html lang="es" className={poppins.variable}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
