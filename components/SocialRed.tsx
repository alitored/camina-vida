"use client";

import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function CaminaVidaSocial() {
  return (
    <section className="bg-irlanda-crema py-24 px-6 relative overflow-hidden">
      {/* Elementos decorativos de fondo sutiles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-irlanda-verde/10 to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-irlanda-coral font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">
            Nuestra Comunidad
          </span>
          
          <h2 className="text-4xl md:text-5xl font-serif text-irlanda-dark mb-6 leading-tight">
            Camina Vida en <span className="italic">redes sociales</span>
          </h2>
          
          <p className="text-irlanda-dark/60 mb-12 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Seguinos para ver fotos de nuestras salidas, consejos de bienestar y sumarte a una comunidad en constante movimiento.
          </p>

          <div className="flex justify-center gap-6">
            {/* Instagram Link */}
            <a
              href="https://www.threads.com/@caminavidaagencia"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-20 h-20 bg-white border border-irlanda-soft rounded-premium shadow-sm hover:shadow-xl hover:border-irlanda-coral/30 hover:-translate-y-2 transition-all duration-500"
            >
              <Instagram className="text-irlanda-dark group-hover:text-irlanda-coral transition-colors duration-300" size={32} strokeWidth={1.5} />
            </a>

            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/share/17WeWALEJ9/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-20 h-20 bg-white border border-irlanda-soft rounded-premium shadow-sm hover:shadow-xl hover:border-irlanda-coral/30 hover:-translate-y-2 transition-all duration-500"
            >
              <Facebook className="text-irlanda-dark group-hover:text-irlanda-coral transition-colors duration-300" size={32} strokeWidth={1.5} />
            </a>
          </div>

          <div className="mt-16 inline-block">
            <p className="text-[11px] font-bold text-irlanda-verde tracking-widest uppercase py-2 px-6 border border-irlanda-verde/20 rounded-full">
              @caminavidaagencia
            </p>
          </div>
        </motion.div>
      </div>

      {/* Sombra decorativa inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-irlanda-verde/5 blur-3xl rounded-full -z-10" />
    </section>
  );
}