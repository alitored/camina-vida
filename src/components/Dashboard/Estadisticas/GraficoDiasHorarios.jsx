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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data, error: fetchError } = await supabase
        .from('inscripciones')
        .select('dia, horario');

      if (fetchError) {
        console.error('❌ Error al cargar días y horarios:', fetchError.message);
        setError('No se pudo cargar el gráfico');
        setLoading(false);
        return;
      }

      const filtrado = data.filter(d => d.dia && d.horario);
      const agrupado = {};

      filtrado.forEach(({ dia, horario }) => {
        const clave = `${dia.trim()} ${horario.trim()}`;
        agrupado[clave] = (agrupado[clave] || 0) + 1;
      });

      const resultado = Object.entries(agrupado).map(([rango, cantidad]) => ({
        rango,
        cantidad,
      }));

      setDatos(resultado);
      setLoading(false);
    }

    cargar();
  }, []);

  const chartData = {
    labels: datos.map(d => d.rango),
    datasets: [
      {
        label: 'Cantidad de inscriptos',
        data: datos.map(d => d.cantidad),
        backgroundColor: '#52b788',
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
        font: {
          size: 18,
        },
        color: '#1b4332',
      },
      tooltip: {
        backgroundColor: '#52796f',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#1b4332',
        },
      },
      y: {
        ticks: {
          color: '#1b4332',
        },
      },
    },
  };

  return (
    <section className="p-6 bg-card rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center text-verde-oscuro mb-4">
        Estadísticas por día y horario
      </h2>

      {loading && <p className="text-center text-muted">Cargando gráfico...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && datos.length > 0 && (
        <div className="overflow-x-auto">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {!loading && !error && datos.length === 0 && (
        <p className="text-center text-muted">No hay datos disponibles para mostrar.</p>
      )}
    </section>
  );
}

