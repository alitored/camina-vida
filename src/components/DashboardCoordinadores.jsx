'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import Link from 'next/link';

export default function DashboardCircuitos() {
  const [circuitos, setCircuitos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase
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

      if (error) {
        console.error('❌ Error al cargar circuitos:', error.message);
        return;
      }

      setCircuitos(data || []);
    }

    cargar();
  }, []);

  function circuitoIncompleto(c) {
    return !c.foto || !c.Alias || !c.Horarios || !c.Localidad || c.Estado === null || c.cupo_total === null;
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧭 Circuitos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {circuitos.map(c => (
          <div key={c.circuito_id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{c.NombreCircuito}</h2>

            <p className="text-sm text-gray-600 mt-2">
              Localidad: {c.Localidad || '—'}<br />
              Horarios: {Array.isArray(c.Horarios) ? c.Horarios.join(', ') : c.Horarios || '—'}<br />
              Cupo total: {c.cupo_total ?? '—'}<br />
              Estado: {c.estado_legible}<br />
              Inscriptos: {c.cantidad_inscriptos > 0 ? `👥 ${c.cantidad_inscriptos}` : '⚠️ Sin inscriptos'}<br />
              Cupo restante: {c.cupo_restante}<br />
              {c.cupo_lleno && <span className="text-red-600">⚠️ Cupo lleno</span>}
            </p>

            {circuitoIncompleto(c) && (
              <p className="text-red-600 text-sm mt-2">⚠️ Circuito incompleto</p>
            )}

            <div className="flex gap-4 mt-3 text-sm">
              <Link
                href={`/dashboard?vista=inscriptos&filtro=${encodeURIComponent(c.NombreCircuito)}`}
                className="text-blue-600 hover:underline"
              >
                Ver inscriptos
              </Link>
              {c.disponible_para_inscripcion && (
                <span className="text-green-600 font-medium">🟢 Disponible para inscripción</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
