import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { nombre, circuitoNombre, emailDestino } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.DIRECTOR_EMAIL,
      pass: process.env.DIRECTOR_EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.DIRECTOR_EMAIL,
    to: emailDestino,
    subject: `Nuevo inscripto en ${circuitoNombre}`,
    html: `<p><strong>${nombre}</strong> se ha inscripto en el circuito <strong>${circuitoNombre}</strong>.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    res.status(500).json({ error: 'Error al enviar email' });
  }
}
