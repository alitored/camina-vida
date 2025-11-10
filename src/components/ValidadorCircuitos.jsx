'use client';
import { useEffect, useState } from 'react';

export default function ValidadorCircuitos() {
  const [circuitos, setCircuitos] = useState([]);

  useEffect(() => {
    fetch('/api/circuitos')
      .then((res) => res.json())
      .then((data) => setCircuitos(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Validador de sincronización</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Localidad</th>
            <th className="p-2 text-left">Sincronizado</th>
          </tr>
        </thead>
        <tbody>
          {circuitos.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.nombre}</td>
              <td className="p-2">{c.localidad}</td>
              <td className="p-2">
                {c.sincronizado ? (
                  <span className="text-green-600 font-semibold">✅ Sí</span>
                ) : (
                  <span className="text-red-600 font-semibold">❌ No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
