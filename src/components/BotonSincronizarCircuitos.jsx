'use client';
import { useState } from 'react';

export default function BotonSincronizarCircuitos({ usuario }) {
  const [estado, setEstado] = useState('idle');

  // 🔐 Token embebido directamente
  const token = 'Z3x9pL8qT2vB7mN1';

  // 🛡️ Protección por rol
  if (!usuario || usuario.rol !== 'admin') return null;

  async function sincronizar() {
    setEstado('loading');

    try {
      const res = await fetch('/api/sync-circuitos', {
        headers: { 'x-sync-token': token },
      });

      const result = await res.json();

      if (result.success) {
        setEstado('success');
      } else {
        setEstado('error');
      }
    } catch (err) {
      console.error('Error al sincronizar:', err);
      setEstado('error');
    }
  }

  return (
    <div className="my-4">
      <button
        onClick={sincronizar}
        disabled={estado === 'loading'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        🔄 Sincronizar circuitos desde Notion
      </button>

      {estado === 'success' && (
        <p className="text-green-600 mt-2">✅ Sincronización completada correctamente.</p>
      )}
      {estado === 'error' && (
        <p className="text-red-600 mt-2">❌ Hubo un error al sincronizar. Revisá consola o permisos.</p>
      )}
    </div>
  );
}
