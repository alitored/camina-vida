'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user, pass }),
      });

      if (res.status === 401) {
        setError('Usuario o contraseña incorrectos');
        return;
      }

      if (!res.ok) {
        console.error(`Error HTTP: ${res.status}`);
        throw new Error('Error del servidor');
      }

      const result = await res.json();

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Error de login:', err);
      setError('Hubo un problema al iniciar sesión');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-xl font-bold">Iniciar sesión</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Entrar
        </button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
    </main>
  );
}
