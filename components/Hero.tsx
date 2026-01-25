"use client";

import { useForm } from "./FormContext";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  const { openForm } = useForm();

  return (
    <section className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden bg-emerald-950 text-white px-6">
      
      <div className="absolute inset-0 z-0 bg-[url('/hero-bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 z-[1] bg-emerald-950/80 mix-blend-multiply" />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-6">
        
        <h1 className="text-4xl md:text-7xl font-sans font-semibold leading-tight tracking-tight text-white">
          Caminata Terapéutica <br /> 
          en Plaza Irlanda
        </h1>

        <div className="w-full max-w-md py-2">
          <CountdownTimer targetDate="2026-02-14T09:30:00-03:00" />
        </div>

        {/* 1.1 Subheadline: Inclusión de beneficio personal */}
        <p className="text-lg md:text-xl font-sans font-normal text-white/95 max-w-2xl leading-relaxed">
          Experiencia terapéutica guiada · Sábado 14 de febrero · Plaza Irlanda · Cupos limitados. <br />
          Reconectá con tu bienestar físico y emocional en cada paso.
        </p>

        <div className="flex flex-col items-center gap-4 mt-4 w-full">
          {/* 2.1 CTA NORMALIZADO */}
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

        {/* 1.2 CREDENCIALES: Desenfatizadas (Menor contraste y tamaño) */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-[10px] md:text-[11px] font-sans font-normal uppercase tracking-[0.2em] text-white/40">
          <span>Coordinadores capacitados</span>
          <span className="hidden md:inline">•</span>
          <span>Profesionales certificados</span>
        </div>
      </div>
    </section>
  );
}