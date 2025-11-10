import { createClient } from '@supabase/supabase-js';

export async function GET() {
  // Validación de entorno
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response('❌ Variables de entorno faltantes', { status: 500 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from('vista_circuitos_completa')
    .select('*')
    .limit(5);

  if (error) {
    console.error('❌ Supabase error:', error.message);
    return new Response('❌ Error: ' + error.message, { status: 500 });
  }

  return Response.json(data);
}
console.log('🔐 SERVICE ROLE KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10));
