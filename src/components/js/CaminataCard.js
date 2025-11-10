export default function CircuitoCard({ circuito, mostrarBotonReserva }) {
  const {
    nombre, alias, descripcion, localidad, distancia, dias, horarios,
    imagen, estado, cantidad_inscriptos, tiene_coordinador,
    circuito_incompleto, faltantes, url_notion
  } = circuito;

  return (
    <div className={`border rounded-lg shadow p-4 bg-white ${estado ? 'border-green-400' : 'border-gray-300'}`}>
      {imagen && <img src={imagen} alt={`Imagen de ${nombre}`} className="w-full h-40 object-cover rounded mb-3" />}
      <h2 className="text-xl font-bold mb-1">{nombre} {alias && <span className="text-gray-500 text-sm">({alias})</span>}</h2>
      {descripcion && <p className="text-sm text-gray-700 mb-2">{descripcion}</p>}

      <div className="text-sm text-gray-600 space-y-1">
        <p>📍 <strong>Localidad:</strong> {localidad || '—'}</p>
        <p>🚶 <strong>Distancia:</strong> {distancia ?? '—'} km</p>
        <p>🕒 <strong>Horarios:</strong> {horarios || '—'}</p>
        <p>📅 <strong>Días:</strong> {dias?.join(', ') || '—'}</p>
        <p>👥 <strong>Inscriptos:</strong> {cantidad_inscriptos ?? '—'}</p>
        <p>🧑‍💼 <strong>Coordinador:</strong> {tiene_coordinador ? 'Asignado' : '⚠️ Sin asignar'}</p>
        <p>✅ <strong>Estado:</strong> {estado ? 'Activo' : 'Inactivo'}</p>
      </div>

      {circuito_incompleto && (
        <p className="text-red-600 text-sm mt-2">⚠️ Faltan campos: {faltantes?.join(', ')}</p>
      )}

      <div className="flex gap-4 mt-3 text-sm">
        <a href={url_notion} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Ver en Notion ↗
        </a>
        {mostrarBotonReserva && (
          <button className="text-green-600 hover:underline">Reservar</button>
        )}
      </div>
    </div>
  );
}
