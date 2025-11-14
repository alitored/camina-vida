'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 📊 Estadísticas
import DashboardResumen from '@/components/Dashboard/Estadisticas/DashboardResumen';
import DashboardComparativo from '@/components/Dashboard/Estadisticas/DashboardComparativo';

// 🛣️ Circuitos
import DashboardCircuitos from '@/components/Dashboard/Circuitos/DashboardCircuitos';

// 👥 Inscriptos
import DashboardInscriptos from '@/components/Dashboard/Inscriptos/DashboardInscriptos';

// 🔐 Logout
import LogoutButton from '@/components/LogoutButton';

// 🔗 Supabase
import supabase from '@/lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [inscriptos, setInscriptos] = useState([]);
  const [circuitos, setCircuitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verificandoSesion, setVerificandoSesion] = useState(true);

  // 🔐 Verificar sesión activa
  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        router.replace('/login');
      } else {
        setVerificandoSesion(false);
      }
    };
    verificarSesion();
  }, [router]);

  // 📦 Cargar datos si hay sesión
  useEffect(() => {
    if (verificandoSesion) return;

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
  }, [verificandoSesion]);

  if (verificandoSesion) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-fondo text-texto font-sans">
        <p className="text-gray-500 text-sm">Verificando sesión...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-fondo text-texto font-sans p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-verde-oscuro">
          Dashboard Camina Vida
        </h1>
        <LogoutButton />
      </div>

      <DashboardResumen inscriptos={inscriptos} circuitos={circuitos} />
      <DashboardCircuitos circuitos={circuitos} />
      {!loading && <DashboardInscriptos inscriptos={inscriptos} />}
      <DashboardComparativo inscriptos={inscriptos} circuitos={circuitos} />
    </main>
  );
}
