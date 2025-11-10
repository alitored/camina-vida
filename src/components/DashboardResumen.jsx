'use client';

export default function DashboardResumen({ inscriptosFiltrados = [] }) {
  const edades = inscriptosFiltrados.map(i => i.edad).filter(e => typeof e === 'number' && e > 0);
  const promedio = edades.length ? Math.round(edades.reduce((a, b) => a + b, 0) / edades.length) : '—';
  const min = edades.length ? Math.min(...edades) : '—';
  const max = edades.length ? Math.max(...edades) : '—';

  return (
    <section id="resumen" className="space-y-8">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-sm text-[#64748B] mb-1">Promedio de edad</div>
          <div className="text-xl font-bold">{promedio} años</div>
          <div className="text-sm text-[#64748B]">Rango: {min} - {max}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-sm text-[#64748B] mb-1">Participantes activos</div>
          <div className="text-xl font-bold">{inscriptosFiltrados.length}</div>
          <div className="text-sm text-[#64748B]">Último mes</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-sm text-[#64748B] mb-1">Satisfacción</div>
          <div className="text-xl font-bold">4.8 / 5</div>
          <div className="text-sm text-[#64748B]">Basado en encuestas</div>
        </div>
      </div>
    </section>
  );
}
