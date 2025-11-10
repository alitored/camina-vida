/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';

// 🧩 Validar variables de entorno
if (!process.env.NOTION_API_KEY)
  throw new Error('❌ FALTA NOTION_API_KEY');
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error('❌ FALTAN VARIABLES DE SUPABASE');

// 🔗 Inicializar clientes
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 🧭 Leer circuitos desde Notion
export async function fetchCircuitosFromNotion() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CIRCUITOS_ID,
      filter: { property: 'Estado', checkbox: { equals: true } },
      sorts: [{ property: 'NombreCircuito', direction: 'ascending' }]
    });

    return response.results
      .map((page) => {
        const props = page.properties;

        const circuito = {
          id: page.id,
          NombreCircuito:
            props['NombreCircuito']?.title?.[0]?.plain_text?.trim() || null,
          Alias: props['Alias']?.rich_text?.[0]?.plain_text?.trim() || null,
          Descripcion:
            props['Descripcion']?.rich_text?.[0]?.plain_text?.trim() || null,
          Dias: props['Dias']?.multi_select?.map((d) => d.name) || [],
          Horarios: props['Horarios']?.multi_select?.map((h) => h.name) || [],
          Distancia: props['Distancia']?.number ?? null,
          Estado: props['Estado']?.checkbox ?? false,
          Foto: props['Foto']?.rich_text?.[0]?.plain_text?.trim() || null,
          Localidad: props['Localidad']?.select?.name || null,
          url: `https://www.notion.so/${page.id.replace(/-/g, '')}`
        };

        if (!circuito.NombreCircuito) return null;
        return circuito;
      })
      .filter(Boolean);
  } catch (error) {
    console.error('❌ Error al obtener circuitos desde Notion:', error.message);
    return [];
  }
}

// 🔗 Combinar datos de Notion con Supabase
export async function getCircuitos() {
  try {
    const notionCircuitos = await fetchCircuitosFromNotion();

    const { data: supabaseData, error } = await supabase
      .from('vista_circuitos_completa')
      .select('*');

    if (error) {
      console.error('❌ Error Supabase:', error.message);
      return notionCircuitos.map((c) => ({
        ...c,
        cupoRestante: '—',
        cantidad_inscriptos: 0,
        tiene_coordinador: false,
        sincronizado: false
      }));
    }

    return notionCircuitos.map((c) => {
      const op = supabaseData.find((s) => s.id === c.id);
      return {
        id: c.id,
        nombre: c.NombreCircuito,
        alias: c.Alias || '',
        localidad: c.Localidad || '',
        descripcion: c.Descripcion ?? '',
        dias: c.Dias || [],
        horarios: c.Horarios || [],
        foto: c.Foto || '/images/circuitos/default.jpg',
        distancia: c.Distancia ?? null,
        estado: c.Estado ?? false,
        cupo_total: op?.cupo_restante ?? null,
        cantidad_inscriptos: op?.cantidad_inscriptos ?? 0,
        tiene_coordinador: op?.tiene_coordinador ?? false,
        sincronizado: !!op,
        punto_encuentro: op?.punto_encuentro || null,
        url: c.url || null
      };
    });
  } catch (error) {
    console.error('❌ Error al combinar circuitos:', error.message);
    return [];
  }
}

// 🧱 Leer bloques de contenido editorial desde una página de Notion
export async function fetchPageBlocks(pageId) {
  try {
    const blocks = [];
    let cursor = undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor
      });

      blocks.push(...response.results);
      cursor = response.has_more ? response.next_cursor : null;
    } while (cursor);

    return blocks;
  } catch (error) {
    console.error('❌ Error al obtener bloques de Notion:', error.message);
    return [];
  }
}
