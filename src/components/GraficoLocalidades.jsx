'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

export default function GraficoLocalidades({ datos, setLocalidad }) {
  const data = {
    labels: datos.map(d => d.localidad),
    datasets: [
      {
        label: 'Inscriptos',
        data: datos.map(d => d.cantidad),
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15'],
      },
    ],
  };

  const options = {
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const localidad = data.labels[index];
        setLocalidad(localidad); // 🔁 Navegación cruzada
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Inscriptos por localidad',
      },
    },
  };

  return <Bar data={data} options={options} />;
}
