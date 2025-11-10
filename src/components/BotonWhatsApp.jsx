'use client';
import { useState } from 'react';

export default function BotonWhatsApp({ inscripto }) {
  const [notificado, setNotificado] = useState(inscripto.notificado_director);

  const mensaje = `Nuevo inscripto:\nNombre: ${inscripto.nombre}\nEdad: ${inscripto.edad}\nCircuito: ${inscripto.nombre_circuito}\nDía: ${inscripto.dia}\nHorario: ${inscripto.horario}`;
  const enlace = `https://wa.me/5491157577039?text=${encodeURIComponent(mensaje)}`;

  const manejarClick = async () => {
    try {
      window.open(enlace, '_blank');
      const res = await fetch('/api/notificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inscripto.id })
      });
      const json = await res.json();
      if (json.success) setNotificado(true);
    } catch (err) {
      console.error('Error al notificar:', err);
    }
  };

  return notificado ? (
    <span title="Ya notificado" className="text-green-600 text-xl">✅</span>
  ) : (
    <button
      onClick={manejarClick}
      className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
    >
      Notificar por WhatsApp
    </button>
  );
}
