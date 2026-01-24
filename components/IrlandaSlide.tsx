"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Bus, Ruler, Info } from "lucide-react";

const images = [
  "/irlanda1.webp",
  "/irlanda2.webp",
  "/irlanda3.webp",
];

export default function IrlandaSlide() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="detalles" className="py-20 px-6 bg-irlanda-crema">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera de la sección */}
        <div className="mb-12">
          <span className="text-irlanda-coral font-bold tracking-widest uppercase text-xs">
            Próxima Caminata
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-irlanda-dark mt-2">
            Circuito Plaza Irlanda <br />
            <span className="italic text-irlanda-coral font-light">destino de bienestar</span>
          </h2>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-irlanda-soft/50">
          
          {/* Slide de Fotos (Mitad Superior) */}
          <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Plaza Irlanda vista ${index + 1}`}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Detalles del Circuito (Mitad Inferior) */}
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
               <h3 className="text-2xl font-serif text-irlanda-dark">Detalles del Circuito</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna Izquierda: Logística */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold">Longitud</p>
                    <p className="text-irlanda-dark font-medium">Longitud: 900 metros</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold">Punto de Encuentro</p>
                    <p className="text-irlanda-dark font-medium">Donato Álvarez y Gaona</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Bus size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold">Transporte Público:</p>
                    <p className="text-irlanda-dark font-medium leading-relaxed">
                      Líneas: 44, 76, 84, 92, 99, 106, 113, 124, 172, 181.
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Comodidades y Acción */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold">Comodidades:</p>
                    <p className="text-irlanda-dark/70 text-sm leading-relaxed">
                      Sendas aeróbicas nuevas, seguridad permanente, baños públicos y zona de hidratación natural.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
  href="https://www.google.com/maps/search/?api=1&query=Plaza+Irlanda+Caballito+Buenos+Aires" 
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 bg-irlanda-coral text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-irlanda-coral/20 hover:scale-105 transition-all"
>
  <MapPin size={18} />
  Ver en Google Maps
</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}