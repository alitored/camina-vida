import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const aliasMap = {
  circuitoId: 'circuito_id',
  id: 'circuito_id',
  nombreCircuito: 'nombre_circuito',
  NombreCircuito: 'nombre_circuito',
  Edad: 'edad',
  edad: 'edad',
  dni: 'dni',
  whatsapp: 'whatsapp',
  nombre: 'nombre',
  fecha: 'fecha',
  estado: 'estado',
  dia: 'dia',
  horario: 'horario'
};

function normalizarCampos(body) {
  const normalizado = {};
  for (const key in body) {
    const clave = aliasMap[key] ?? key;
    normalizado[clave] = body[key];
  }
  return normalizado;
}

export async function POST(req) {
  try {
    const rawBody = await req.json();
    const body = normalizarCampos(rawBody);
    const {
      nombre,
      whatsapp,
      edad,
      circuito_id,
      dni,
      nombre_circuito,
      dia,
      horario
    } = body;

    if (!nombre || !whatsapp || !edad || !circuito_id || !dni || !dia || !horario) {
      return Response.json({ success: false, error: 'Datos incompletos' }, { status: 400 });
    }

    const { data: circuito, error: errorCircuito } = await supabase
      .from('circuitos')
      .select('*')
      .eq('id', circuito_id)
      .single();

    if (errorCircuito || !circuito) {
      return Response.json({ success: false, error: 'Circuito no encontrado' }, { status: 404 });
    }

    const estadoCrudo = circuito.estado ?? circuito.Estado;
    const estadoValido = ['true', 'TRUE', 'True', true, 1, 'activo'].includes(estadoCrudo);
    if (!estadoValido) {
      return Response.json({ success: false, error: 'Circuito inactivo' }, { status: 403 });
    }

    const { data: duplicado } = await supabase
      .from('inscripciones')
      .select('id')
      .eq('circuito_id', circuito_id)
      .eq('whatsapp', whatsapp)
      .eq('dia', dia)
      .eq('horario', horario);

    if (duplicado.length > 0) {
      return Response.json({ success: false, error: 'Ya inscripto con ese WhatsApp en ese horario' }, { status: 409 });
    }

    const hayCupo = circuito.cupoActual < circuito.cupo_total;
    const estadoInscripcion = hayCupo ? 'Pendiente' : 'En espera';

    const { error: errorInsert } = await supabase.from('inscripciones').insert([
      {
        nombre,
        whatsapp,
        edad: parseInt(edad),
        circuito_id,
        dni,
        estado: estadoInscripcion,
        fecha: new Date().toISOString(),
        dia,
        horario,
        notificado_director: false
      }
    ]);

    if (errorInsert) {
      return Response.json({ success: false, error: 'Error al guardar inscripción' }, { status: 500 });
    }

    if (hayCupo) {
      await supabase
        .from('circuitos')
        .update({ cupoActual: (circuito.cupoActual ?? 0) + 1 })
        .eq('id', circuito_id);
    }

    // ✅ Envío de correo con nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.DIRECTOR_EMAIL,
        pass: process.env.DIRECTOR_EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.DIRECTOR_EMAIL,
      to: 'sendabuena@gmail.com',
      subject: `Nuevo inscripto: ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px;">
          <p>📥 Se ha registrado una nueva inscripción:</p>
          <table style="border-collapse: collapse; margin-top: 8px;">
            <tr><td style="padding: 4px 8px;"><strong>Nombre:</strong></td><td>${nombre}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>Edad:</strong></td><td>${edad}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>DNI:</strong></td><td>${dni}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>WhatsApp:</strong></td><td>${whatsapp}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>Circuito:</strong></td><td>${nombre_circuito}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>Día:</strong></td><td>${dia}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>Horario:</strong></td><td>${horario}</td></tr>
            <tr><td style="padding: 4px 8px;"><strong>Estado:</strong></td><td>${estadoInscripcion}</td></tr>
          </table>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    const mensaje = `Nuevo inscripto:\nNombre: ${nombre}\nEdad: ${edad}\nCircuito: ${nombre_circuito}\nDía: ${dia}\nHorario: ${horario}`;
    const enlaceWhatsApp = `https://wa.me/5491151501147?text=${encodeURIComponent(mensaje)}`;

    return Response.json({ success: true, estado: estadoInscripcion, enlaceWhatsApp }, { status: 200 });
  } catch (err) {
    console.error('🔥 Error inesperado:', err);
    return Response.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
