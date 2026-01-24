import './globals.css'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FloatingCTA from "@/components/FloatingCTA";
import { FormProvider } from "@/components/FormContext";
import LeadForm from "@/components/LeadForm";

// La Sans que convierte: DM Sans para Headings directos, Body y CTAs
const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm-sans', 
  weight: ['400', '500', '700'],
  display: 'swap'
})

// La Serif que enamora: Playfair para acentos emocionales y citas
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif', 
  weight: ['400', '700'], 
  style: ['italic', 'normal'],
  display: 'swap'
})

export const metadata = {
  metadataBase: new URL('https://www.caminavida.com.ar'),
  title: 'Caminata Terapéutica Plaza Irlanda | Camina Vida',
  description: 'Unite a nuestra comunidad en Caballito el 14 de febrero.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans bg-irlanda-crema text-irlanda-dark antialiased`}>
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