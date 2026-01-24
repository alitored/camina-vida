import Link from "next/link";

export default function TerminosPage() {
  return (
    <main className="bg-irlanda-crema min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-irlanda-soft/50">
        
        {/* Enlace de regreso */}
        <Link href="/" className="text-irlanda-coral font-bold uppercase text-[10px] tracking-[0.3em] hover:underline mb-12 block">
          ← Volver al inicio
        </Link>
        
        <header className="mb-12 border-b border-irlanda-soft pb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-irlanda-dark italic mb-4">Términos y Condiciones</h1>
          <p className="text-irlanda-coral font-bold tracking-widest uppercase text-xs">
            Camina Vida – Caminatas terapéuticas sociosaludables
          </p>
        </header>

        <div className="space-y-10 text-irlanda-dark/80 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">1. Objeto del servicio</h2>
            <p>
              Camina Vida organiza caminatas terapéuticas grupales de 90 minutos que integran ejercicio físico moderado, técnicas de respiración consciente, mindfulness en movimiento y espacios de socialización, con fines de promoción de la salud física y mental, bienestar integral y prevención secundaria.
            </p>
            <p className="mt-4 italic">
              Las actividades ofrecidas no sustituyen tratamientos médicos, psicológicos, psiquiátricos ni rehabilitación kinésica formal, ni constituyen un acto médico en los términos de la legislación vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">2. Inscripción y formas de pago</h2>
            <p className="mb-4">La inscripción podrá realizarse a través de:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Sitio web oficial</li>
              <li>WhatsApp</li>
              <li>Presencialmente en el punto de encuentro, sujeto a disponibilidad de cupos</li>
            </ul>
            <p className="mb-4"><strong>Modalidades de pago disponibles:</strong></p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Sesión individual</li>
              <li>Bono mensual (4 caminatas)</li>
              <li>Bono trimestral (12 caminatas)</li>
            </ul>
            <p className="mb-4"><strong>Medios de pago aceptados:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Efectivo, Transferencia bancaria, Mercado Pago, Tarjeta de débito y/o crédito.</li>
            </ul>
            <p className="mt-4">
              Una vez acreditado el pago, el participante adquiere el derecho a participar en la actividad correspondiente. Camina Vida emitirá factura tipo B o C, según corresponda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">3. Política de cancelación, reprogramación y devoluciones</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-irlanda-dark underline decoration-irlanda-coral/30 mb-2">a) Cancelación por parte del participante</h3>
                <p><strong>Con más de 24 horas de anticipación:</strong> → Reprogramación sin costo o conservación del crédito.</p>
                <p><strong>Con menos de 24 horas de anticipación o inasistencia:</strong> → Se pierde la sesión, salvo presentación de certificado médico dentro de las 48 horas posteriores, en cuyo caso se otorgará un crédito.</p>
              </div>
              <div>
                <h3 className="font-bold text-irlanda-dark underline decoration-irlanda-coral/30 mb-2">b) Cancelación por parte de Camina Vida</h3>
                <p>En caso de lluvia intensa, alertas meteorológicas, razones de seguridad o fuerza mayor, la caminata será reprogramada o el crédito quedará disponible sin vencimiento. En bonos mensuales o trimestrales, se extenderá automáticamente su vigencia.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">4. Obligaciones del participante</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Firmar el Consentimiento Informado antes de la primera caminata y cada vez que se produzcan cambios relevantes en su estado de salud.</li>
              <li>Brindar información veraz, completa y actualizada sobre patologías, medicación y limitaciones físicas.</li>
              <li>Presentarse al menos 10 minutos antes del horario de inicio.</li>
              <li>Utilizar calzado adecuado, ropa cómoda, portar agua y protección solar.</li>
              <li>Respetar las indicaciones del facilitador durante toda la actividad.</li>
              <li>Mantener una conducta respetuosa hacia el grupo y el entorno natural, evitando dejar residuos o dañar flora y fauna.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">5. Responsabilidad y seguros</h2>
            <p className="mb-4">
              Camina Vida cuenta con seguro de responsabilidad civil y accidentes personales conforme a la normativa aplicable.
            </p>
            <p className="mb-4">
              El participante declara conocer y aceptar los riesgos mínimos inherentes a una actividad física al aire libre, detallados en el Consentimiento Informado, y asume la responsabilidad por cualquier daño derivado de:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Información falsa, incompleta u omitida</li>
              <li>Incumplimiento de las indicaciones del facilitador</li>
            </ul>
            <p className="italic text-xs">Camina Vida no se responsabiliza por pérdida, daño o extravío de objetos personales.</p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">6. Menores y capacidad</h2>
              <p className="text-sm">
                <strong>Menores de 13 años:</strong> acompañados por un adulto responsable.<br />
                <strong>De 13 a 17 años:</strong> con autorización escrita y firma del Consentimiento por el tutor legal.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">7. Propiedad e Imagen</h2>
              <p className="text-sm">
                Contenidos, recorridos y metodologías son propiedad intelectual de Camina Vida. El uso de imagen se rige por el Consentimiento Informado.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">8. Modificaciones del servicio</h2>
            <p>Camina Vida se reserva el derecho de modificar horarios, recorridos, puntos de encuentro o facilitadores por razones organizativas, comunicándolo con la mayor antelación posible.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-irlanda-dark mb-4 uppercase tracking-wider">9. Resolución de conflictos</h2>
            <p>Ante controversias, las partes procurarán resolverlas de buena fe. En su defecto, serán competentes los tribunales de la Ciudad de Buenos Aires o los Juzgados Federales en materia de consumo (Ley 24.240).</p>
          </section>

          <section className="bg-irlanda-dark text-white p-8 rounded-[2rem] text-center">
            <h2 className="text-2xl font-serif italic mb-4">10. Aceptación de los términos</h2>
            <p className="text-sm text-white/80 mb-6">
              La inscripción y/o el pago implican la aceptación plena de los presentes Términos y Condiciones y del Consentimiento Informado.
            </p>
            <div className="text-[10px] uppercase tracking-widest opacity-60">
              Vigencia y última actualización: 30 de noviembre de 2025
            </div>
          </section>

          <footer className="text-center pt-8">
            <p className="font-serif italic text-2xl text-irlanda-dark">Gracias por elegir caminar con nosotros.</p>
            <p className="text-irlanda-coral font-bold mt-2">Camina Vida</p>
          </footer>

        </div>
      </div>
    </main>
  );
}