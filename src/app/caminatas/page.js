import { getUpcomingHikes } from '@/lib/notion';
import CaminataCard from '@/components/CaminataCard';

export const metadata = {
  title: 'Próximas Caminatas | Camina Vida',
  description: 'Únete a nuestras próximas caminatas terapéuticas en San Justo y Castelar. Horarios flexibles y grupos reducidos para una experiencia personalizada.',
  openGraph: {
    title: 'Próximas Caminatas | Camina Vida',
    description: 'Únete a nuestras próximas caminatas terapéuticas en San Justo y Castelar. Horarios flexibles y grupos reducidos para una experiencia personalizada.',
    url: 'https://buenas-caminatas.vercel.app/caminatas',
    images: [
      {
        url: 'https://buenas-caminatas.vercel.app/images/caminatas-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Próximas caminatas terapéuticas',
      },
    ],
  },
  alternates: {
    canonical: 'https://buenas-caminatas.vercel.app/caminatas',
  },
};

export default async function CaminatasPage() {
  let hikes = [];

  try {
    const result = await getUpcomingHikes();
    hikes = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('❌ Error al cargar caminatas:', error);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Próximas Caminatas</h1>
      <p className="text-xl text-center mb-8 text-gray-600">Únete a aventuras inolvidables en la naturaleza</p>

      {hikes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hikes.map((h) => (
            <CaminataCard key={h.id} caminata={h} />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-600 mt-8">⚠️ No se pudieron cargar las caminatas o no hay ninguna programada.</p>
      )}
    </div>
  );
}
