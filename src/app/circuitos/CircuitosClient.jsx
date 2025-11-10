'use client';
import { useState, useEffect } from 'react';
import CircuitoCard from './CircuitoCard';
import FiltrosCircuitos from '@/components/FiltrosCircuitos';

export default function CircuitosClient({ circuitosIniciales = [] }) {
  const [circuitos, setCircuitos] = useState(circuitosIniciales);
  const [circuitosFiltrados, setCircuitosFiltrados] = useState(circuitosIniciales);

  useEffect(() => {
    const cargarCircuitos = async () => {
      try {
        const res = await fetch('/api/circuitos');
        const data = await res.json();
        setCircuitos(data);
        setCircuitosFiltrados(data);
      } catch (error) {
        console.error('❌ Error al cargar circuitos:', error);
      }
    };
    cargarCircuitos();
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Nuestros Circuitos Terapéuticos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubrí nuestros recorridos seguros y adaptados para mejorar tu salud con cada paso.
          </p>
        </header>

        <FiltrosCircuitos
          circuitos={circuitos}
          onFiltrar={setCircuitosFiltrados}
        />

        {circuitosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <p className="text-xl text-gray-500">No hay circuitos disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
