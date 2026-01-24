"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion"; // Asegurate de tener framer-motion instalado

export default function Hero() {
  return (
    <section className="relative isolate min-h-[95dvh] flex items-center justify-center overflow-hidden">
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gente.webp" 
          alt="Caminata en Plaza Irlanda"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-irlanda-dark/70 via-irlanda-dark/30 to-irlanda-crema" />
      </div>

      <div className="text-center px-6 max-w-5xl mx-auto mt-12">
        {/* EFECTO DE MOVIMIENTO EN LA FECHA */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-irlanda-coral font-bold tracking-[0.3em] uppercase text-[11px] mb-6"
        >
          Sábado <span className="relative inline-block font-black text-white underline decoration-wavy animate-pulse drop-shadow-[0_0_8px_#ff7a5c] px-1">14 de Febrero</span> • Plaza Irlanda
        </motion.span>

        {/* TÍTULO CON REVELADO GRADUAL */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1]"
        >
          Caminamos y <br />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="italic text-irlanda-coral"
          >
            recibimos vida
          </motion.span>
        </motion.h1>

        {/* PARRAFO CON ENTRADA SUAVE */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Regalate salud este <span className="font-bold text-irlanda-coral">14 de Febrero</span>. Una caminata guiada en Caballito para reconectar.
        </motion.p>

        {/* BOTONES CON EFECTO HOVER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#reserva" 
            className="btn-primary"
          >
            Reservar mi lugar
          </motion.a>
          <motion.a 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            href="#detalles" 
            className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl transition-all text-center"
          >
            Ver detalles
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}