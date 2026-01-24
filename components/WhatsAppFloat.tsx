"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  const phoneNumber = "5491151501147";
  const message = "consulta-caminata";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      // Z-INDEX MÁXIMO PARA SUPERAR AL STICKY CTA
      className="fixed bottom-28 right-6 z-[9999] md:bottom-10 md:right-10 block"
      aria-label="Contacto por WhatsApp"
    >
      <div className="relative group flex items-center justify-center">
        {/* Pulso de fondo */}
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
        
        {/* Contenedor con color sólido por si la imagen no carga */}
        <div className="relative bg-[#25D366] p-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-2 border-white/20">
          <img 
            src="/ws.png" 
            alt="WhatsApp" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain block"
            style={{ minWidth: '32px', minHeight: '32px' }}
            onError={(e) => {
               console.error("Error cargando /ws.png");
               e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback: Si la imagen no está, verás un círculo verde al menos */}
        </div>

        <span className="absolute right-full mr-4 bg-white text-irlanda-dark text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-irlanda-soft uppercase tracking-widest">
          ¿Dudas? Escribinos
        </span>
      </div>
    </motion.a>
  );
}