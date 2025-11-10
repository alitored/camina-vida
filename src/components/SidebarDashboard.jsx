import Link from 'next/link';

export default function SidebarDashboard() {
  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen fixed top-0 left-0 bg-white border-r border-gray-100 p-5 z-40 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#00B884] to-[#00966e] grid place-items-center text-white font-bold">CS</div>
        <div>
          <div className="font-bold text-lg">Camina Vida</div>
          <div className="text-sm text-[#64748B]">La Buena Senda</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 text-sm font-semibold text-[#64748B]">
        <Link href="#resumen" className="hover:text-[#00B884]">📊 Resumen</Link>
        <Link href="#circuitos" className="hover:text-[#00B884]">🗺️ Circuitos</Link>
        <Link href="#inscriptos" className="hover:text-[#00B884]">👥 Inscriptos</Link>
        <Link href="#por-circuito" className="hover:text-[#00B884]">🗂️ Por circuito</Link>
        
      </nav>

      <div className="mt-auto pt-6">
        <div className="text-sm text-[#64748B]">Usuario</div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2979FF] to-[#6b9cff] grid place-items-center text-white font-bold">AA</div>
          <div>
            <div className="font-bold">Ale Arab</div>
            <div className="text-sm text-[#64748B]">Administrador</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
