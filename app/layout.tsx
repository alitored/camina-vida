import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif' 
})

export const metadata = {
  title: 'Registro Caminata Terapéutica Plaza Irlanda | Camina Vida',
  description: 'Unite a nuestra comunidad en Caballito el 14 de febrero. Una experiencia de mindfulness y bienestar integral en Plaza Irlanda.',
  keywords: ['Caminata terapéutica', 'Plaza Irlanda', 'Caballito', 'Salud mental', 'Mindfulness Buenos Aires', 'Bienestar emocional'],
  openGraph: {
    title: 'Camina Vida - Plaza Irlanda 2026',
    description: 'Reserva tu lugar para la caminata del 14 de febrero en Caballito.',
    url: 'https://www.caminavida.com.ar',
    siteName: 'Camina Vida',
    images: [{ url: '/og-irlanda.webp', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-irlanda-crema text-irlanda-dark antialiased`}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}