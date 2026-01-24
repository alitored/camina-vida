"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowLeft, AlertCircle } from "lucide-react";
import { useForm } from "./FormContext";

export default function LeadForm() {
  const { isOpen, closeForm } = useForm();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ nombre: "", email: "", edad: "", whatsapp: "" });

  const totalSteps = 4;
  const ages = useMemo(() => ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"], []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Error al procesar el registro.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Falla de red. Intenta nuevamente.");
    }
  }, [formData]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex items-center justify-center p-4 md:p-6"
      >
        <button onClick={closeForm} className="absolute top-6 right-6 p-2 text-irlanda-dark hover:text-irlanda-coral z-[10000]">
          <X size={40} strokeWidth={3} />
        </button>

        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-irlanda-dark/5">
          {status !== "success" ? (
            <div className="flex flex-col gap-8">
              <div className="w-full h-2 bg-irlanda-soft rounded-full overflow-hidden">
                <motion.div className="h-full bg-irlanda-coral" animate={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>

              <div className="min-h-[220px] flex flex-col justify-center">
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-black italic text-irlanda-dark">¿Tu nombre?</h2>
                    <input autoFocus type="text" value={formData.nombre} onChange={(e) => setFormData(p => ({...p, nombre: e.target.value}))} className="w-full text-2xl md:text-3xl font-bold border-b-4 border-irlanda-dark py-2 outline-none text-irlanda-dark" placeholder="Escribí acá..." />
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-black italic text-irlanda-dark">Tu email</h2>
                    <input autoFocus type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} className="w-full text-2xl md:text-3xl font-bold border-b-4 border-irlanda-dark py-2 outline-none text-irlanda-dark" placeholder="hola@email.com" />
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif font-black italic text-irlanda-dark mb-4">Tu edad</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {ages.map((age) => (
                        <button key={age} onClick={() => { setFormData(p => ({...p, edad: age})); setStep(4); }} className={`p-4 rounded-xl border-2 font-black transition-all ${formData.edad === age ? 'bg-irlanda-dark text-white' : 'bg-white border-irlanda-dark/10 text-irlanda-dark'}`}>{age}</button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-black italic text-irlanda-dark">WhatsApp</h2>
                    <input autoFocus type="tel" value={formData.whatsapp} onChange={(e) => setFormData(p => ({...p, whatsapp: e.target.value}))} className="w-full text-2xl md:text-3xl font-bold border-b-4 border-irlanda-dark py-2 outline-none text-irlanda-dark" placeholder="11..." />
                  </div>
                )}
              </div>

              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 font-bold border border-red-100 text-sm">
                  <AlertCircle size={18} /> {errorMessage}
                </div>
              )}

              <div className="flex gap-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="p-4 rounded-xl border-2 border-irlanda-dark/10 text-irlanda-dark"><ArrowLeft size={24} /></button>
                )}
                <button 
                  onClick={step < totalSteps ? () => setStep(step + 1) : handleSubmit}
                  disabled={status === "loading" || (step === 1 && !formData.nombre) || (step === 2 && !formData.email)}
                  className="flex-1 bg-irlanda-coral text-white py-4 rounded-xl font-black text-lg md:text-xl uppercase shadow-lg disabled:opacity-50"
                >
                  {status === "loading" ? "Procesando..." : step < totalSteps ? "Siguiente" : "Finalizar"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-8">
              <CheckCircle2 size={80} className="mx-auto text-irlanda-verde" strokeWidth={3} />
              <h2 className="text-4xl md:text-5xl font-serif font-black italic text-irlanda-dark">¡Muy Bien, concretaste tu Reserva!</h2>
              <p className="text-lg font-bold text-irlanda-dark/60">Revisá tu email para los detalles de la caminata.</p>
              <button onClick={closeForm} className="text-irlanda-coral font-black uppercase tracking-widest border-b-2 border-irlanda-coral pb-1 text-lg">Cerrar ventana</button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}