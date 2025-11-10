'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import InscripcionModal from './InscripcionModal';

export default function CircuitoCard({ circuito, mostrarBotonReserva }) {
  const pathname = usePathname();
  const esDashboard = pathname?.startsWith('/dashboard');
  const esHome = pathname === '/' || pathname?.startsWith('/circuitos');

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

  const horariosArray = Array.isArray(horarios)
    ? horarios
    : typeof horarios === 'string'
    ? horarios.split(',').map(h => h.trim())
    : [];

  const tieneFaltantes =
    !foto ||
    !distancia ||
    horariosArray.length === 0 ||
    !punto_encuentro ||
    cupo_total === null;

  const puedeInscribirse = estado !== false;

  const cardClass = `
    card-circuito p-4 rounded-xl overflow-hidden border transition-all
    ${esDashboard ? 'bg-white shadow-sm hover:shadow-lg' : ''}
    ${esHome ? 'bg-card border-verde hover:shadow-xl hover:border-verde-oscuro' : ''}
    ${tieneFaltantes ? 'border-yellow-400' : ''}
  `;

  return (
    <>
      <div className={cardClass}>
        <div className="relative h-32 w-full mb-2">
          <img
            src={foto || '/images/circuitos/default.jpg'}
            alt={nombre}
            className="w-full h-full object-cover rounded-t-xl"
          />
          {localidad && (
            <div className="absolute bottom-0 left-0 bg-black/40 text-white text-xs px-2 py-1 rounded-tr-xl">
              {localidad}
            </div>
          )}
        </div>

        <div className="px-2 pb-4 space-y-2">
          <h3 className="text-lg font-semibold text-texto-oscuro">{nombre}</h3>
          <p className="text-sm text-muted">{descripcion || '—'}</p>

          <ul className="text-sm text-texto-oscuro space-y-1">
            <li>📏 {distancia ? `${distancia} m` : 'Distancia no definida'}</li>
            <li>📅 {diasArray.length > 0 ? diasArray.join(', ') : 'Días no definidos'}</li>
            <li>
              🕒{' '}
              {horariosArray.length > 0
                ? horariosArray.map(h => `${h}hs`).join(', ')
                : '⚠️ Horarios faltantes'}
            </li>
            <li>📍 {punto_encuentro || '⚠️ Punto de encuentro faltante'}</li>
            <li>👥 {cupo_total !== null ? `${cupo_total} cupos` : '— cupos'}</li>
            <li>🏷️ Alias: {alias || '—'}</li>
          </ul>

          {!puedeInscribirse && (
            <p className="text-sm text-red-600">⚠️ Este circuito está inactivo</p>
          )}

          {mostrarBotonReserva && puedeInscribirse && (
            <button
              type="button"
              onClick={() => setMostrarFormulario(true)}
              className="mt-3 w-full px-4 py-2 text-sm font-semibold rounded transition
                         bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:brightness-110"
            >
              ➕ Sumarme
            </button>
          )}
        </div>
      </div>

      {mostrarFormulario && (
        <InscripcionModal
          circuitoId={id}
          nombreCircuito={nombre}
          onClose={() => setMostrarFormulario(false)}
        />
      )}
    </>
  );
}
