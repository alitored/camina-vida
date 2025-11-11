'use client';
import { useEffect, useState, useCallback } from 'react';
import FormularioInscripcion from './FormularioInscripcion';
import supabase from '@/lib/supabase';

// ✅ Función para formatear horarios
function formatearHorarios(horarios) {
  // Si es array, lo usamos directamente; si es string, lo dividimos
  const array = Array.isArray(horarios)
    ? horarios
    : typeof horarios === 'string'
    ? horarios.split(',').map(h => h.trim())
    : [];

  // Convertir cada valor a "Xhs"
  const conHs = array
    .filter(h => h !== '') // eliminar vacíos
    .map(h => `${h}hs`);   // agregar "hs"

  if (conHs.length === 0) return '⚠️ Horarios faltantes';
  if (conHs.length === 1) return conHs[0];
  return conHs.join(' y ');
}

export default function DashboardCircuitos() {
  const [circuitos, setCircuitos] = useState([]);
  const [formularioActivo, setFormularioActivo] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      // ✅ Corregido: usar 'data', no 'circ'
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
          disponible_para_inscripcion
        `);

      if (error) {
        console.error('❌ Error al cargar circuitos:', error.message);
      } else {
        setCircuitos(data || []);
      }
    }
    cargarDatos();
  }, []);

  const abrirFormulario = useCallback((circuito) => {
    setFormularioActivo(circuito);
  }, []);

  const cerrarFormulario = useCallback(() => {
    setFormularioActivo(null);
  }, []);

  return (
    <section id="circuitos" className="px-4 sm:px-6 py-8 space-y-6">
      <h2 className="text-lg font-bold">🗺️ Circuitos activos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {circuitos.map((c) => {
          const puedeInscribirse = c.disponible_para_inscripcion && c.estado_legible !== false;

          return (
            <div
              key={c.circuito_id}
              className="bg-white rounded-xl shadow p-6 flex flex-col transition hover:shadow-lg"
            >
              <img
                src={c.foto || '/images/circuitos/default.jpg'}
                alt={c.NombreCircuito}
                className="w-full h-40 object-cover rounded-t-xl mb-4"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{c.NombreCircuito || '—'}</h3>
                  <span className="bg-[#F1FDF7] text-[#00B884] text-xs font-bold px-2 py-1 rounded-full">
                    {c.cantidad_inscriptos ?? 0}
                  </span>
                </div>

                {c.Alias && (
                  <p className="text-xs text-gray-500">🏷️ Alias: {c.Alias}</p>
                )}

                {c.Descripcion && (
                  <p className="text-sm text-gray-600 italic">"{c.Descripcion}"</p>
                )}

                <p className="text-sm text-[#64748B]">
                  📏 {c.Distancia ? `${c.Distancia} m` : 'Distancia no definida'}
                </p>

                <p className="text-sm text-[#64748B]">
                  📅 {Array.isArray(c.Dias) ? c.Dias.join(', ') : c.Dias ?? 'Días no definidos'}
                </p>

                <p className="text-sm text-[#64748B]">
                  🕒 {formatearHorarios(c.Horarios)}
                </p>

                <p className="text-xs text-[#64748B]">
                  📍{' '}
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
                    '⚠️ Punto de encuentro faltante'
                  )}
                </p>

                {!puedeInscribirse && (
                  <p className="text-xs text-red-600">⚠️ Este circuito está inactivo</p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    className="bg-[#00B884] text-white text-sm font-semibold px-3 py-1 rounded hover:bg-[#00966e] disabled:opacity-50"
                    onClick={() => abrirFormulario(c)}
                    disabled={!puedeInscribirse}
                  >
                    Sumarme
                  </button>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#64748B] border border-gray-200 px-3 py-1 rounded hover:text-[#00B884]"
                    >
                      Ver
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal fijo */}
      {formularioActivo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={cerrarFormulario}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <FormularioInscripcion
              circuitoId={formularioActivo.circuito_id}
              nombreCircuito={formularioActivo.NombreCircuito}
              onClose={cerrarFormulario}
            />
          </div>
        </div>
      )}
    </section>
  );
}