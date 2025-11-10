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

export default function GraficoCircuitos() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      setError(null);
      const { data, error } = await supabase
        .from('vista_inscriptos_por_circuito')
        .select('circuito, cantidad');

      if (error) {
        setError(error.message);
        setCargando(false);
        return;
      }

      setDatos(data || []);
      setCargando(false);
    }

    cargarDatos();
  }, []);

  const chartData = {
    labels: datos.map(d => d.circuito),
    datasets: [
      {
        label: 'Inscriptos por circuito',
        data: datos.map(d => d.cantidad),
        backgroundColor: '#60a5fa',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: '📊 Inscriptos por circuito',
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 h-64">
      {error && <p className="text-red-600 text-sm">❌ Error: {error}</p>}
      {cargando ? (
        <p className="text-gray-500 text-sm">Cargando gráfico...</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
}
