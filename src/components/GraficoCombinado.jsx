'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function GraficoCombinado({ setFechaFiltro }) {
  const [agrupado, setAgrupado] = useState({});

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase
        .from('vista_inscripciones_completa')
        .select('created_at, localidad');

      if (error) {
        console.error('Error al cargar inscripciones:', error);
        return;
      }

      const agrupado = {};

      data.forEach(({ created_at, localidad }) => {
        const fecha = new Date(created_at).toLocaleDateString();
        if (!agrupado[fecha]) agrupado[fecha] = {};
        agrupado[fecha][localidad] = (agrupado[fecha][localidad] || 0) + 1;
      });

      setAgrupado(agrupado);
    }

    cargar();
  }, []);

  const fechas = Object.keys(agrupado);
  const localidades = Array.from(
    new Set(fechas.flatMap(f => Object.keys(agrupado[f])))
  );

  const datasets = localidades.map((loc, i) => ({
    label: loc,
    data: fechas.map(f => agrupado[f][loc] || 0),
    backgroundColor: ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#a78bfa'][i % 5],
  }));

  const chartData = {
    labels: fechas,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Inscriptos por fecha y localidad',
      },
      legend: {
        position: 'top',
      },
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const fecha = chartData.labels[index];
        const iso = new Date(fecha).toISOString().split('T')[0];
        setFechaFiltro(iso); // 🔁 Navegación cruzada por fecha
      }
    },
  };

  return (
    <section className="p-6">
      <Bar data={chartData} options={chartOptions} />
    </section>
  );
}
