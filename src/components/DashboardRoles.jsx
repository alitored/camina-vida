'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardRoles() {
  const [usuarios, setUsuarios] = useState([]);
  const rolesPermitidos = ['admin', 'coordinador', 'viewer'];

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (error) {
        console.error('❌ Error al cargar usuarios:', error.message);
        return;
      }
      setUsuarios(data || []);
    }
    cargar();
  }, []);

  const sinRol = usuarios.filter(u => !u.rol);
  const conRol = usuarios.filter(u => u.rol);

  const cambiarRol = async (id, nuevoRol) => {
    const { error } = await supabase.from('usuarios').update({ rol: nuevoRol }).eq('id', id);
    if (error) {
      console.error('❌ Error al actualizar rol:', error.message);
      return;
    }
    setUsuarios(prev =>
      prev.map(u => (u.id === id ? { ...u, rol: nuevoRol } : u))
    );
  };

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🔐 Roles y permisos</h1>

      {sinRol.length > 0 && (
        <div className="bg-red-50 border border-red-300 p-3 rounded text-red-700">
          ⚠️ Hay <strong>{sinRol.length}</strong> usuario(s) sin rol asignado
        </div>
      )}

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Nombre</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => (
            <tr key={idx} className={u.rol ? '' : 'bg-red-50'}>
              <td className="border px-2 py-1">{u.nombre}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">
                <select
                  value={u.rol || ''}
                  onChange={e => cambiarRol(u.id, e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                >
                  <option value="">—</option>
                  {rolesPermitidos.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {!rolesPermitidos.includes(u.rol) && u.rol && (
                  <span className="text-xs text-red-600 block mt-1">⚠️ Rol no reconocido</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
