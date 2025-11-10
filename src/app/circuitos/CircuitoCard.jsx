import styles from './CircuitoCard.module.css';
import Link from 'next/link';


export default function CircuitoCard({ circuito, esAdmin = false }) {
  const {
    id,
    nombre,
    localidad,
    distancia,
    dias,
    horarios,
    cupo_total,
    punto_encuentro,
    foto,
    alias,
    url
  } = circuito;

  const faltantes = {
    horarios: !horarios || horarios.trim?.().length === 0,
    punto_encuentro: !punto_encuentro || punto_encuentro.trim?.().length === 0,
    foto: !foto || !foto.startsWith?.('http'),
    alias: !alias || alias.trim?.().length === 0
  };

  const tieneFaltantes = Object.values(faltantes).some(Boolean);

  const diasTexto = Array.isArray(dias)
    ? dias.join(', ')
    : typeof dias === 'string'
    ? dias
    : null;

  const horariosTexto = typeof horarios === 'string' && horarios.trim().length > 0
    ? horarios.trim()
    : Array.isArray(horarios)
    ? horarios.join(', ')
    : null;

  return (
    <div className={`${styles.card} ${tieneFaltantes ? styles.incompleto : ''}`}>
      {foto?.startsWith('http') ? (
        <img src={foto} alt={`Foto de ${nombre}`} className={styles.foto} />
      ) : (
        <div className={styles.fotoPlaceholder}>⚠️ Foto no disponible</div>
      )}

      <div className={styles.contenido}>
        <h3 className={styles.titulo}>{nombre ?? '—'}</h3>
        <p className={styles.localidad}>{localidad ?? 'Localidad no definida'}</p>

        <p>📏 {distancia ? `${distancia} m` : 'Distancia no definida'}</p>
        <p>📅 {diasTexto ?? 'Días no definidos'}</p>
        <p>👥 {typeof cupo_total === 'number' ? `${cupo_total} restantes` : '— restantes'}</p>

        {horariosTexto ? (
          <p>🕒 {horariosTexto}</p>
        ) : (
          <p className={styles.alert}>⚠️ Horarios faltantes</p>
        )}

        {punto_encuentro?.trim() ? (
          <p>📍 {punto_encuentro}</p>
        ) : (
          <p className={styles.alert}>⚠️ Punto de encuentro faltante</p>
        )}

        {alias?.trim() ? (
          <p>🏷️ Alias: {alias}</p>
        ) : (
          <p className={styles.alert}>⚠️ Alias faltante</p>
        )}

        {esAdmin && (
          <Link href={`/inscripcion?circuito_id=${id}`} className={styles.boton}>
            ➕ Inscribir participante
          </Link>
        )}
      </div>
    </div>
  );
}
