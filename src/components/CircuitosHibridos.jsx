'use client';
import { useEffect, useState } from 'react';

export default function CircuitosHibridos({ mostrarBotonReserva = false }) {
  const [circuitos, setCircuitos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/circuitos')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Respuesta inválida');
        }
        setCircuitos(data);
      })
      .catch((err) => {
        console.error('❌ Error al cargar circuitos:', err);
        setError('No se pudieron cargar los circuitos. Verificá la conexión o el formato del endpoint.');
      });
  }, []);

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!error && circuitos.length === 0 && (
        <p className="text-center text-gray-500">No hay circuitos disponibles en este momento.</p>
      )}

      {circuitos.length > 0 && (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Localidad</th>
              <th className="p-2 text-left">Horario</th>
              <th className="p-2 text-left">Cupo</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Coordinador</th>
              <th className="p-2 text-left">Alertas</th>
              {mostrarBotonReserva && <th className="p-2 text-left">Reservar</th>}
            </tr>
          </thead>
          <tbody>
            {circuitos.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.nombre}</td>
                <td className="p-2">{c.localidad}</td>
                <td className="p-2">{c.horario}</td>
                <td className="p-2">{c.cupoRestante}</td>
                <td className="p-2">{c.estado ? '✅' : '❌'}</td>
                <td className="p-2">{c.tiene_coordinador ? '👤' : '⚠️'}</td>
                <td className="p-2">
                  {c.circuito_incompleto ? (
                    <span className="text-yellow-600 font-semibold">Incompleto</span>
                  ) : (
                    '—'
                  )}
                </td>
                {mostrarBotonReserva && (
                  <td className="p-2">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Reservar
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
