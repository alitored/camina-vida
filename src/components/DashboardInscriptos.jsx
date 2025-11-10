'use client';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

export default function DashboardInscriptos({ inscriptosFiltrados = [] }) {
  const [filtroNombre, setFiltroNombre] = useState('');
  const [notificandoId, setNotificandoId] = useState(null);
  const [inscriptosLocal, setInscriptosLocal] = useState([]);

  useEffect(() => {
    setInscriptosLocal(inscriptosFiltrados);
  }, [inscriptosFiltrados]);

  const filtrados = inscriptosLocal.filter(i =>
    i.nombre?.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  const notificar = async (inscripto) => {
    setNotificandoId(inscripto.id);

    const mensaje = `Nuevo inscripto:
Nombre: ${inscripto.nombre ?? '—'}
Edad: ${inscripto.edad ?? '—'}
Circuito: ${inscripto.circuitoNombre ?? '—'}
Día: ${inscripto.dia ?? '—'}
Horario: ${inscripto.horario ?? '—'}
WhatsApp: ${inscripto.whatsapp ?? '—'}`;

    const enlaceWhatsApp = `https://wa.me/5491157577039?text=${encodeURIComponent(mensaje)}`;

    try {
      window.open(enlaceWhatsApp, '_blank');

      const { error } = await supabase
        .from('inscripciones')
        .update({ notificado_director: true })
        .eq('id', inscripto.id);

      if (error) {
        console.error('❌ Error al actualizar notificado_director:', error.message);
      } else {
        const actualizados = inscriptosLocal.map(i =>
          i.id === inscripto.id ? { ...i, notificado_director: true } : i
        );
        setInscriptosLocal(actualizados);
      }
    } catch (err) {
      console.error('❌ Error en notificación:', err);
    } finally {
      setNotificandoId(null);
    }
  };

  return (
    <section id="inscriptos" className="space-y-6">
      <h2 className="text-xl font-bold">👥 Inscriptos</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={e => setFiltroNombre(e.target.value)}
          className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 text-sm w-full sm:max-w-sm"
        />

        <div className="bg-[#FEF3C7] text-[#92400E] px-3 py-2 rounded-full text-sm font-medium inline-block shadow-sm">
          🔔 {filtrados.filter(i => !i.notificado_director).length} sin notificar
        </div>
      </div>

      <div className="overflow-auto bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-[#64748B] font-semibold">
            <tr>
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2 text-left">DNI</th>
              <th className="px-3 py-2 text-left">Edad</th>
              <th className="px-3 py-2 text-left">Circuito</th>
              <th className="px-3 py-2 text-left">Día</th>
              <th className="px-3 py-2 text-left">Horario</th>
              <th className="px-3 py-2 text-left">Localidad</th>
              <th className="px-3 py-2 text-left">Estado</th>
              <th className="px-3 py-2 text-left">Cupo</th>
              <th className="px-3 py-2 text-left">Notificación</th>
              <th className="px-3 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((i, idx) => {
              const incompleto = !i.edad || !i.dia || !i.horario;

              return (
                <tr key={idx} className={`border-t ${incompleto ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-3 py-2">{i.nombre ?? '—'}</td>
                  <td className="px-3 py-2">{i.dni ?? '—'}</td>
                  <td className="px-3 py-2">{i.edad ?? '—'}</td>
                  <td className="px-3 py-2">{i.circuitoNombre ?? '—'}</td>
                  <td className="px-3 py-2">{i.dia ?? '—'}</td>
                  <td className="px-3 py-2">{i.horario ?? '—'}</td>
                  <td className="px-3 py-2">{i.localidad ?? '—'}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${i.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {i.disponible ? '🟢 Disponible' : '⛔️ No disponible'}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {typeof i.cupoRestante === 'number' ? (
                      <span className={`text-xs font-medium ${i.cupoRestante <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                        {i.cupoRestante} restantes
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {i.notificado_director ? (
                      <span className="text-green-600 text-sm">✅</span>
                    ) : (
                      <span className="text-yellow-600 text-sm">🔔</span>
                    )}
                    {incompleto && (
                      <div className="text-red-600 text-xs mt-1">⚠️ Incompleto</div>
                    )}
                  </td>
                  <td className="px-3 py-2 space-y-1">
                    {!i.notificado_director && i.disponible ? (
                      <button
                        onClick={() => notificar(i)}
                        disabled={notificandoId === i.id || incompleto}
                        className="bg-[#00B884] text-white px-3 py-1 rounded text-xs hover:bg-[#00966e] disabled:opacity-50"
                      >
                        {notificandoId === i.id ? 'Notificando…' : 'WhatsApp + registrar'}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
