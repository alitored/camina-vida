"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "./FormContext";
import { Menu, X, ChevronDown, Heart, Calendar, Wind, Map, Sparkles } from "lucide-react";

export default function Header() {
  const { openForm } = useForm();
  const [openMobile, setOpenMobile] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          if (scrolled !== isScrolled) setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navLinkStyle = `transition-colors duration-300 font-medium text-[13px] lg:text-sm ${
    scrolled ? "text-slate-600 hover:text-[#FF5C35]" : "text-white hover:text-orange-200"
  }`;

  return (
    <>
      <header className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled ? "bg-[#FFFBF7]/95 backdrop-blur-md py-2 shadow-sm border-b border-orange-50" : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div className="flex-none pr-10 z-[110]">
            <Link href="/" className="block transition-transform hover:scale-105">
              <Image 
                src="/logo.webp" 
                alt="Logo Camina Vida" 
                width={85} 
                height={85} 
                priority
                className={`object-contain transition-all duration-500 ${scrolled ? "w-[60px]" : "w-[85px]"}`}
                style={{ height: "auto", width: "auto" }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10 ml-auto">
            <nav className="flex items-center gap-8">
              <div className="relative" onMouseEnter={() => setOpenMega(true)} onMouseLeave={() => setOpenMega(false)}>
                <button className={`flex items-center gap-1.5 py-4 ${navLinkStyle}`}>
                  Categorías <ChevronDown size={14} className={`transition-transform duration-300 ${openMega ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute right-0 top-full transition-all duration-300 ${openMega ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"}`}>
                  <div className="w-[700px] bg-white shadow-2xl rounded-[2.5rem] p-10 grid grid-cols-3 gap-10 border border-orange-50 mt-2">
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold">Bienestar</h4>
                      <Link href="/#beneficios" onClick={() => setOpenMega(false)} className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] text-sm font-serif italic"><Heart size={18} /> Beneficios</Link>
                      <Link href="/#metodo" onClick={() => setOpenMega(false)} className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] text-sm font-serif italic"><Wind size={18} /> Método</Link>
                    </div>
                    {/* El resto de links mantienen DM Sans para claridad */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold">Recorridos</h4>
                      <Link href="/#circuitos" onClick={() => setOpenMega(false)} className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] text-sm"><Map size={18} /> Circuitos</Link>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold">Social</h4>
                      <Link href="/#social" onClick={() => setOpenMega(false)} className="flex items-center gap-3 text-slate-600 hover:text-[#FF5C35] text-sm font-bold"><Sparkles size={18} /> Social Red</Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/#beneficios" className={navLinkStyle}>Beneficios</Link>
              <Link href="/#metodo" className={navLinkStyle}>Nuestro Método</Link>
            </nav>
            {/* CTA con DM Sans Bold para máximo contraste */}
            <button onClick={openForm} className={`flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold transition-all duration-300 active:scale-95 ${scrolled ? "bg-[#FF5C35] text-white shadow-lg" : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-[#FF5C35]"}`}><Calendar size={16} /> Reservar</button>
          </div>

          <div className="md:hidden z-[110]">
            <button onClick={() => setOpenMobile(true)} className={scrolled ? "text-slate-800" : "text-white"} aria-label="Abrir menú"><Menu size={32} /></button>
          </div>
        </div>
      </header>

      {/* Mobile Aside corregido con accesibilidad */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-[#FFFBF7] shadow-2xl z-[9000] p-10 transform transition-transform duration-500 ${openMobile ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-12">
          <Image src="/logo.webp" alt="Logo" width={60} height={60} style={{ height: "auto", width: "auto" }} />
          <button onClick={() => setOpenMobile(false)} aria-label="Cerrar menú"><X size={32} /></button>
        </div>
        <nav className="flex flex-col gap-8 text-2xl font-bold text-irlanda-dark">
          <Link href="/#beneficios" onClick={() => setOpenMobile(false)}>Beneficios</Link>
          <Link href="/#metodo" onClick={() => setOpenMobile(false)}>Método</Link>
          <Link href="/#circuitos" onClick={() => setOpenMobile(false)}>Caminatas</Link>
        </nav>
        <button onClick={() => { setOpenMobile(false); openForm(); }} className="w-full mt-16 px-6 py-5 bg-[#FF5C35] text-white rounded-[2rem] font-bold shadow-xl">Reservar ahora</button>
      </aside>
      {openMobile && <div className="fixed inset-0 bg-black/20 z-[8000] backdrop-blur-sm" onClick={() => setOpenMobile(false)} />}
    </>
  );
}