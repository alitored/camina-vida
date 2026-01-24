"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      {/* BOTÓN DISPARADOR CON SHINE */}
      <motion.button 
        onClick={() => { setIsOpen(true); setStep(1); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-irlanda-dark text-white px-20 py-6 rounded-full font-bold text-xl shadow-2xl transition-all flex items-center gap-4 border border-white/10"
      >
        <span className="bg-white/10 p-2 rounded-full">
          <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight size={22} className="text-irlanda-coral" />
          </motion.div>
        </span>
        <span className="relative z-10 uppercase tracking-widest text-sm">Reservar mi lugar ahora</span>
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
            className="fixed inset-0 z-[10000] bg-[#f9fafb] flex items-center justify-center p-6"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-irlanda-dark/40 hover:text-irlanda-coral transition-colors">
              <X size={32} />
            </button>

            <div className="max-w-2xl w-full">
              {status !== "success" ? (
                <div className="space-y-12">
                  <div className="w-full h-1 bg-irlanda-dark/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-irlanda-coral" initial={{ width: 0 }} animate={{ width: `${(step / totalSteps) * 100}%` }} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="min-h-[350px] flex flex-col justify-center">
                      {step === 1 && (
                        <div className="space-y-6">
                          <label className="text-irlanda-coral font-bold tracking-widest text-xs uppercase">1 → ¿Cómo te llamás?</label>
                          <input autoFocus type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} placeholder="Tu nombre..." className="w-full bg-transparent text-4xl md:text-6xl font-serif italic border-b border-irlanda-dark/20 py-4 outline-none focus:border-irlanda-coral" />
                        </div>
                      )}
                      {step === 2 && (
                        <div className="space-y-6">
                          <label className="text-irlanda-coral font-bold tracking-widest text-xs uppercase">2 → Tu mejor email</label>
                          <input autoFocus type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@correo.com" className="w-full bg-transparent text-4xl md:text-6xl font-serif italic border-b border-irlanda-dark/20 py-4 outline-none focus:border-irlanda-coral" />
                        </div>
                      )}
                      {step === 3 && (
                        <div className="space-y-6">
                          <label className="text-irlanda-coral font-bold tracking-widest text-xs uppercase block text-center">3 → ¿Qué edad tenés?</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {ages.map((age) => (
                              <button key={age} onClick={() => { setFormData({...formData, edad: age}); nextStep(); }} className={`p-5 rounded-xl border text-sm font-bold transition-all ${formData.edad === age ? 'bg-irlanda-dark text-white' : 'bg-white border-irlanda-dark/10 hover:border-irlanda-coral'}`}>{age}</button>
                            ))}
                          </div>
                        </div>
                      )}
                      {step === 4 && (
                        <div className="space-y-6">
                          <label className="text-irlanda-coral font-bold tracking-widest text-xs uppercase">4 → Tu WhatsApp</label>
                          <input autoFocus type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} placeholder="11..." className="w-full bg-transparent text-4xl md:text-6xl font-serif italic border-b border-irlanda-dark/20 py-4 outline-none focus:border-irlanda-coral" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-4">
                    {step > 1 && <button onClick={prevStep} className="p-5 rounded-2xl border border-irlanda-dark/10 hover:bg-white transition-all"><ArrowLeft size={24} /></button>}
                    {step < totalSteps ? (
                      <button onClick={nextStep} disabled={step === 1 ? !formData.nombre : step === 2 ? !formData.email : false} className="flex-1 bg-irlanda-dark text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-irlanda-coral transition-all">Continuar <ArrowRight size={20} /></button>
                    ) : (
                      <button onClick={handleSubmit} disabled={status === "loading" || !formData.whatsapp} className="flex-1 bg-irlanda-coral text-white py-5 rounded-2xl font-bold text-xl transition-all">{status === "loading" ? "Procesando..." : "Finalizar Registro"}</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <CheckCircle2 size={100} className="mx-auto text-irlanda-verde" />
                  <h2 className="text-5xl font-serif italic">¡Inscripción Exitosa!</h2>
                  <p className="text-xl text-irlanda-dark/60">Te enviamos los detalles a tu email.</p>
                  <button onClick={() => { setIsOpen(false); setStatus("idle"); setStep(1); }} className="underline font-bold text-irlanda-coral">Cerrar</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}