'use client';
import DashboardGraficos from './DashboardGraficos';
import GraficoCircuitosPopulares from './GraficoCircuitosPopulares';

export default function DashboardComparativo() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-verde-oscuro">Comparativa de circuitos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4 h-64 overflow-hidden">
          <DashboardGraficos />
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-64 overflow-hidden">
          <GraficoCircuitosPopulares />
        </div>
      </div>
    </section>
  );
}
