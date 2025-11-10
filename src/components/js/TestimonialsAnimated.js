'use client';

import { motion } from 'framer-motion';

export default function TestimonialsAnimated({ testimonios }) {
  const lista = Array.isArray(testimonios) ? testimonios : [];

  if (lista.length === 0) return null;

  return (
    <section className="px-6 py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros caminantes</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {lista.slice(0, 2).map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-lg italic">“{t.texto}”</p>
            <p className="mt-2 font-semibold">{t.nombre}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
