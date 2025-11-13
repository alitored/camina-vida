'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function VistaCoordinadoresActivos() {
  const [coordinadores, setCoordinadores] = useState([]);
  const [filtroCircuito, setFiltroCircuito] = useState('');
  const [filtroHorario, setFiltroHorario] = useState('');

  useEffect(() => {
    fetchCoordinadores();
  }, [filtroCircuito, filtroHorario]);

  const fetchCoordinadores = async () => {
    let query = supabase
      .from('coordinadores_postulantes')
      .select('id, nombre, email, telefono, circuito_asignado, horario_asignado')
      .eq('estado', 'aprobado');

    if (filtroCircuito) query = query.eq('circuito_asignado', filtroCircuito);
    if (filtroHorario) query = query.eq('horario_asignado', filtroHorario);

    const { data, error } = await query;
    if (error) console.error(error);
    else setCoordinadores(data);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Coordinadores Activos</h1>

      <div className="flex gap-4 mb-6 justify-center">
        <select value={filtroCircuito} onChange={(e) => setFiltroCircuito(e.target.value)} className="p-2 border rounded">
          <option value="">Todos los circuitos</option>
          <option>Parque Central</option>
          <option>Costanera Sur</option>
          <option>Reserva Ecológica</option>
          <option>Barrio Histórico</option>
        </select>

        <select value={filtroHorario} onChange={(e) => setFiltroHorario(e.target.value)} className="p-2 border rounded">
          <option value="">Todos los horarios</option>
          <option>Mañana (8:00–11:00)</option>
          <option>Tarde (14:00–17:00)</option>
          <option>Atardecer (17:00–20:00)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coordinadores.map((c) => (
          <div key={c.id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">{c.nombre}</h2>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Teléfono:</strong> {c.telefono}</p>
            <p><strong>Circuito:</strong> {c.circuito_asignado}</p>
            <p><strong>Horario:</strong> {c.horario_asignado}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
