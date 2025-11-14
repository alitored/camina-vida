'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardCoordinadores() {
  const [postulantes, setPostulantes] = useState([]);
  const [filtroHorario, setFiltroHorario] = useState('');
  const [filtroCircuito, setFiltroCircuito] = useState('');

  useEffect(() => {
    fetchPostulantes();
  }, [filtroHorario, filtroCircuito]);

  const fetchPostulantes = async () => {
    let query = supabase.from('coordinadores_postulantes').select('*');

    if (filtroHorario) query = query.contains('horarios', [filtroHorario]);
    if (filtroCircuito) query = query.contains('circuitos', [filtroCircuito]);

    const { data, error } = await query;
    if (error) console.error(error);
    else setPostulantes(data);
  };

  const aprobarPostulante = async (p) => {
    const circuito = prompt('Asignar circuito:', p.circuitos[0] || '');
    const horario = prompt('Asignar horario:', p.horarios[0] || '');

    const { error } = await supabase
      .from('coordinadores_postulantes')
      .update({
        estado: 'aprobado',
        circuito_asignado: circuito,
        horario_asignado: horario,
        aprobado_en: new Date(),
        aprobado_por: 'admin',
      })
      .eq('id', p.id);

    if (!error) {
      await fetch('/api/send-aprobacion', {
        method: 'POST',
        body: JSON.stringify({
          email: p.email,
          nombre: p.nombre,
          circuito,
          horario,
        }),
      });
      fetchPostulantes();
    }
  };

  const rechazarPostulante = async (id) => {
    const { error } = await supabase
      .from('coordinadores_postulantes')
      .update({ estado: 'rechazado' })
      .eq('id', id);

    if (!error) fetchPostulantes();
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Postulaciones de Coordinadores</h1>

      <div className="flex gap-4 mb-6">
        <select value={filtroHorario} onChange={(e) => setFiltroHorario(e.target.value)} className="p-2 border rounded">
          <option value="">Todos los horarios</option>
          <option>Mañana (8:00–11:00)</option>
          <option>Tarde (14:00–17:00)</option>
          <option>Atardecer (17:00–20:00)</option>
        </select>

        <select value={filtroCircuito} onChange={(e) => setFiltroCircuito(e.target.value)} className="p-2 border rounded">
          <option value="">Todos los circuitos</option>
          <option>Parque Central</option>
          <option>Costanera Sur</option>
          <option>Reserva Ecológica</option>
          <option>Barrio Histórico</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Horarios</th>
            <th className="border p-2">Circuitos</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {postulantes.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.telefono}</td>
              <td className="border p-2">{p.horarios.join(', ')}</td>
              <td className="border p-2">{p.circuitos.join(', ')}</td>
              <td className="border p-2">{p.estado}</td>
              <td className="border p-2">
                <button
                  onClick={() => aprobarPostulante(p)}
                  className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => rechazarPostulante(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
