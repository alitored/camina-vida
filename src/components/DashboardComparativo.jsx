'use client';
import GraficoCircuitosPopulares from './GraficoCircuitosPopulares';
import GraficoDiasHorarios from './GraficoDiasHorarios';

export default function DashboardComparativo() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-verde-oscuro">📊 Estadísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4 min-h-[300px] overflow-hidden">
          <GraficoCircuitosPopulares />
        </div>
        <div className="bg-white rounded-xl shadow p-4 min-h-[300px] overflow-hidden">
          <GraficoDiasHorarios />
        </div>
      </div>
    </section>
  );
}
