'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import InscripcionModal from './InscripcionModal';

// ✅ Formateo de horarios: "9,10" → "9hs y 10hs"
function formatearHorarios(horarios) {
  const array = Array.isArray(horarios)
    ? horarios
    : typeof horarios === 'string'
    ? horarios.split(',').map(h => h.trim())
    : [];
  const conHs = array.filter(Boolean).map(h => `${h}hs`);
  if (conHs.length === 0) return '⚠️ Horarios faltantes';
  return conHs.length === 1 ? conHs[0] : conHs.join(' y ');
}

export default function CircuitoCard({ circuito, mostrarBotonReserva = false }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const {
    id,
    nombre,
    alias,
    localidad,
    descripcion,
    distancia,
    dias,
    horarios,
    punto_encuentro,
    foto,
    cupo_total,
    estado
  } = circuito;

  const diasArray = Array.isArray(dias)
    ? dias
    : typeof dias === 'string'
    ? dias.split(',').map(d => d.trim())
    : [];

  const puedeInscribirse = estado !== false;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col transition hover:shadow-lg">
      <img
        src={foto || '/images/circuitos/default.jpg'}
        alt={nombre}
        className="w-full h-40 object-cover rounded-t-xl mb-4"
      />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">{nombre || '—'}</h3>
          <span className="bg-[#F1FDF7] text-[#00B884] text-xs font-bold px-2 py-1 rounded-full">
            {cupo_total ?? 0}
          </span>
        </div>

        {/* Alias */}
        {alias && (
          <p className="text-xs text-gray-500">🏷️ Alias: {alias}</p>
        )}

        {/* Descripción */}
        {descripcion && (
          <p className="text-sm text-gray-600 italic">"{descripcion}"</p>
        )}

        {/* Distancia */}
        <p className="text-sm text-[#64748B]">
          📏 {distancia ? `${distancia} m` : 'Distancia no definida'}
        </p>

        {/* Días y horarios */}
        <p className="text-sm text-[#64748B]">
          📅 {diasArray.length > 0 ? diasArray.join(', ') : 'Días no definidos'}
        </p>
        <p className="text-sm text-[#64748B]">
          🕒 {formatearHorarios(horarios)}
        </p>

        {/* Punto de encuentro con Google Maps */}
        <p className="text-xs text-[#64748B]">
          📍{' '}
          {punto_encuentro ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(punto_encuentro)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {punto_encuentro}
            </a>
          ) : (
            '⚠️ Punto de encuentro faltante'
          )}
        </p>

        {/* Estado */}
        {!puedeInscribirse && (
          <p className="text-xs text-red-600">⚠️ Este circuito está inactivo</p>
        )}

        {/* Botón de inscripción */}
        {mostrarBotonReserva && puedeInscribirse && (
          <div className="pt-2">
            <button
              className="bg-[#00B884] text-white text-sm font-semibold px-3 py-1 rounded hover:bg-[#00966e] w-full"
              onClick={() => setMostrarFormulario(true)}
            >
              Sumarme
            </button>
          </div>
        )}
      </div>

      {/* Modal de inscripción */}
      {mostrarFormulario && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setMostrarFormulario(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <InscripcionModal
              circuitoId={id}
              nombreCircuito={nombre}
              onClose={() => setMostrarFormulario(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}