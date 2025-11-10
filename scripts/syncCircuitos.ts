import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const NOTION_DB_ID = process.env.DATABASE_CIRCUITOS_ID!;

async function syncCircuitos() {
  console.log('🚀 Iniciando sincronización de circuitos desde Notion a Supabase...');

  const response = await notion.databases.query({ database_id: NOTION_DB_ID });

  const registros = response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map((page) => {
      const props = page.properties;

      const fotoObj = props.Foto?.type === 'files' ? props.Foto.files?.[0] : null;
      const fotoUrl =
        fotoObj?.type === 'file'
          ? (fotoObj as { type: 'file'; file: { url: string } }).file.url
          : fotoObj?.type === 'external'
          ? (fotoObj as { type: 'external'; external: { url: string } }).external.url
          : null;

      const circuito = {
        id: page.id,
        nombre: props.NombreCircuito?.type === 'title'
          ? props.NombreCircuito.title?.[0]?.plain_text ?? '—'
          : '—',
        alias: props.Alias?.type === 'rich_text'
          ? props.Alias.rich_text?.[0]?.plain_text ?? null
          : null,
        descripcion: props.Descripcion?.type === 'rich_text'
          ? props.Descripcion.rich_text?.[0]?.plain_text ?? null
          : null,
        dias: props.Dias?.type === 'multi_select'
          ? props.Dias.multi_select.map((d) => d.name)
          : [],
        horarios: props.Horarios?.type === 'multi_select'
          ? props.Horarios.multi_select.map((h) => h.name)
          : [],
        distancia: props.Distancia?.type === 'number'
          ? props.Distancia.number
          : null,
        estado: props.Estado?.type === 'checkbox'
          ? props.Estado.checkbox
          : false,
        foto: fotoUrl,
        localidad: props.Localidad?.type === 'select'
          ? props.Localidad.select?.name ?? null
          : null,
        url: props.url?.type === 'url'
          ? props.url.url ?? null
          : null,
        punto_encuentro: props['Punto de Encuentro']?.type === 'rich_text'
          ? props['Punto de Encuentro'].rich_text?.[0]?.plain_text ?? null
          : null,
        cupo_total: props['Cupo Total']?.type === 'number'
          ? props['Cupo Total'].number ?? 15
          : 15,
        coordinador_id: props.Coordinador?.type === 'relation'
          ? props.Coordinador.relation?.[0]?.id ?? null
          : null
      };

      console.log(`📦 Circuito: ${circuito.nombre}`, circuito);
      return circuito;
    });

  for (const circuito of registros) {
    const { error } = await supabase
      .from('circuitos')
      .upsert(circuito, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error al sincronizar circuito ${circuito.nombre}:`, error.message);
    } else {
      console.log(`✅ Circuito sincronizado: ${circuito.nombre}`);
    }
  }

  console.log('🏁 Sincronización finalizada.');
}

syncCircuitos();
