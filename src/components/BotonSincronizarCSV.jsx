'use client';
import { useState } from 'react';

export default function BotonSincronizarCSV() {
  const [estado, setEstado] = useState('idle');
  const [resultados, setResultados] = useState([]);

  const sincronizar = async () => {
    setEstado('loading');
    try {
      const res = await fetch('/api/migrar-notion-ids-desde-csv');
      const data = await res.json();
      setResultados(data.resultados);
      setEstado('done');
    } catch (err) {
      console.error('❌ Error al sincronizar:', err);
      setEstado('error');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <button
        onClick={sincronizar}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={estado === 'loading'}
      >
        {estado === 'loading' ? 'Sincronizando...' : '🔄 Sincronizar desde CSV'}
      </button>

      {estado === 'done' && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">📋 Resultados de sincronización:</h3>
          <ul className="list-disc pl-5 text-sm">
            {resultados.map((r, i) => (
              <li key={i}>
                <strong>{r.nombre}:</strong> {r.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {estado === 'error' && (
        <p className="text-red-600 mt-2">❌ Error al ejecutar la sincronización.</p>
      )}
    </div>
  );
}
