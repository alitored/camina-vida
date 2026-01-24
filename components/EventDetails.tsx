"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";

interface Detail {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function EventDetails() {
  const details: Detail[] = [
    {
      icon: <Calendar className="text-irlanda-coral" size={28} strokeWidth={1.5} />,
      label: "Cuándo",
      value: "Sábado 14 de Febrero — 09:00hs",
    },
    {
      icon: <MapPin className="text-irlanda-coral" size={28} strokeWidth={1.5} />,
      label: "Dónde",
      value: "Plaza Irlanda, Caballito - Avenida Gaona, esquina Donato Álvarez",
    },
    {
      icon: <Ticket className="text-irlanda-coral" size={28} strokeWidth={1.5} />,
      label: "Inversión",
      value: "$7.000",
    },
  ];

  return (
    <section id="detalles" className="bg-irlanda-crema py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado sutil */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-irlanda-coral font-bold tracking-[0.2em] uppercase text-[10px] block mb-4"
          >
            Coordinación Profesional
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-serif text-irlanda-dark leading-tight">
            Detalles de la <span className="italic">experiencia</span>
          </h2>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {details.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group bg-white p-10 rounded-premium border border-irlanda-soft/50 shadow-premium hover:shadow-2xl hover:border-irlanda-coral/20 transition-all duration-500 text-center"
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <div className="p-4 bg-irlanda-crema rounded-2xl shadow-inner">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="text-xs font-bold uppercase tracking-widest text-irlanda-verde mb-3">
                {item.label}
              </h3>
              
              <p className="text-xl font-medium text-irlanda-dark leading-relaxed">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Nota aclaratoria */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 text-irlanda-dark/40 text-sm font-light italic"
        >
          * En caso de lluvia, la actividad se reprograma con previo aviso.
        </motion.p>
      </div>
    </section>
  );
}