import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { email, nombre, circuito, horario } = JSON.parse(req.body);

  await resend.emails.send({
    from: 'Camina Vida <info@caminavida.com>',
    to: email,
    subject: '¡Fuiste aprobado como coordinador!',
    html: `
      <p>Hola ${nombre},</p>
      <p>¡Gracias por postularte! Has sido aprobado como coordinador de caminatas.</p>
      <p><strong>Circuito asignado:</strong> ${circuito}</p>
      <p><strong>Horario:</strong> ${horario}</p>
      <p>Nos pondremos en contacto para coordinar los próximos pasos.</p>
      <p>Equipo Camina Vida</p>
    `,
  });

  res.status(200).json({ success: true });
}
