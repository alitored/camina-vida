"use client";

import { useForm } from "./FormContext";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  const { openForm } = useForm();

  return (
    <section className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden bg-emerald-950 text-white px-6">
      
      {/* CAPA 1: La foto de Plaza Irlanda */}
      <div className="absolute inset-0 z-0 bg-[url('/hero-bg.webp')] bg-cover bg-center" />
      
      {/* CAPA 2: Overlay Verde Oscuro (Sustituye al gradiente) */}
      {/* Ajustamos la opacidad (80%) para que la plaza se vea pero el texto mande */}
      <div className="absolute inset-0 z-[1] bg-emerald-950/80 mix-blend-multiply" />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-6">
        
        {/* Headline: Sans SemiBold - Sin alteraciones de estilo */}
        <h1 className="text-4xl md:text-7xl font-sans font-semibold leading-tight tracking-tight text-white">
          Caminata Terapéutica <br /> 
          en Plaza Irlanda
        </h1>

        {/* Countdown Timer: Visible sin scroll */}
        <div className="w-full max-w-md py-2">
          <CountdownTimer targetDate="2026-02-14T09:30:00-03:00" />
        </div>

        {/* Propuesta de Valor: Sans Regular */}
        <p className="text-lg md:text-xl font-sans font-normal text-white/95 max-w-2xl leading-relaxed">
          Experiencia terapéutica guiada · Sábado 14 de febrero · Plaza Irlanda · Cupos limitados
        </p>

        {/* CTA PRINCIPAL: Reservá tu lugar – Cupos limitados */}
        <div className="flex flex-col items-center gap-4 mt-4 w-full">
          <button 
            onClick={openForm}
            className="w-full md:w-auto bg-[#FF5C35] text-white px-10 py-5 rounded-2xl font-sans font-bold text-xl md:text-2xl uppercase shadow-2xl hover:scale-105 transition-transform active:scale-95 cursor-pointer border-2 border-white/20"
          >
            Reservá tu lugar – Cupos limitados
          </button>
          
          <span className="text-sm md:text-base font-sans font-medium text-white/90">
            +200 asistentes • Guiado por profesionales certificados
          </span>
        </div>

        {/* CREDENCIALES: Texto integrado sin fondos ni cápsulas */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-white/80">
          <span>Coordinadores capacitados</span>
          <span className="hidden md:inline text-[#FF5C35]">•</span>
          <span>Profesionales certificados</span>
        </div>
      </div>
    </section>
  );
}