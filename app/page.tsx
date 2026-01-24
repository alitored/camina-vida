"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import IrlandaSlide from "@/components/IrlandaSlide";
import Beneficios from "@/components/Beneficios";
import Method from "@/components/Method";
import SocialRed from "@/components/SocialRed";
import Footer from "@/components/Footer";
import { useForm } from "@/components/FormContext"; 

export default function LandingPlazaIrlanda() {
  const { openForm } = useForm();

  return (
    <main className="relative min-h-screen bg-irlanda-crema">
      <Header />
      
      {/* El Hero ahora contiene el Countdown y los Trust Elements para máxima conversión inicial */}
      <Hero />
      
      {/* Flujo de información sin competencia visual */}
      <EventDetails />
      <IrlandaSlide />
      <Beneficios />
      <Method />
      <SocialRed />

      {/* Sección de Conversión Final: Normalizada */}
      <section id="reserva" className="bg-irlanda-soft/30 py-24 border-t border-irlanda-soft/50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold text-irlanda-dark mb-6">
            ¿Con ganas de empezar?
          </h2>
          {/* Serif para el refuerzo emocional */}
          <p className="text-lg md:text-xl text-irlanda-dark/70 mb-10 font-serif italic leading-relaxed">
            Tu equilibrio integral comienza con un paso. Reservá tu lugar hoy.
          </p>
          <button 
            onClick={openForm} 
            className="bg-[#FF5C35] text-white px-12 py-5 rounded-2xl font-sans font-bold text-xl uppercase shadow-xl hover:scale-105 transition-transform active:scale-95 cursor-pointer"
          >
            Reservá tu lugar – Cupos limitados
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}