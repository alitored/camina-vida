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

export default function DashboardVistaInscripciones({ setFiltroCircuito }) {
  const [datosLocalidad, setDatosLocalidad] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      setError(null);

      const { data, error } = await supabase
        .from('vista_inscriptos_por_circuito')
        .select('localidad');

      if (error) {
        console.error('❌ Error al cargar inscripciones:', error.message);
        setError(error.message);
        setCargando(false);
        return;
      }

      // Agrupar por localidad
      const agrupado = data.reduce((acc, i) => {
        const loc = i.localidad?.trim();
        if (loc) acc[loc] = (acc[loc] || 0) + 1;
        return acc;
      }, {});

      const datos = Object.entries(agrupado).map(([localidad, cantidad]) => ({
        localidad,
        cantidad,
      }));

      setDatosLocalidad(datos);
      setCargando(false);
    }

    cargar();
  }, []);

  const chartData = {
    labels: datosLocalidad.map(d => d.localidad),
    datasets: [
      {
        label: 'Inscriptos',
        data: datosLocalidad.map(d => d.cantidad),
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#a78bfa'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Inscriptos por localidad',
      },
      legend: {
        display: false,
      },
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const localidad = chartData.labels[index];
        setFiltroCircuito(localidad); // 🔁 Navegación cruzada
      }
    },
  };

  return (
    <section className="p-6 space-y-6">
      <h2 className="text-xl font-bold">📊 Vista de inscriptos por localidad</h2>

      {error && <p className="text-red-600">❌ {error}</p>}
      {cargando ? (
        <p className="text-gray-500">Cargando datos...</p>
      ) : datosLocalidad.length === 0 ? (
        <p className="text-gray-500">No hay inscripciones registradas.</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </section>
  );
}
