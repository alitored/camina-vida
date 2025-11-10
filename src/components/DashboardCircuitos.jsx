'use client';
import { useEffect, useState } from 'react';
import CircuitoCard from './CircuitoCard';
import supabase from '@/lib/supabase';


export default function DashboardCircuitos() {
  const [circuitos, setCircuitos] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      const { data: circ, error: errorCirc } = await supabase
        .from('vista_circuitos_completa')
        .select(`
          circuito_id,
          "NombreCircuito",
          "Alias",
          "Descripcion",
          "Dias",
          "Horarios",
          "Distancia",
          "Estado",
          foto,
          "Localidad",
          url,
          cupo_total,
          cantidad_inscriptos,
          cupo_restante,
          punto_encuentro,
          estado_legible,
          cupo_lleno,
          disponible_para_inscripcion
        `);

      if (errorCirc) {
        console.error('❌ Error circuitos:', errorCirc.message);
      } else {
        setCircuitos(circ || []);
      }
    }

    cargarDatos();
  }, []);

  return (
    <section id="circuitos" className="px-4 sm:px-6 py-8 space-y-6">
      <h2 className="text-lg font-bold">🗺️ Circuitos activos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {circuitos.map((c) => (
          <div
            key={c.circuito_id}
            className="bg-white rounded-xl shadow p-6 flex flex-col justify-between transition hover:scale-[1.01]"
          >
            <img
              src={c.foto || '/images/circuitos/default.jpg'}
              alt={c.NombreCircuito}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-bold text-gray-800">{c.NombreCircuito || '—'}</div>
                <div className="bg-[#F1FDF7] text-[#00B884] text-xs font-bold px-2 py-1 rounded-full">
                  {c.cantidad_inscriptos ?? 0}
                </div>
              </div>
              <div className="text-sm text-[#64748B]">
                {c.Localidad} · {Array.isArray(c.Dias) ? c.Dias.join(', ') : c.Dias ?? '—'} · {Array.isArray(c.Horarios) ? c.Horarios.join(', ') : c.Horarios ?? '—'}
              </div>
              <div className="text-xs text-[#64748B] italic">
  Punto de encuentro:{' '}
  {c.punto_encuentro ? (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.punto_encuentro)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {c.punto_encuentro}
    </a>
  ) : (
    '—'
  )}
</div>

              <div className="flex gap-2 pt-2">
                <button
                  className="bg-[#00B884] text-white text-sm font-semibold px-3 py-1 rounded hover:bg-[#00966e]"
                  onClick={() => alert(`WhatsApp + registrar: ${c.NombreCircuito}`)}
                >
                  WhatsApp + Registrar
                </button>
                <a
                  href={c.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748B] border border-gray-200 px-3 py-1 rounded hover:text-[#00B884]"
                >
                  Ver
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
