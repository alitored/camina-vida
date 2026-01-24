'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece después de que el usuario haya pasado el Hero
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
        >
          <div className="bg-irlanda-dark/95 backdrop-blur-lg text-white shadow-2xl rounded-3xl border border-white/10 p-5 flex items-center justify-between gap-4 max-w-md mx-auto">
            <div className="flex flex-col">
              <p className="text-sm font-bold tracking-tight text-irlanda-crema">
                Plaza Irlanda
              </p>
              <p className="text-[11px] font-medium text-irlanda-coral uppercase tracking-widest">
                14 Feb · 09:30hs
              </p>
            </div>
            
            <a
              href="#registro"
              className="bg-irlanda-coral text-white font-bold py-3 px-6 rounded-2xl text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              Reservar
              <ArrowRight size={14} strokeWidth={3} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}