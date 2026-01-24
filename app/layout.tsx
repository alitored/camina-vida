import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FloatingCTA from "@/components/FloatingCTA";
import { FormProvider } from "@/components/FormContext";
import LeadForm from "@/components/LeadForm";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '700', '900'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '700', '900'], style: ['italic', 'normal'] })

export const metadata = {
  metadataBase: new URL('https://www.caminavida.com.ar'), // Corrige error de consola Next.js
  title: 'Caminata Terapéutica Plaza Irlanda | Camina Vida',
  description: 'Unite a nuestra comunidad en Caballito el 14 de febrero.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-irlanda-crema text-irlanda-dark antialiased`}>
        <FormProvider>
          {children}
          <LeadForm />
          <FloatingCTA />
          <WhatsAppFloat />
        </FormProvider>
      </body>
    </html>
  )
}