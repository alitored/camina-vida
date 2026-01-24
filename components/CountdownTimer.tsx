'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string; // ISO 8601, ej. '2026-02-14T09:30:00-03:00'
}

const FlipUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-14 h-16 md:w-20 md:h-24 overflow-hidden bg-white rounded-2xl flex items-center justify-center border border-irlanda-verde/10 shadow-sm">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'backOut' }}
          className="text-2xl md:text-4xl font-serif font-bold text-irlanda-dark"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      {/* Efecto de línea divisoria estilo reloj antiguo */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="w-full h-[1px] bg-irlanda-verde/5" />
      </div>
    </div>
    <span className="mt-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-irlanda-coral">
      {label}
    </span>
  </div>
);

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    hasEnded: boolean;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) return { hasEnded: true };

      return {
        hasEnded: false,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const intervalId = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(intervalId);
  }, [isClient, targetDate]);

  if (!isClient || timeLeft === null) {
    return <div className="h-40 flex items-center justify-center text-irlanda-dark/20 uppercase tracking-widest text-xs">Cargando cronograma...</div>;
  }

  if (timeLeft.hasEnded) {
    return (
      <div className="bg-white/50 backdrop-blur-md rounded-premium p-8 border border-irlanda-verde/10 text-center max-w-md mx-auto">
        <p className="text-irlanda-dark font-serif text-xl">🎉 El encuentro ha comenzado</p>
        <p className="text-irlanda-dark/60 mt-2 text-sm font-light">Nos vemos en Plaza Irlanda.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-irlanda-dark/40 mb-8 font-bold text-[11px] uppercase tracking-[0.3em]"
        >
          Tiempo restante para el encuentro
        </motion.p>
        <div className="flex justify-center space-x-4 md:space-x-8">
          <FlipUnit value={timeLeft.days!} label="Días" />
          <FlipUnit value={timeLeft.hours!} label="Horas" />
          <FlipUnit value={timeLeft.minutes!} label="Min" />
          <FlipUnit value={timeLeft.seconds!} label="Seg" />
        </div>
      </div>
    </div>
  );
}