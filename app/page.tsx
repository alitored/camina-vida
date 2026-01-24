"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import EventDetails from "@/components/EventDetails";
import CountdownTimer from "@/components/CountdownTimer";
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
      <Hero />
      
      <div className="relative z-10 -mt-12 max-w-4xl mx-auto px-6">
        <TrustBadges />
      </div>

      <EventDetails />
      
      <div className="py-10">
        <CountdownTimer targetDate="2026-02-14T09:30:00-03:00" />
      </div>

      <IrlandaSlide />
      <Beneficios />
      <Method />
      <SocialRed />

      <section id="reserva" className="bg-irlanda-soft/30 py-24 border-t border-irlanda-soft/50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-irlanda-dark mb-6">
            ¿Con ganas de empezar?
          </h2>
          <p className="text-lg md:text-xl text-irlanda-dark/70 mb-10 font-normal leading-tight">
            Reserva tu lugar ahora para la caminata del 14 de febrero en Plaza Irlanda y comenzá tu camino al bienestar.
          </p>
          <button 
            onClick={openForm} 
            className="bg-[#FF5C35] text-white px-12 py-5 rounded-2xl font-medium text-xl uppercase shadow-xl hover:scale-105 transition-transform active:scale-95 cursor-pointer"
          >
            Registrarme Gratis
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}