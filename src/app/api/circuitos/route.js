import { NextResponse } from 'next/server';
import { fetchCircuitosFromNotion } from '@/lib/notion';

export async function GET() {
  try {
    // 1. Obtener datos estructurales desde Notion
    const circuitosDesdeNotion = await fetchCircuitosFromNotion();

    if (!Array.isArray(circuitosDesdeNotion) || circuitosDesdeNotion.length === 0) {
      return NextResponse.json({ circuitos: [] });
    }

    // 2. Obtener datos operativos desde Supabase
    const supabaseRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/vista_circuitos_completa`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    });

    if (!supabaseRes.ok) {
      throw new Error(`Supabase error: ${supabaseRes.status} ${supabaseRes.statusText}`);
    }

    const datosOperativos = await supabaseRes.json();

    // 3. Combinar y transformar datos por ID
    const circuitosCombinados = circuitosDesdeNotion.map((notionCircuito) => {
      const operativo = datosOperativos.find(op => op.id === notionCircuito.id);

      return {
  id: notionCircuito.id,
  nombre: notionCircuito.NombreCircuito,
  alias: notionCircuito.Alias || '',
  localidad: notionCircuito.Localidad || '',
  descripcion: operativo?.Descripcion || notionCircuito.Descripcion || '',
  dias: Array.isArray(notionCircuito.Dias) ? notionCircuito.Dias : [],
  horarios: Array.isArray(notionCircuito.Horarios) ? notionCircuito.Horarios : [],
  foto: notionCircuito.Foto || '/images/circuitos/default.jpg',
  distancia: notionCircuito.Distancia ?? null,
  estado: notionCircuito.Estado ?? false,
  cupo_total: operativo?.cupo_restante ?? null,
  cantidad_inscriptos: operativo?.cantidad_inscriptos ?? 0,
  punto_encuentro: operativo?.punto_encuentro || notionCircuito.PuntoEncuentro || null,
  url: notionCircuito.URL || null
};


    });

    return NextResponse.json(circuitosCombinados);

  } catch (error) {
    console.error('Error al sincronizar circuitos:', error);
    return NextResponse.json(
      { circuitos: [], error: error.message || 'Error desconocido' },
      { status: 500 }
    );
  }
}
