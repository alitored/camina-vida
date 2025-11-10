'use client';
import { useEffect, useState, useRef } from 'react';
import FormularioInscripcion from './FormularioInscripcion';

export default function InscripcionModal({ circuitoId, nombreCircuito, onClose }) {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);

  // Animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Cierre con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Cierre al hacer clic fuera del modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform transition-all duration-300
          ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>

        <FormularioInscripcion
          circuitoId={circuitoId}
          nombreCircuito={nombreCircuito}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
