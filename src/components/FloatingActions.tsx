'use client';

import React from 'react';
import { CONFIG } from '@/config';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      <a
        href={`tel:${CONFIG.CALL_NUMBER}`}
        className="w-auto h-auto px-4 py-2 bg-black border-2 border-amber-500 flex items-center justify-center text-amber-500 font-mono text-sm uppercase hover:bg-amber-500 hover:text-black transition-colors shadow-lg"
        aria-label="Call Us"
      >
        <Phone className="h-5 w-5 mr-1" />
        Call Us
      </a>
      <a
        href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-auto h-auto px-4 py-2 bg-black border-2 border-white flex items-center justify-center text-white font-mono text-sm uppercase hover:bg-white hover:text-black transition-colors shadow-lg"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="h-5 w-5 mr-1" />
        WhatsApp
      </a>
    </div>
  );
}
