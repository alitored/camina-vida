import { getCircuitos } from '@/lib/notion';
import CircuitosClient from './CircuitosClient';

export default async function PaginaCircuitos() {
  let circuitos = [];

  try {
    circuitos = await getCircuitos();
  } catch (error) {
    console.error('❌ Error al cargar circuitos:', error);
  }

  return (
    <main className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Todos los circuitos</h1>
      <CircuitosClient circuitosIniciales={circuitos} />
    </main>
  );
}
