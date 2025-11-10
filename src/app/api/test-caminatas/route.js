import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_CAMINATAS_FINALIZADAS_ID,
      page_size: 10,
    });

    return Response.json(response.results);
  } catch (error) {
    console.error('❌ Error en /api/test-caminatas:', error.message);
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
