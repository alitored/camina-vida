'use client';
import { useEffect, useState } from 'react';
import { UsuarioProvider } from '@/context/UsuarioContext';

export default function SessionWrapper({ usuario, children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <UsuarioProvider usuario={usuario}>
      {typeof children === 'function' ? children(usuario) : children}
    </UsuarioProvider>
  );
}
