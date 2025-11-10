import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { user, pass } = body;

  if (user === 'camina' && pass === 'vida2024') {
    const response = NextResponse.json({ success: true });

    response.cookies.set('auth', 'true', {
      path: '/',
      httpOnly: true,
      secure: false, // ✅ en desarrollo, debe ser false
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}

