'use client';

export default function BenefitsAnimated() {
  const beneficios = [
    {
      icono: '🌿',
      titulo: 'Salud integral',
      descripcion: 'Mejorá tu circulación, respiración y ánimo.',
    },
    {
      icono: '☀️',
      titulo: 'Bienestar natural',
      descripcion: 'Conectá con el sol, el aire y el entorno natural.',
    },
    {
      icono: '💬',
      titulo: 'Encuentros positivos',
      descripcion: 'Compartí experiencias con un grupo saludable.',
    },
  ];

  return (
    <section className="section bg-fondo text-texto text-center">
      <h2 className="section-title">Beneficios</h2>
      <p className="section-sub">Cuidá tu cuerpo y mente con movimiento consciente al aire libre.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {beneficios.map((b, i) => (
          <div key={i} className="card">
            <div className="text-3xl mb-3">{b.icono}</div>
            <h3 className="card-title">{b.titulo}</h3>
            <p className="card-sub">{b.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
