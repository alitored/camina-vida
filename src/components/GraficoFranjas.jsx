'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale);

export default function GraficoFranjas({ datos = [] }) {
  const labels = datos.map(d => d.rango);
  const cantidades = datos.map(d => d.cantidad);

  const data = {
    labels,
    datasets: [
      {
        label: 'Cantidad de inscriptos',
        data: cantidades,
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24'],
        borderRadius: 4
      }
    ]
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: context => ` ${context.parsed.y} inscriptos`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
}
