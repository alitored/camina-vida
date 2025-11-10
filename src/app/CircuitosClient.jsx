'use client';
import { useState } from 'react';
import CircuitoCard from '@/components/CircuitoCard';
import FiltrosCircuitos from '@/components/FiltrosCircuitos';

export default function CircuitosClient({ circuitosIniciales }) {
  const [circuitosFiltrados, setCircuitosFiltrados] = useState(circuitosIniciales);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Nuestros Circuitos Terapéuticos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubrí nuestros recorridos seguros y adaptados para mejorar tu salud con cada paso.
          </p>
        </header>

        {/* Componente de Filtros */}
        <FiltrosCircuitos 
          circuitos={circuitosIniciales} 
          onFiltrar={setCircuitosFiltrados} 
        />

        {/* Grilla de Circuitos */}
        {circuitosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {circuitosFiltrados.map((c) => (
              <CircuitoCard
                key={c.id}
                modoHome={true}
                circuito={{
                  id: c.id,
                  nombre: c.nombre || '—',
                  descripcion: c.descripcion || '—',
                  localidad: c.localidad || '—',
                  foto: c.foto || '/images/circuitos/default.jpg',
                  estado: c.estado ?? false,
                  distancia: c.distancia_metros ?? null,
                  dias: c.dias || [],
                  horarios: c.horarios || [],
                  url: c.url || null,
                  punto_encuentro: c.punto_encuentro || null,
                  alias: c.alias || null,
                  cupo_total: c.cupo_restante ?? null
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No hay circuitos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
