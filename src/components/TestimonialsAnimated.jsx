'use client';
import Image from 'next/image';

export default function TestimonialsAnimated() {
  const testimonios = [
    {
      nombre: 'Luis G.',
      mensaje: 'Me ayudó a reconectar con mi cuerpo y mi entorno. Lo recomiendo a todos.',
      foto: '/images/testimonios/gente1.jpeg',
    },
    {
      nombre: 'Martín R.',
      mensaje: 'Las caminatas me dieron claridad mental y energía. Es un espacio único.',
      foto: '/images/testimonios/gente2.jpeg',
    },
    {
      nombre: 'Sofía M.',
      mensaje: 'Encontré un grupo cálido y una rutina que me hace bien. Gracias Camina Vida.',
      foto: '/images/testimonios/gente3.jpeg',
    },
  ];

  return (
    <section className="section text-center">
      <h2 className="section-title">Testimonios</h2>
      <p className="section-sub">Lo que dicen quienes ya caminan con nosotros.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonios.map((t, i) => (
          <div key={i} className="card p-6">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <Image
                src={t.foto}
                alt={`Foto de ${t.nombre}`}
                fill
                sizes="64px"
                className="rounded-full object-cover"
                priority={i === 0}
              />
            </div>
            <p className="text-sm text-muted italic">“{t.mensaje}”</p>
            <div className="mt-3 font-semibold text-texto">{t.nombre}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
