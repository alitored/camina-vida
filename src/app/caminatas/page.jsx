// src/app/caminatas/page.jsx
import { getCircuitosVista } from '@/lib/circuitosVista';
import CaminatasCliente from '@/components/CaminatasCliente';

export default async function CaminatasPage() {
  const circuitos = await getCircuitosVista();
  return <CaminatasCliente circuitos={circuitos} />;
}

