"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award } from "lucide-react";

interface Badge {
  icon: React.ReactNode;
  text: string;
}

const badges: Badge[] = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-irlanda-verde" strokeWidth={2} />,
    text: "Coordinadores capacitados",
  },
  {
    icon: <Award className="h-5 w-5 text-irlanda-verde" strokeWidth={2} />,
    text: "Profesionales certificados",
  },
];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-8">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-5 py-2.5 border border-irlanda-verde/10 shadow-sm hover:border-irlanda-verde/30 transition-colors"
        >
          <div className="bg-irlanda-soft p-1.5 rounded-full">
            {badge.icon}
          </div>
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-irlanda-dark/70">
            {badge.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}