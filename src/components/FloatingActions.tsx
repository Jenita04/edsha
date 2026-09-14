'use client';

import React from 'react';
import { CONFIG } from '@/config';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      <a
        href={`tel:${CONFIG.CALL_NUMBER}`}
        className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-black hover:bg-amber-400 transition-colors shadow-lg"
        aria-label="Call Us"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-black hover:bg-amber-400 transition-colors shadow-lg"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
