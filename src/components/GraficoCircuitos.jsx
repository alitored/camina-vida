'use client';
import { useEffect, useState, useMemo } from 'react';
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
    const cargarDatos = async () => {
      setCargando(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('vista_inscriptos_por_circuito')
          .select('circuito, cantidad');

        if (error) throw error;
        // Filtrar datos inválidos
        const validos = (data || []).filter(d => d.circuito && d.cantidad != null);
        setDatos(validos);
      } catch (err) {
        setError(err.message || 'Error al cargar el gráfico');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Preparar datos para Chart.js
  const chartData = useMemo(() => {
    return {
      labels: datos.map(d => d.circuito),
      datasets: [
        {
          label: 'Inscriptos',
          data: datos.map(d => d.cantidad),
          backgroundColor: '#00B884', // color de Camina Vida
          borderRadius: 4,
        },
      ],
    };
  }, [datos]);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: '📊 Circuitos más elegidos',
        font: { size: 16 },
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Inscriptos: ${context.raw}`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: '#f3f4f6' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 h-80">
      {error && <p className="text-red-600 text-sm mb-2">❌ {error}</p>}
      {cargando ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Cargando gráfico...
        </div>
      ) : datos.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No hay datos para mostrar</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
}