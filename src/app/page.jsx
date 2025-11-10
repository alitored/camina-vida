'use client';

import HeroAnimated from '@/components/HeroAnimated.jsx';
import BenefitsAnimated from '@/components/BenefitsAnimated.jsx';
import MethodLucide from '@/components/MethodLucide.jsx';
import PlansAnimated from '@/components/PlansAnimated.jsx';
import TestimonialsAnimated from '@/components/TestimonialsAnimated.jsx';
import CTAFinal from '@/components/CTAFinal.jsx';
import VistaCircuitosHome from '@/components/VistaCircuitosHome.jsx';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-fondo text-texto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 🎯 Hero institucional con imagen y CTA */}
        <HeroAnimated />

        {/* 🌿 Beneficios visuales con íconos */}
        <BenefitsAnimated />

        {/* 🧘‍♂️ Método guiado paso a paso */}
        <MethodLucide />

        {/* 🧭 Circuitos activos con filtros y cards */}
        <VistaCircuitosHome mostrarBotonReserva={true} />

        {/* 💳 Planes mensuales con CTA */}
        <PlansAnimated />

        {/* 💬 Testimonios de participantes */}
        <TestimonialsAnimated />

        {/* 🎯 CTA final institucional */}
        <CTAFinal />
      </div>
    </main>
  );
}
