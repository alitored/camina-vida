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
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link href="/" className="text-3xl font-serif font-black italic text-irlanda-dark tracking-tighter">
          Camina Vida
        </Link>

        {/* MENÚ DESKTOP - PESO MÁXIMO */}
        <nav className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[13px] font-black uppercase tracking-[0.25em] text-irlanda-dark hover:text-irlanda-coral transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#reserva"
            className="bg-irlanda-dark text-white text-[13px] font-black uppercase tracking-widest px-10 py-4 rounded-2xl shadow-xl hover:bg-irlanda-coral transition-all"
          >
            Reserva ahora
          </Link>
        </nav>

        {/* BOTÓN MÓVIL REFORZADO */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-irlanda-dark focus:outline-none"
          aria-label="Menú"
        >
          {open ? <X size={38} strokeWidth={3} /> : <Menu size={38} strokeWidth={3} />}
        </button>
      </div>

      {/* MENÚ MÓVIL INMERSIVO */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setOpen(false)}>
                <X size={44} strokeWidth={3} className="text-irlanda-dark" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setOpen(false)}
                  className="text-5xl font-serif font-black text-irlanda-dark border-b-4 border-irlanda-soft pb-4 italic"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#reserva"
                onClick={() => setOpen(false)}
                className="bg-irlanda-coral text-white px-6 py-6 rounded-3xl font-black text-2xl text-center shadow-2xl uppercase tracking-tighter mt-4"
              >
                Inscribirme ahora
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}