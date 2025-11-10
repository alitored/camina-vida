'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardVistaInscripciones() {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase
        .from('vista_inscripciones_completa')
        .select('*');

      if (error) {
        console.error('Error al cargar inscripciones:', error);
        return;
      }

      setInscripciones(data || []);
    }

    cargar();
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Inscripciones completas</h1>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Nombre</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Circuito</th>
            <th className="border px-2 py-1 text-left">Localidad</th>
            <th className="border px-2 py-1 text-left">Horario</th>
            <th className="border px-2 py-1 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((i, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{i.nombre}</td>
              <td className="border px-2 py-1">{i.email}</td>
              <td className="border px-2 py-1">{i.circuito}</td>
              <td className="border px-2 py-1">{i.localidad}</td>
              <td className="border px-2 py-1">{i.horario}</td>
              <td className="border px-2 py-1">{new Date(i.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
