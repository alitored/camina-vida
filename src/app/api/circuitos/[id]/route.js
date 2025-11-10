import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return Response.json({ error: 'Falta el ID del circuito' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('circuitos')
    .select('id, NombreCircuito, Dias, Horarios')
    .eq('id', id)
    .single();

  if (error || !data) {
    return Response.json({ error: 'Circuito no encontrado' }, { status: 404 });
  }

  const opciones_dia = typeof data.Dias === 'string'
    ? data.Dias.split(',').map(d => d.trim())
    : [];

  const opciones_horario = typeof data.Horarios === 'string' && data.Horarios.includes(' a ')
    ? data.Horarios.split(' a ').map(h => h.trim())
    : [];

  return Response.json({
    id: data.id,
    nombre: data.NombreCircuito,
    opciones_dia,
    opciones_horario
  });
}
