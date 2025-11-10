'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  const circuitoId = searchParams.get('circuito');
  const [circuito, setCircuito] = useState(null);

  useEffect(() => {
    if (circuitoId) {
      fetch(`/api/circuitos/${circuitoId}`)
        .then(res => res.json())
        .then(setCircuito);
    }
  }, [circuitoId]);

  if (!circuito) return <p className="text-center py-12">Cargando confirmación...</p>;

  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold mb-4 text-emerald-700">¡Reserva confirmada!</h1>
      <p className="text-lg mb-2">Te inscribiste en:</p>
      <p className="text-xl font-semibold">{circuito.NombreCircuito}</p>
      <p className="text-sm text-gray-600">{circuito.Localidad}</p>
      <p className="text-sm text-gray-500 mt-2">Cupo restante: {circuito.cupo_restante}</p>
      <div className="mt-6">
        <a href="/circuitos" className="text-emerald-600 hover:underline">
          Volver al listado de caminatas
        </a>
      </div>
    </div>
  );
}
