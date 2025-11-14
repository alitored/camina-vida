'use client';
import { useEffect, useState } from 'react';

export default function DashboardInscriptosPorCircuito() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const res = await fetch('/api/inscriptos_por_circuito');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Error al cargar datos');
        setDatos(json);
      } catch (err) {
        console.error('❌ Error al cargar inscriptos por circuito:', err.message);
        setError(err.message);
      }
    }

    cargarDatos();
  }, []);

  const agrupados = datos.reduce((acc, fila) => {
    const key = fila.nombre_circuito ?? 'Sin circuito';
    acc[key] = acc[key] || [];
    acc[key].push(fila);
    return acc;
  }, {});

  return (
    <section id="por-circuito" className="space-y-6">
      <h2 className="text-xl font-bold">📍 Inscriptos por circuito</h2>

      {error ? (
        <p className="text-red-600">❌ {error}</p>
      ) : datos.length === 0 ? (
        <p className="text-gray-500">No hay datos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(agrupados).map(([circuito, lista]) => (
            <div
              key={circuito}
              className="bg-white rounded-xl shadow p-4 space-y-3 transition hover:scale-[1.01]"
            >
              <h3 className="text-lg font-semibold text-gray-800">{circuito}</h3>
              {lista.map((fila, i) => (
                <div
                  key={i}
                  className="text-sm text-gray-700 flex justify-between items-center border-t pt-3"
                >
                  <div>
                    🗓️ {fila.dia ?? '—'} {fila.horario ?? '—'}<br />
                    📍 {fila.localidad ?? '—'}
                  </div>
                  <div className="font-bold text-[#00B884]">
                    {fila.total_inscriptos ?? 0} inscriptos
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
