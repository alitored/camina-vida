'use client';
import { useState, useEffect } from 'react';
import { Filter, RefreshCw, Search } from 'lucide-react';

// 🔧 Función de normalización
function normalizarHorarios(horarios) {
  if (Array.isArray(horarios)) {
    return horarios.map(h => h.toString().trim()).filter(Boolean);
  }
  if (typeof horarios === 'string') {
    return horarios
      .split(',')
      .map(h => h.toString().trim())
      .filter(Boolean);
  }
  return [];
}

export default function FiltrosCircuitos({ circuitos, onFiltrar }) {
  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // ✅ Normalización aplicada aquí
  const diasUnicos = [...new Set(circuitos.flatMap(c => Array.isArray(c.dias) ? c.dias : (c.dias?.split(',') || [])).flat().map(d => d.toString().trim()).filter(Boolean))].sort();
  const horariosUnicos = [...new Set(circuitos.flatMap(c => normalizarHorarios(c.horarios)))].sort();
  const localidadesUnicas = [...new Set(circuitos.map(c => c.localidad).filter(Boolean))].sort();

  useEffect(() => {
    const filtrados = circuitos.filter((c) => {
      const coincideDia = diaSeleccionado
        ? (Array.isArray(c.dias) ? c.dias : (c.dias?.split(',') || [])).map(d => d.toString().trim()).includes(diaSeleccionado)
        : true;

      // ✅ Normalización aplicada aquí
      const coincideHorario = horarioSeleccionado
        ? normalizarHorarios(c.horarios).includes(horarioSeleccionado)
        : true;

      const coincideLocalidad = localidadSeleccionada
        ? c.localidad?.toLowerCase() === localidadSeleccionada.toLowerCase()
        : true;

      const texto = busqueda.trim().toLowerCase();
      const coincideTexto = texto
        ? [c.nombre, c.descripcion, c.alias, c.localidad]
            .filter(Boolean)
            .some((campo) => campo.toLowerCase().includes(texto))
        : true;

      return coincideDia && coincideHorario && coincideLocalidad && coincideTexto;
    });

    onFiltrar(filtrados);
  }, [diaSeleccionado, horarioSeleccionado, localidadSeleccionada, busqueda, circuitos, onFiltrar]);

  const limpiarFiltros = () => {
    setDiaSeleccionado('');
    setHorarioSeleccionado('');
    setLocalidadSeleccionada('');
    setBusqueda('');
    onFiltrar(circuitos);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <Filter className="text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtrar Circuitos</h3>
      </div>

      <div className="mb-5 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nombre, alias o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <FiltroSelect label="Día" value={diaSeleccionado} onChange={setDiaSeleccionado} opciones={diasUnicos} placeholder="Todos los días" />
        <FiltroSelect label="Horario" value={horarioSeleccionado} onChange={setHorarioSeleccionado} opciones={horariosUnicos} placeholder="Todos los horarios" />
        <FiltroSelect label="Localidad" value={localidadSeleccionada} onChange={setLocalidadSeleccionada} opciones={localidadesUnicas} placeholder="Todas las localidades" />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 italic">{circuitos.length} circuitos disponibles</p>
        <button onClick={limpiarFiltros} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          <RefreshCw size={16} />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

function FiltroSelect({ label, value, onChange, opciones, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
        <option value="">{placeholder}</option>
        {opciones.map(op => (
          <option key={`${label}-${op}`} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}