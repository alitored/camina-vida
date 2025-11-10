'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

export default function GraficoDiasHorarios() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase
        .from('inscripciones')
        .select('dia, horario');

      if (error) {
        console.error('Error al cargar días y horarios:', error.message);
        return;
      }

      const agrupado = {};
      data.forEach(({ dia, horario }) => {
        const clave = `${dia} ${horario}`;
        agrupado[clave] = (agrupado[clave] || 0) + 1;
      });

      const resultado = Object.entries(agrupado).map(([rango, cantidad]) => ({
        rango,
        cantidad,
      }));

      setDatos(resultado);
    }

    cargar();
  }, []);

  const chartData = {
    labels: datos.map(d => d.rango),
    datasets: [
      {
        label: 'Cantidad de inscriptos',
        data: datos.map(d => d.cantidad),
        backgroundColor: '#60a5fa',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Días y horarios más elegidos',
      },
    },
  };

  return (
    <section className="p-6">
      <Bar data={chartData} options={chartOptions} />
    </section>
  );
}
