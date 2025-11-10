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

export default function DashboardVistaFiltrada() {
  const [inscripciones, setInscripciones] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [localidadFiltro, setLocalidadFiltro] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Cargar localidades únicas
  useEffect(() => {
    const cargarLocalidades = async () => {
      const { data, error } = await supabase
        .from('vista_inscriptos_dashboard')
        .select('localidad')
        .neq('localidad', '')
        .order('localidad', { ascending: true });

      if (error) {
        console.error('❌ Error al cargar localidades:', error.message);
        return;
      }

      const únicas = [...new Set(data.map(i => i.localidad).filter(Boolean))];
      setLocalidades(únicas);
    };

    cargarLocalidades();
  }, []);

  // 🔄 Cargar inscripciones filtradas
  useEffect(() => {
    async function cargar() {
      setCargando(true);
      setError(null);
      let query = supabase.from('vista_inscriptos_dashboard').select('*');

      if (localidadFiltro) query = query.eq('localidad', localidadFiltro);
      if (fechaFiltro) query = query.gte('created_at', fechaFiltro);

      const { data, error } = await query;
      if (error) {
        setError(error.message);
        setCargando(false);
        return;
      }

      setInscripciones(data || []);
      setCargando(false);
    }

    cargar();
  }, [localidadFiltro, fechaFiltro]);

  const agrupado = inscripciones.reduce((acc, i) => {
    const fecha = i.created_at && !isNaN(new Date(i.created_at))
      ? new Date(i.created_at).toISOString().split('T')[0]
      : null;
    if (fecha) acc[fecha] = (acc[fecha] || 0) + 1;
    return acc;
  }, {});

  const fechasOrdenadas = Object.keys(agrupado).sort((a, b) => new Date(a) - new Date(b));

  const chartData = {
    labels: fechasOrdenadas,
    datasets: [
      {
        label: 'Inscriptos por fecha',
        data: fechasOrdenadas.map(f => agrupado[f]),
        backgroundColor: '#60a5fa',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '📆 Inscriptos por fecha',
      },
      legend: {
        display: false,
      },
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const fecha = chartData.labels[index];
        setFechaFiltro(fecha);
      }
    },
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex gap-4 items-center">
        <select
          value={localidadFiltro}
          onChange={e => setLocalidadFiltro(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todas las localidades</option>
          {localidades.map(loc => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {fechaFiltro && (
          <button
            onClick={() => setFechaFiltro('')}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Limpiar fecha
          </button>
        )}
      </div>

      {error && <p className="text-red-600">❌ {error}</p>}
      {cargando ? (
        <p className="text-gray-500">Cargando datos...</p>
      ) : (
        <>
          <Bar data={chartData} options={chartOptions} />

          <table className="w-full border text-sm mt-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Nombre</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Circuito</th>
                <th className="border px-2 py-1">Localidad</th>
                <th className="border px-2 py-1">Horario</th>
                <th className="border px-2 py-1">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((i, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{i.nombre}</td>
                  <td className="border px-2 py-1">{i.email}</td>
                  <td className="border px-2 py-1">{i.circuito}</td>
                  <td className="border px-2 py-1">{i.localidad}</td>
                  <td className="border px-2 py-1">{i.horario}</td>
                  <td className="border px-2 py-1">
                    {new Date(i.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
