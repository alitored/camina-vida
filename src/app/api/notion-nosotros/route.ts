import { NextResponse } from 'next/server';
import { fetchPageBlocks } from '@/lib/notion';

export async function GET() {
  const blocks = await fetchPageBlocks('2a7343867017806085c5de0b76723cb5'); // ID de tu página "Nosotros"
  return NextResponse.json({ blocks });
}
console.log('🧪 Fetching Notion blocks...');
const blocks = await fetchPageBlocks('2a734386-7017-8060-85c5-de0b76723cb5');
console.log('📦 Bloques recibidos:', blocks.length);
