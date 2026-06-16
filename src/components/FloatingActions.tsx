'use client';

import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { CONFIG } from '@/config';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      {/* Floating Call Button */}
      <a
        href={`tel:${CONFIG.CALL_NUMBER}`}
        className="w-14 h-14 bg-neutral-950 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:scale-110 transition-all duration-300 group"
        aria-label="Call Business"
      >
        <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
      </a>

      {/* Floating WhatsApp Button (custom black & gold theme) */}
      <a
        href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-neutral-950 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:scale-110 transition-all duration-300 group"
        aria-label="WhatsApp Chat"
      >
        {/* Pulsing glow outline ring */}
        <span className="absolute inset-0 rounded-full border border-amber-500 animate-ping opacity-45 pointer-events-none"></span>
        <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
}
