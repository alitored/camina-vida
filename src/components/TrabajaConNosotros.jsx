'use client';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import supabase from '@/lib/supabase';

// Carga dinámica para evitar errores SSR
const Code = dynamic(() => import('react-notion-x/build/third-party/code'), { ssr: false });
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection'), { ssr: false });

export default function TrabajaConNosotros({ recordMap }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    horarios: [],
    circuitos: [],
    motivacion: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions).map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('coordinadores_postulantes').insert([
      {
        ...formData,
        estado: 'coordinador_pendiente',
        creado_en: new Date(),
      },
    ]);
    if (error) {
      setMensaje('Hubo un error al enviar tu postulación.');
      console.error(error);
    } else {
      setMensaje('¡Gracias por postularte! Te contactaremos pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        horarios: [],
        circuitos: [],
        motivacion: '',
      });
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Trabajá con nosotros</h1>

      <section className="mb-12 prose prose-lg max-w-none">
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
          components={{ Code, Collection }}
        />
      </section>

      <section className="bg-gray-50 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Formulario de postulación</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono de contacto"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label className="block font-semibold">Horarios disponibles</label>
          <select
            name="horarios"
            multiple
            value={formData.horarios}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Mañana (8:00–11:00)</option>
            <option>Tarde (14:00–17:00)</option>
            <option>Atardecer (17:00–20:00)</option>
          </select>

          <label className="block font-semibold">Circuitos que te interesan</label>
          <select
            name="circuitos"
            multiple
            value={formData.circuitos}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Parque Central</option>
            <option>Costanera Sur</option>
            <option>Reserva Ecológica</option>
            <option>Barrio Histórico</option>
          </select>

          <textarea
            name="motivacion"
            placeholder="¿Por qué te gustaría coordinar caminatas?"
            value={formData.motivacion}
            onChange={handleChange}
            rows={4}
            required
            className="w-full p-2 border rounded"
          />

          <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
            Enviar postulación
          </button>
        </form>
        {mensaje && <p className="mt-4 text-green-700 font-medium">{mensaje}</p>}
      </section>
    </main>
  );
}
