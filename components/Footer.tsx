"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Datos reales unificados
  const instagramUrl = "https://www.threads.com/@caminavidaagencia";
  const facebookUrl = "https://www.facebook.com/share/17WeWALEJ9/";
  const whatsappUrl = "https://wa.me/5491151501147?text=consulta-caminata";

  return (
    <footer className="bg-irlanda-crema px-4 pb-4">
      <div className="bg-irlanda-dark text-white rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
        
        {/* ✅ Versión Desktop */}
        <div className="hidden md:grid max-w-7xl mx-auto px-12 py-20 grid-cols-4 gap-12">
          
          {/* BRAND */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif italic text-white leading-none">
              Camina <span className="text-irlanda-coral">Vida</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
              Sembramos pasos, cosechamos salud y bienestar integral en Plaza Irlanda.
            </p>
            
            <div className="flex gap-4 text-xl">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-2xl text-white hover:bg-irlanda-coral transition-all duration-300 group"
              >
                <FaInstagram className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-2xl text-white hover:bg-irlanda-coral transition-all duration-300 group"
              >
                <FaFacebook className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-2xl text-white hover:bg-irlanda-coral transition-all duration-300 group"
              >
                <FaWhatsapp className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* NAVEGACIÓN */}
          <div>
            <h4 className="font-bold text-irlanda-coral uppercase tracking-widest text-[10px] mb-6">
              Navegación
            </h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><Link href="#beneficios" className="hover:text-white transition-colors">Beneficios</Link></li>
              <li><Link href="#metodo" className="hover:text-white transition-colors">Método</Link></li>
              <li><Link href="#detalles" className="hover:text-white transition-colors">Detalles del Evento</Link></li>
              <li><Link href="#registro" className="hover:text-white transition-colors">Inscripción</Link></li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="font-bold text-irlanda-coral uppercase tracking-widest text-[10px] mb-6">
              Contacto
            </h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>info@caminavida.com.ar</li>
              <li>+54 9 11 5150 1147</li>
              <li className="pt-2 italic text-white/30 font-serif">
                Caballito, Buenos Aires
              </li>
            </ul>
          </div>

         {/* Sección de LEGALES dentro del Footer.tsx */}
<div>
  <h4 className="font-bold text-irlanda-coral uppercase tracking-widest text-[10px] mb-6">
    Legales
  </h4>
  <ul className="space-y-3 text-white/70 text-sm">
    {/* Enlace actualizado a la página de Privacidad */}
    <li>
      <Link href="/privacidad" className="hover:text-white transition-colors">
        Privacidad
      </Link>
    </li>
    {/* Enlace actualizado a la página de Términos */}
    <li>
      <Link href="/terminos" className="hover:text-white transition-colors">
        Términos
      </Link>
    </li>
  </ul>
</div>
        </div>

        {/* ✅ Versión Compacta Mobile */}
        <div className="md:hidden px-8 py-16 text-center space-y-10">
          <h3 className="text-3xl font-serif italic text-white">
            Camina <span className="text-irlanda-coral">Vida</span>
          </h3>

          <div className="flex justify-center gap-6">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl text-white active:bg-irlanda-coral">
              <FaInstagram size={24} />
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl text-white active:bg-irlanda-coral">
              <FaFacebook size={24} />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl text-white active:bg-irlanda-coral">
              <FaWhatsapp size={24} />
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-y-4 gap-x-2 text-white/70 text-sm font-medium">
            <Link href="#beneficios">Beneficios</Link>
            <Link href="#metodo">Método</Link>
            <Link href="#detalles">Detalles</Link>
            <Link href="#registro">Registro</Link>
          </nav>

          <div className="h-[1px] bg-white/10 w-full" />

          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
            © {currentYear} Camina Vida • Todos los derechos reservados
          </p>
        </div>

        <div className="h-2 bg-irlanda-coral w-full opacity-90" />
      </div>
    </footer>
  );
}