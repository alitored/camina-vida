"use client";

import React from "react";
import { motion } from "framer-motion";

interface Paso {
  numero: string;
  titulo: string;
  descripcion: string;
}

export default function Method() {
  const pasos: Paso[] = [
    { numero: "01", titulo: "Estiramientos", descripcion: "Movimientos suaves para preparar el cuerpo y despertar la consciencia física." },
    { numero: "02", titulo: "Respiración", descripcion: "Técnicas de pranayama para relajar el sistema nervioso y oxigenar cada célula." },
    { numero: "03", titulo: "Caminata", descripcion: "Ejercicio moderado y consciente, conectando el ritmo del corazón con el entorno." },
    { numero: "04", titulo: "Meditación", descripcion: "Momentos de silencio y atención plena para integrar el bienestar alcanzado." },
    { numero: "05", titulo: "Cierre en grupo", descripcion: "Un espacio de reflexión y conexión humana para terminar la experiencia." },
  ];

  return (
    <section id="metodo" className="px-6 py-24 bg-irlanda-crema relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          {/* 5.0 LÍNEA INTRODUCTORIA */}
          <span className="text-irlanda-coral font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">
            Así se vive la experiencia Camina Vida
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-irlanda-dark leading-tight">
            Un método pensado para <br />
            <span className="italic text-irlanda-coral">tu equilibrio integral</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-irlanda-verde/10 -translate-y-1/2 z-0" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {pasos.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="group flex flex-col items-start lg:items-center lg:text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-irlanda-verde/10 flex items-center justify-center mb-8 shadow-sm group-hover:border-irlanda-coral group-hover:shadow-xl group-hover:shadow-irlanda-coral/10 transition-all duration-500 bg-white">
                  <span className="text-2xl font-serif text-irlanda-coral">{p.numero}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-irlanda-dark tracking-tight group-hover:text-irlanda-coral transition-colors duration-300">{p.titulo}</h3>
                  <div className="w-8 h-[2px] bg-irlanda-coral/30 lg:mx-auto group-hover:w-16 group-hover:bg-irlanda-coral transition-all duration-500" />
                  <p className="text-irlanda-dark/60 font-light leading-relaxed text-sm">{p.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="px-8 py-3 rounded-full bg-white border border-irlanda-verde/10 shadow-sm">
            <p className="text-irlanda-coral text-xs font-bold uppercase tracking-widest">Experiencia de 120 minutos en total</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}