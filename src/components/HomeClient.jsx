'use client';

import HeroAnimated from '@/components/HeroAnimated';
import BenefitsAnimated from '@/components/BenefitsAnimated';
import MethodLucide from '@/components/MethodLucide';
import PlansAnimated from '@/components/PlansAnimated';
import TestimonialsAnimated from '@/components/TestimonialsAnimated';
import CTAFinal from '@/components/CTAFinal';
import CircuitosHibridos from '@/components/CircuitosHibridos';

export default function HomeClient({ testimonios = [] }) {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      <HeroAnimated />
      <BenefitsAnimated />
      <MethodLucide />
      <PlansAnimated />

      <section className="px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Circuitos disponibles</h2>
        <CircuitosHibridos />
      </section>

      <TestimonialsAnimated testimonios={testimonios} />
      <CTAFinal />

      {/* 🔽 Nuevo bloque debajo del CTA */}
      <section className="px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Reservá tu caminata</h2>
        <CircuitosHibridos mostrarBotonReserva={true} />
      </section>
    </div>
  );
}
