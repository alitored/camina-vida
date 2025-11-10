'use client';
import Image from 'next/image';

export default function ListaCircuitos({ circuitos }) {
  function circuitoIncompleto(circuito) {
    return (
      !circuito.imagen ||
      !circuito.alias ||
      !circuito.horario ||
      !circuito.localidad ||
      circuito.estado === null ||
      circuito.cupoActual === null
    );
  }

  const incompletos = circuitos.filter(circuitoIncompleto).length;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Circuitos disponibles</h2>

      {incompletos > 0 && (
        <p className="text-yellow-600 font-semibold mb-4">
          ⚠️ Hay {incompletos} circuitos incompletos que necesitan revisión.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {circuitos.map(circuito => (
          <div key={circuito.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{circuito.nombre}</h3>

            {circuito.imagen && (
              <Image
                src={circuito.imagen}
                alt={`Imagen de ${circuito.nombre}`}
                width={300}
                height={200}
                className="mt-2 rounded"
              />
            )}

            <p className="text-sm text-gray-600 mt-2">
              Localidad: {circuito.localidad || '—'}<br />
              Horario: {circuito.horario || '—'}<br />
              Cupo actual: {circuito.cupoActual ?? '—'}<br />
              Estado: {circuito.estado ? '✅ Activo' : '⛔️ Inactivo'}
            </p>

            {circuitoIncompleto(circuito) && (
              <p className="text-red-600 text-sm mt-2">
                ⚠️ Este circuito está incompleto. Revisar en Notion o Supabase.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
