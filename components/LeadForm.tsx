"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export default function LeadForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    edad: "",
    whatsapp: ""
  });

  const totalSteps = 4;
  const ages = ["Menos de 18", "18-25", "26-35", "36-45", "46-55", "56-65", "Más de 65"];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus("success");
      else setStatus("idle");
    } catch (error) {
      setStatus("idle");
    }
  };

  return (
    <div className="flex justify-center w-full">
      {/* BOTÓN DE ACTIVACIÓN CON PESO MÁXIMO */}
      <motion.button 
        onClick={() => { setIsOpen(true); setStep(1); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-irlanda-dark text-white px-16 py-7 rounded-full font-black text-xl shadow-2xl flex items-center gap-4 border-2 border-white/20"
      >
        <span className="bg-irlanda-coral p-2 rounded-full shadow-lg">
          <ArrowRight size={22} className="text-white" strokeWidth={3} />
        </span>
        <span className="relative z-10 uppercase tracking-tighter">Reservar mi lugar ahora</span>
        <motion.div 
          animate={{ left: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 3 }}
          className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-irlanda-crema flex items-center justify-center p-6"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-irlanda-dark hover:text-irlanda-coral transition-colors">
              <X size={44} strokeWidth={4} />
            </button>

            <div className="max-w-2xl w-full">
              {status !== "success" ? (
                <div className="space-y-12">
                  {/* BARRA DE PROGRESO */}
                  <div className="w-full h-3 bg-irlanda-dark/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-irlanda-coral" initial={{ width: 0 }} animate={{ width: `${(step / totalSteps) * 100}%` }} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="min-h-[350px] flex flex-col justify-center">
                      <label className="text-irlanda-coral font-black tracking-[0.25em] text-sm uppercase mb-6">Paso {step} de {totalSteps}</label>
                      
                      {step === 1 && (
                        <div className="space-y-6">
                          <h2 className="text-5xl md:text-7xl font-serif font-black text-irlanda-dark italic leading-tight">¿Cómo te llamás?</h2>
                          <input autoFocus type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} placeholder="Tu nombre..." className="w-full bg-transparent text-4xl md:text-6xl font-bold border-b-4 border-irlanda-dark py-4 outline-none focus:border-irlanda-coral text-irlanda-dark placeholder:text-irlanda-dark/10" />
                        </div>
                      )}
                      {step === 2 && (
                        <div className="space-y-6">
                          <h2 className="text-5xl md:text-7xl font-serif font-black text-irlanda-dark italic leading-tight">Tu mejor email</h2>
                          <input autoFocus type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@correo.com" className="w-full bg-transparent text-4xl md:text-6xl font-bold border-b-4 border-irlanda-dark py-4 outline-none focus:border-irlanda-coral text-irlanda-dark placeholder:text-irlanda-dark/10" />
                        </div>
                      )}
                      {step === 3 && (
                        <div className="space-y-6">
                          <h2 className="text-4xl md:text-5xl font-serif font-black text-irlanda-dark italic mb-8">¿Qué edad tenés?</h2>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {ages.map((age) => (
                              <button key={age} onClick={() => { setFormData({...formData, edad: age}); nextStep(); }} className={`p-6 rounded-2xl border-2 text-base font-black transition-all ${formData.edad === age ? 'bg-irlanda-dark text-white border-irlanda-dark shadow-xl' : 'bg-white border-irlanda-dark/20 text-irlanda-dark hover:border-irlanda-coral'}`}>{age}</button>
                            ))}
                          </div>
                        </div>
                      )}
                      {step === 4 && (
                        <div className="space-y-6">
                          <h2 className="text-5xl md:text-7xl font-serif font-black text-irlanda-dark italic leading-tight">Tu WhatsApp</h2>
                          <input autoFocus type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} placeholder="11 1234 5678" className="w-full bg-transparent text-4xl md:text-6xl font-bold border-b-4 border-irlanda-dark py-4 outline-none focus:border-irlanda-coral text-irlanda-dark placeholder:text-irlanda-dark/10" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-6">
                    {step > 1 && (
                      <button onClick={prevStep} className="p-6 rounded-2xl border-2 border-irlanda-dark/20 text-irlanda-dark hover:bg-white transition-all shadow-md">
                        <ArrowLeft size={32} strokeWidth={4} />
                      </button>
                    )}
                    {step < totalSteps ? (
                      <button 
                        onClick={nextStep} 
                        disabled={step === 1 ? !formData.nombre : step === 2 ? !formData.email : false} 
                        className="flex-1 bg-irlanda-dark text-white py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-2 hover:bg-irlanda-coral disabled:opacity-20 transition-all shadow-xl uppercase"
                      >
                        Siguiente <ArrowRight size={28} strokeWidth={4}/>
                      </button>
                    ) : (
                      <button 
                        onClick={handleSubmit} 
                        disabled={status === "loading" || !formData.whatsapp} 
                        className="flex-1 bg-irlanda-coral text-white py-6 rounded-2xl font-black text-2xl hover:bg-[#e44d2a] transition-all shadow-xl uppercase tracking-widest"
                      >
                        {status === "loading" ? "Procesando..." : "Finalizar Registro"}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8">
                  <CheckCircle2 size={130} className="mx-auto text-irlanda-verde" strokeWidth={3} />
                  <h2 className="text-6xl md:text-7xl font-serif font-black italic text-irlanda-dark">¡Inscripto!</h2>
                  <p className="text-2xl font-bold text-irlanda-dark/70">Revisá tu email ahora mismo.</p>
                  <button onClick={() => { setIsOpen(false); setStatus("idle"); setStep(1); }} className="text-irlanda-coral font-black uppercase tracking-widest border-b-4 border-irlanda-coral pb-1 text-xl">Volver al inicio</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}