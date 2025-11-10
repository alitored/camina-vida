import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function SessionProvider({ children }) {
  let usuario = null;

  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    usuario = user
      ? {
          id: user.id,
          email: user.email,
          rol: user.user_metadata?.rol || 'invitado',
          nombre: user.user_metadata?.nombre || '',
        }
      : null;
  } catch (error) {
    console.warn('No se pudo obtener la sesión de Supabase:', error.message);
    // No rompemos el render, simplemente seguimos sin usuario
  }

  return typeof children === 'function' ? children(usuario) : children;
}
