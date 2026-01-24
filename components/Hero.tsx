"use client";

import { useForm } from "./FormContext";
import CountdownTimer from "./CountdownTimer";
import { motion } from "framer-motion";

export default function Hero() {
  const { openForm } = useForm();

  return (
    <section className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden bg-irlanda-dark text-white px-6">
      {/* Background optimizado para contraste de CTA */}
      <div className="absolute inset-0 z-0 bg-[url('/hero-bg.webp')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-irlanda-dark/80 via-irlanda-dark/40 to-irlanda-crema" />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-6">
        
        {/* Headline: Sans SemiBold (Impacto inmediato) */}
        <h1 className="text-4xl md:text-7xl font-sans font-semibold leading-tight tracking-tight">
          Caminata Terapéutica <br /> 
          en Plaza Irlanda
        </h1>

        {/* Countdown Timer: Visible without scroll */}
        <div className="w-full max-w-md py-2">
          <CountdownTimer targetDate="2026-02-14T09:30:00-03:00" />
        </div>

        {/* Propuesta de Valor: Qué + Cuándo + Dónde + Urgencia */}
        <p className="text-lg md:text-xl font-sans font-normal text-white/90 max-w-2xl leading-relaxed">
          Experiencia terapéutica guiada · Sábado 14 de febrero · Plaza Irlanda · Cupos limitados
        </p>

        {/* CTA PRINCIPAL: Dominante (Click Gravity) */}
        <div className="flex flex-col items-center gap-4 mt-4 w-full">
          <button 
            onClick={openForm}
            className="w-full md:w-auto bg-irlanda-coral text-white px-10 py-5 rounded-2xl font-sans font-bold text-xl md:text-2xl uppercase shadow-2xl hover:scale-105 transition-transform active:scale-95 cursor-pointer border-2 border-white/20"
          >
            Reservá tu lugar – Cupos limitados
          </button>
          
          {/* Trust Line: Autoridad inmediata */}
          <span className="text-sm md:text-base font-sans font-medium text-white/80">
            +200 asistentes • Guiado por profesionales certificados
          </span>
        </div>

        {/* Credenciales: Desenfatizadas (No compiten con el CTA) */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-xs md:text-sm text-white/60 font-sans uppercase tracking-widest">
          <span>Coordinadores capacitados</span>
          <span className="hidden md:inline">•</span>
          <span>Profesionales certificados</span>
        </div>
      </div>
    </section>
  );
}