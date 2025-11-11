'use client';
import { useState, useEffect } from 'react';
import DashboardResumen from '@/components/DashboardResumen';
import DashboardCircuitos from '@/components/DashboardCircuitos';
import DashboardInscriptos from '@/components/DashboardInscriptos';
import DashboardComparativo from '@/components/DashboardComparativo';
import supabase from '@/lib/supabase';
import LogoutButton from '@/components/LogoutButton'; // si lo usabas en el sidebar

export default function DashboardPage() {
  const [inscriptos, setInscriptos] = useState([]);
  const [circuitos, setCircuitos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: inscData, error: inscError } = await supabase
          .from('vista_inscriptos_dashboard')
          .select('*');
        const { data: circData, error: circError } = await supabase
          .from('vista_circuitos_completa')
          .select('*');

        if (inscError || circError) throw inscError || circError;

        setInscriptos(inscData || []);
        setCircuitos(circData || []);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    // ✅ Mismo contenedor que usabas antes, pero sin sidebar
    <main className="min-h-screen bg-fondo text-texto font-sans p-4 sm:p-6 md:p-8 space-y-6">
      {/* Título con Logout (como tenías en el header del dashboard) */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-verde-oscuro">Dashboard Camina Vida</h1>
        <LogoutButton />
      </div>

      {/* ✅ Todo el contenido igual que antes */}
      <DashboardResumen inscriptos={inscriptos} circuitos={circuitos} />
      <DashboardCircuitos />
      {!loading && <DashboardInscriptos inscriptos={inscriptos} />}
      <DashboardComparativo inscriptos={inscriptos} circuitos={circuitos} />
    </main>
  );
}