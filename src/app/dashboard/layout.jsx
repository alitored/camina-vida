'use client';
import { useState, useEffect, useRef } from 'react';
import SidebarDashboard from '@/components/SidebarDashboard';

export default function DashboardLayout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarVisible]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-[Inter] relative flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } w-[260px] bg-white shadow`}
      >
        <SidebarDashboard />
      </div>

      {/* Botón ☰ */}
      <button
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className="fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full shadow px-3 py-2 text-sm font-bold hover:bg-gray-50"
        title={sidebarVisible ? 'Ocultar menú' : 'Mostrar menú'}
      >
        ☰
      </button>

      {/* Contenido */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarVisible && !isMobile ? 'ml-[260px]' : ''
        }`}
      >
        <main className="px-4 sm:px-6 py-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
