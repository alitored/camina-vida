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

export default function GraficoCircuitosPopulares() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const { data: insc, error: errorInsc } = await supabase
        .from('inscripciones')
        .select('circuito_id');

      const { data: circ, error: errorCirc } = await supabase
        .from('vista_circuitos_completa')
        .select('circuito_id, "NombreCircuito"');

      if (errorInsc || errorCirc) {
        console.error('Error al cargar datos:', errorInsc?.message || errorCirc?.message);
        return;
      }

      const conteo = {};
      insc.forEach(i => {
        conteo[i.circuito_id] = (conteo[i.circuito_id] || 0) + 1;
      });

      const enriquecido = Object.entries(conteo).map(([id, cantidad]) => {
        const circuito = circ.find(c => c.circuito_id === id);
        return {
          nombre: circuito?.NombreCircuito || '—',
          cantidad,
        };
      });

      setDatos(enriquecido);
    }

    cargar();
  }, []);

  const chartData = {
    labels: datos.map(d => d.nombre),
    datasets: [
      {
        label: 'Cantidad de inscriptos',
        data: datos.map(d => d.cantidad),
        backgroundColor: '#34d399',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Circuitos más elegidos',
      },
    },
  };

  return (
    <section className="p-6">
      <Bar data={chartData} options={chartOptions} />
    </section>
  );
}
