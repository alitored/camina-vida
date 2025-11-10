'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import CircuitoCard from './CircuitoCard';

export default function BloqueCircuitos() {
  const [circuitos, setCircuitos] = useState([]);
  const [coordinadores, setCoordinadores] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      const { data: circuitosData } = await supabase
        .from('circuitos')
        .select('*')
        .eq('estado', true)
        .order('nombre', { ascending: true });

      const { data: coordinadoresData } = await supabase
        .from('coordinadores')
        .select('circuito');

      const circuitosConCoordinador = (circuitosData || []).map((c) => ({
        ...c,
        coordinador: coordinadoresData?.some((coord) => coord.circuito === c.nombre),
      }));

      setCircuitos(circuitosConCoordinador);
    }

    cargarDatos();
  }, []);

  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">🚶‍♀️ Circuitos disponibles</h2>
      <p className="text-center text-gray-600 mb-8">
        Explorá nuestros circuitos activos, con cupos actualizados y validación híbrida desde Notion y Supabase.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuitos.map((c) => (
          <CircuitoCard key={c.id} circuito={c} />
        ))}
      </div>
    </section>
  );
}
