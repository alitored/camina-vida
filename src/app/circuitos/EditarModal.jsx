'use client';
import { useState } from 'react';

export default function EditarModal({ circuito, onClose }) {
  const [nombre, setNombre] = useState(circuito.nombre || '');
  const [localidad, setLocalidad] = useState(circuito.localidad || '');
  const [dias, setDias] = useState(Array.isArray(circuito.dias) ? circuito.dias.join(', ') : '');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const guardar = async () => {
    if (!nombre.trim() || !localidad.trim()) {
      setError('Nombre y localidad son obligatorios.');
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const res = await fetch('/api/actualizar-circuito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: circuito.id,
          nombre: nombre.trim(),
          localidad: localidad.trim(),
          dias: dias.split(',').map(d => d.trim()).filter(Boolean),
        }),
      });

      const result = await res.json();
      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Error al guardar los cambios.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar circuito</h2>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Nombre:</span>
            <input
              className="w-full border px-2 py-1 rounded"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Localidad:</span>
            <input
              className="w-full border px-2 py-1 rounded"
              value={localidad}
              onChange={e => setLocalidad(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Días (separados por coma):</span>
            <input
              className="w-full border px-2 py-1 rounded"
              value={dias}
              onChange={e => setDias(e.target.value)}
            />
          </label>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            disabled={guardando}
          >
            Cancelar
          </button>
          <button
            onClick={guardar}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
