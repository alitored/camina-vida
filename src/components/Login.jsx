'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completá todos los campos');
      return;
    }

    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      console.error('❌ Error de login:', loginError.message);
      setError(
        loginError.message.includes('Invalid login credentials')
          ? 'Usuario o contraseña incorrectos'
          : 'Error inesperado. Intenta nuevamente.'
      );
      return;
    }

    if (data?.session) {
      router.push('/dashboard');
    } else {
      setError('No se pudo iniciar sesión');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-fondo px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md"
        aria-label="Formulario de inicio de sesión"
      >
        <h1 className="mb-4 text-xl font-bold text-center text-verde-oscuro">Iniciar sesión</h1>

        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          required
        />

        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-verde-oscuro"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded font-semibold ${
            loading ? 'bg-muted cursor-not-allowed' : 'bg-verde-oscuro hover:bg-verde'
          } text-white transition`}
        >
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>

        {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
      </form>
    </main>
  );
}
