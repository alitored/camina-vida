import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import EventDetails from "@/components/EventDetails";
import CountdownTimer from "@/components/CountdownTimer";
import IrlandaSlide from "@/components/IrlandaSlide"; // Nuevo componente
import Beneficios from "@/components/Beneficios";
import Method from "@/components/Method";
import SocialRed from "@/components/SocialRed";
import LeadForm from "@/components/LeadForm";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";

export default function LandingPlazaIrlanda() {
  return (
    <main className="relative min-h-screen bg-irlanda-crema">
      <Header />
      <Hero />
      
      <div className="relative z-10 -mt-12 max-w-4xl mx-auto px-6">
        <TrustBadges />
      </div>

      <EventDetails />
      
      <div className="py-10">
        <CountdownTimer targetDate="2026-02-14T09:30:00-03:00" />
      </div>

      {/* Sección del Circuito con Slide */}
      <IrlandaSlide />

      <Beneficios />
      <Method />
      <SocialRed />

      <div id="reserva" className="bg-irlanda-soft/30 py-20 border-t border-irlanda-soft/50">
        <LeadForm />
      </div>

      <StickyCTA />
      <Footer />
    </main>
  );
}