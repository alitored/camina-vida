import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const { circuitoId, nombre, dni, whatsapp } = await request.json();

  // Validar campos obligatorios
  if (!circuitoId || !nombre || !dni || !whatsapp) {
    return new Response(JSON.stringify({ success: false, message: 'Faltan datos obligatorios' }), { status: 400 });
  }

  // Validar duplicado
  const { data: existente, error: errorDuplicado } = await supabase
    .from('inscripciones')
    .select('id')
    .eq('dni', dni)
    .eq('circuito_id', circuitoId)
    .single();

  if (errorDuplicado) {
    console.error('Error al validar duplicado:', errorDuplicado);
  }

  if (existente) {
    return new Response(JSON.stringify({ success: false, message: 'Ya estás inscripto en este circuito' }), { status: 409 });
  }

  // Validar cupo
  const { data: circuito, error: errorCupo } = await supabase
    .from('vista_circuitos_completa')
    .select('cupo_restante')
    .eq('id', circuitoId)
    .single();

  if (errorCupo || !circuito || circuito.cupo_restante <= 0) {
    return new Response(JSON.stringify({ success: false, message: 'No hay cupos disponibles' }), { status: 400 });
  }

  // Insertar inscripción
  const { error: errorInsert } = await supabase
    .from('inscripciones')
    .insert([{ circuito_id: circuitoId, nombre, dni, whatsapp }]);

  if (errorInsert) {
    console.error('Error al insertar inscripción:', errorInsert);
    return new Response(JSON.stringify({ success: false, message: 'Error al guardar la inscripción' }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
