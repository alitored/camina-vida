'use client';

export default function FloatingActionButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#00B884] text-white shadow-lg text-xl z-50"
      title="Agregar participante"
      onClick={() => alert('Abrir modal para crear participante (simulado).')}
    >
      +
    </button>
  );
}
