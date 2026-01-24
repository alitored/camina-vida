"use client";
import { useForm } from "./FormContext";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const { openForm } = useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Aparece al scrollear
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 100, opacity: 0 }}
          // FIX 2: Eliminado 'md:hidden' para que se vea en Desktop.
          // Agregado max-w-fit y centrado para que se vea PRO en pantallas grandes.
          className="fixed bottom-6 left-0 right-0 z-[90] flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto bg-irlanda-dark text-white p-4 rounded-full shadow-2xl flex items-center gap-6 border border-white/10 backdrop-blur-sm pr-2 pl-6">
            <div className="flex flex-col md:flex-row md:gap-3 md:items-baseline">
              <span className="font-black text-lg leading-none">Plaza Irlanda</span>
              <span className="text-xs text-irlanda-coral font-bold tracking-widest uppercase mt-1 md:mt-0">14 FEB · 09:30HS</span>
            </div>
            <button 
              onClick={openForm}
              className="bg-irlanda-coral text-white px-6 py-3 rounded-full font-black text-sm uppercase flex items-center gap-2 shadow-lg hover:bg-[#e44d2a] transition-colors"
            >
              Reservar <ArrowRight size={18} strokeWidth={3} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}