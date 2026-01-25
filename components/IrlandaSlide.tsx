"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Bus, Ruler, Info, ExternalLink } from "lucide-react";
import { useForm } from "./FormContext";

const images = [
  "/irlanda1.webp",
  "/irlanda2.webp",
  "/irlanda3.webp",
];

export default function IrlandaSlide() {
  const { openForm } = useForm();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="detalles" className="py-20 px-6 bg-irlanda-crema">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-irlanda-coral font-sans font-bold tracking-widest uppercase text-xs">
            Próxima Caminata
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-irlanda-dark mt-2">
            Circuito Plaza Irlanda <br />
            <span className="italic text-irlanda-coral font-light">destino de bienestar</span>
          </h2>
        </div>

        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-irlanda-soft/50">
          
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

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
               <h3 className="text-2xl font-serif text-irlanda-dark">Detalles del Circuito</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold font-sans">Longitud</p>
                    <p className="text-irlanda-dark font-sans font-medium">900 metros</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold font-sans">Punto de Encuentro</p>
                    <p className="text-irlanda-dark font-sans font-medium">Donato Álvarez y Gaona</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Bus size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold font-sans">Transporte Público:</p>
                    <p className="text-irlanda-dark font-sans font-medium leading-relaxed">
                      Líneas: 44, 76, 84, 92, 99, 106, 113, 124, 172, 181.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-irlanda-soft rounded-2xl text-irlanda-verde">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-irlanda-dark/40 font-bold font-sans">Comodidades:</p>
                    <p className="text-irlanda-dark/70 text-sm font-sans leading-relaxed">
                      Sendas aeróbicas nuevas, seguridad permanente, baños públicos y zona de hidratación natural.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Plaza+Irlanda+Caballito+Buenos+Aires" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-irlanda-coral font-sans font-bold hover:underline"
                  >
                    <MapPin size={18} />
                    Ver en Google Maps <ExternalLink size={14} />
                  </a>

                  {/* 3.0 CTA POST-CONTEXTO: Reservá tu lugar para esta caminata */}
                  <button 
                    onClick={openForm}
                    className="w-full bg-irlanda-dark text-white px-8 py-4 rounded-xl font-sans font-bold text-lg hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Reservá tu lugar para esta caminata
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}