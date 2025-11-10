'use client';
import { useState, useEffect } from 'react';

export default function ValidadorSincronizacion() {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    fetch('/api/migrar-notion-ids-desde-csv')
      .then((res) => res.json())
      .then((data) => setResultados(data.resultados));
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📋 Estado de sincronización de circuitos</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.nombre}</td>
              <td className="p-2">
                {r.status.includes('✅') ? (
                  <span className="text-green-600 font-semibold">{r.status}</span>
                ) : r.status.includes('⚠️') ? (
                  <span className="text-yellow-600 font-semibold">{r.status}</span>
                ) : (
                  <span className="text-red-600 font-semibold">{r.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
