"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beneficios", href: "#beneficios" },
    { name: "Método", href: "#metodo" },
    { name: "Detalles", href: "#detalles" },
    { name: "Comunidad", href: "#beneficios" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        <Link 
          href="/" 
          className="text-2xl font-serif italic text-irlanda-dark font-bold tracking-tighter"
        >
          Camina Vida
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-irlanda-dark/70 hover:text-irlanda-coral transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#reserva"
            className="bg-irlanda-coral text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-orange-900/20 hover:bg-[#e44d2a] hover:scale-105 transition-all"
          >
            Reserva ahora
          </Link>
        </nav>

        {/* Botón menú móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-irlanda-dark"
          aria-label="Menú"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil COMPLETO */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-irlanda-soft overflow-hidden"
          >
            <nav className="flex flex-col space-y-6 px-8 py-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setOpen(false)}
                  className="text-lg font-serif text-irlanda-dark border-b border-irlanda-soft pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#reserva"
                onClick={() => setOpen(false)}
                className="bg-irlanda-coral text-white px-6 py-4 rounded-2xl font-bold text-center shadow-lg"
              >
                Reserva ahora
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}