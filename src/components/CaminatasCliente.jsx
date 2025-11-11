'use client';
import { useState } from 'react';
import CircuitoCard from './CircuitoCard';
import FiltrosCircuitos from './FiltrosCircuitos';

export default function CaminatasCliente({ circuitos }) {
  const [filtrados, setFiltrados] = useState(circuitos);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-texto-oscuro">Caminatas</h1>

      <FiltrosCircuitos circuitos={circuitos} onFiltrar={setFiltrados} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.length > 0 ? (
          filtrados.map(c => (
            <CircuitoCard key={c.id} circuito={c} mostrarBotonReserva={true} />
          ))
        ) : (
          <p className="text-center text-gray-500 italic col-span-full">
            No se encontraron caminatas con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
}
