import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const NOTION_DB_ID = process.env.DATABASE_CIRCUITOS_ID;

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({ database_id: NOTION_DB_ID });

    const registros = response.results
      .filter((page) => 'properties' in page)
      .map((page) => {
        const props = page.properties;

        const fotoObj = props.Foto?.type === 'files' ? props.Foto.files?.[0] : null;
        const fotoUrl =
          fotoObj?.type === 'file'
            ? fotoObj.file.url
            : fotoObj?.type === 'external'
            ? fotoObj.external.url
            : null;

        return {
  id: page.id,
  NombreCircuito: props.NombreCircuito?.title?.[0]?.plain_text ?? '—',
  Alias: props.Alias?.select?.name ?? null,
  punto_encuentro: props.PuntoEncuentro?.rich_text?.[0]?.plain_text ?? null
};


      });

    const resultados = [];

    for (const circuito of registros) {
      const { error } = await supabase
        .from('circuitos')
        .upsert(circuito, { onConflict: 'id' });

      resultados.push({
        nombre: circuito.NombreCircuito,
        estado: error ? 'error' : 'ok',
        detalle: error?.message ?? 'Sincronizado correctamente'
      });
    }

    res.status(200).json({ resultados });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
