import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <main className="bg-irlanda-crema min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-irlanda-soft/50">
        <Link href="/" className="text-irlanda-coral font-bold uppercase text-[10px] tracking-[0.3em] hover:underline mb-12 block">
          ← Volver al inicio
        </Link>
        
        <header className="mb-12 border-b border-irlanda-soft pb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-irlanda-dark italic mb-4">Política de Privacidad</h1>
          <p className="text-irlanda-coral font-bold tracking-widest uppercase text-xs">Camina Vida</p>
        </header>

        <div className="space-y-8 text-irlanda-dark/80 leading-relaxed text-sm md:text-base">
          <p>
            En <strong>Camina Vida</strong>, estamos comprometidos con la protección de la privacidad y de los datos personales de quienes participan en nuestras actividades, se contactan con nosotros o navegan por nuestro sitio web <span className="text-irlanda-coral">www.caminavida.com.ar</span>.
          </p>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">1. Responsable del tratamiento</h2>
            <p><strong>Denominación comercial:</strong> Camina Vida<br />
            <strong>Correo electrónico:</strong> hola@caminavida.com.ar<br />
            <strong>Teléfono:</strong> +54 9 11-5150 1147</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">2. Datos que recopilamos</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identificación:</strong> Nombre, apellido, teléfono, email y edad.</li>
              <li><strong>Salud:</strong> Información relevante (alergias, limitaciones) para garantizar tu seguridad en la caminata. Estos se tratan como datos sensibles bajo la Ley 25.326.</li>
              <li><strong>Navegación:</strong> Dirección IP y cookies técnicas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">3. Finalidades</h2>
            <p>Gestionar tu inscripción, garantizar tu seguridad durante la actividad, enviar recordatorios operativos (vía Email/WhatsApp) y cumplir con obligaciones legales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">4. Tus Derechos</h2>
            <p>Tienes derecho a acceder, rectificar o suprimir tus datos en cualquier momento enviando un correo a <strong>hola@caminavida.com.ar</strong>.</p>
          </section>

          <div className="bg-irlanda-soft/20 p-6 rounded-2xl border border-irlanda-soft">
            <p className="text-xs italic">
              Esta política se rige por la Ley N.º 25.326 de Protección de Datos Personales de la República Argentina.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}