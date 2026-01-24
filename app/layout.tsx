import './globals.css'
import { DM_Sans } from 'next/font/google' // Cambiado a DM Sans
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FloatingCTA from "@/components/FloatingCTA";
import { FormProvider } from "@/components/FormContext";
import LeadForm from "@/components/LeadForm";

// Configuración de pesos: 400 (Regular), 500 (Medium), 600 (Semibold)
const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm-sans', 
  weight: ['400', '500', '600'] 
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
      <body className={`${dmSans.variable} font-sans bg-irlanda-crema text-irlanda-dark antialiased`}>
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