"use client";

import React from "react";
import { HeartPulse, Wind, Users2, Activity } from "lucide-react";

interface Beneficio {
  titulo: string;
  descripcion: string;
  icon: React.ReactNode;
  color: string;
}

export default function Beneficios() {
  const beneficios: Beneficio[] = [
    {
      titulo: "Menos dolor articular",
      descripcion:
        "Estiramientos y movimientos suaves diseñados para lubricar articulaciones y ganar flexibilidad sin impacto.",
      icon: <Activity className="text-irlanda-coral" size={32} strokeWidth={1.5} />,
      color: "bg-[#FFF4F0]", // Melocotón muy suave
    },
    {
      titulo: "Circulación y corazón",
      descripcion:
        "Fortalecemos tu salud cardiovascular con un ritmo moderado y constante que oxigena todo tu cuerpo.",
      icon: <HeartPulse className="text-irlanda-coral" size={32} strokeWidth={1.5} />,
      color: "bg-[#F0F7FF]", // Azul cielo suave
    },
    {
      titulo: "Baja ansiedad y estrés",
      descripcion:
        "Técnicas de respiración consciente y mindfulness en movimiento para silenciar la mente y reducir el cortisol.",
      icon: <Wind className="text-irlanda-coral" size={32} strokeWidth={1.5} />,
      color: "bg-[#F5F0FF]", // Lavanda suave
    },
    {
      titulo: "Comunidad y compromiso",
      descripcion:
        "Forma parte de un grupo que comparte tus valores, brindando apoyo mutuo y motivación en cada paso.",
      icon: <Users2 className="text-irlanda-coral" size={32} strokeWidth={1.5} />,
      color: "bg-irlanda-crema", 
    },
  ];

  return (
    <section id="beneficios" className="px-6 py-24 bg-irlanda-crema">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera Estilo Editorial */}
        <div className="text-center mb-20">
          <span className="text-irlanda-coral font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">
            El impacto del movimiento
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-irlanda-dark mb-6 leading-tight">
            Beneficios reales, <br />
            <span className="italic text-irlanda-coral">
              respaldados por la experiencia
            </span>
          </h2>
          <div className="w-12 h-1 bg-irlanda-coral/20 mx-auto rounded-full mb-8" />
          <p className="text-irlanda-dark/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Más que una simple caminata: diseñamos una experiencia terapéutica
            integral que conecta tu cuerpo, mente y emociones.
          </p>
        </div>

        {/* Grid de Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="group p-10 bg-white rounded-premium shadow-premium border border-irlanda-soft/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-8">
                
                {/* Contenedor de Icono */}
                <div
                  className={`flex-shrink-0 w-20 h-20 ${b.color} rounded-[2rem] flex items-center justify-center transition-transform duration-700 group-hover:rotate-[10deg] shadow-inner`}
                >
                  {b.icon}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-irlanda-dark">
                    {b.titulo}
                  </h3>
                  <p className="text-irlanda-dark/60 leading-relaxed font-light text-base">
                    {b.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cita de Autoridad */}
        <div className="mt-20 p-8 bg-white border border-dashed border-irlanda-coral/30 rounded-premium text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-irlanda-dark/80 italic font-serif text-xl leading-relaxed">
            "Caminar es la mejor medicina del hombre."
          </p>
          <span className="text-irlanda-coral text-xs font-bold uppercase tracking-widest mt-3 block">
            — Hipócrates
          </span>
        </div>
      </div>
    </section>
  );
}