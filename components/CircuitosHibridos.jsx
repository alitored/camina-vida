'use client';
import { useEffect, useState } from 'react';

export default function CircuitosHibridos() {
  const [circuitos, setCircuitos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/circuitos-hibrido')
      .then(res => res.json())
      .then(data => {
        setCircuitos(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar circuitos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando circuitos...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {circuitos.map(c => (
        <div key={c.id} className="border p-4 rounded shadow bg-white">
          <h2 className="text-xl font-bold">{c.nombre}</h2>
          <p><strong>Horario:</strong> {c.horario}</p>
          <p><strong>Localidad:</strong> {c.localidad || 'Sin localidad'}</p>
          <p><strong>Estado:</strong> {c.estado || 'Sin estado'}</p>
          <p><strong>Días:</strong> {c.dias || 'Sin días'}</p>
          <p><strong>Horarios disponibles:</strong> {c.horarios || 'Sin horarios'}</p>
        </div>
      ))}
    </div>
  );
}
