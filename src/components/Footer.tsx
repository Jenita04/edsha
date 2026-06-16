'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, Heart, Sparkles } from 'lucide-react';
import { CONFIG } from '@/config';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-amber-500/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Gold Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="luxury-card p-8 sm:p-12 mb-16 text-center max-w-4xl mx-auto relative overflow-hidden border-amber-500/20">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>
          <Sparkles className="h-8 w-8 text-amber-500 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-serif text-white font-bold mb-3 tracking-wide">Join the Exclusive Circle</h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Subscribe to receive insider access to new collections, limited edition hampers, and exclusive gifting privileges.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to the Exclusive Circle!'); }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-grow bg-neutral-950 border border-amber-500/30 rounded-full px-6 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-neutral-600"
            />
            <button type="submit" className="gold-gradient-bg px-8 py-3.5 text-sm uppercase tracking-widest whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          
          {/* Brand Profile */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/images/edsha_logo.jpeg" alt="EDSHA Logo" className="h-10 w-10 object-cover rounded-md border border-amber-500/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]" />
              <span className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 gold-text-glow font-serif">
                {CONFIG.BUSINESS_NAME}
              </span>
            </div>
            <p className="text-sm leading-loose text-neutral-400 font-light">
              Elevating the art of gifting. We curate premium personalized experiences to make your special moments truly unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-white font-serif font-bold text-lg mb-6 tracking-wide flex items-center gap-2">
              <span className="w-4 h-[1px] bg-amber-500 inline-block"></span>
              Collections
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Home</Link>
              </li>
              <li>
                <Link href="/frames" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Acrylic Frames</Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Women's Hampers</Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Men's Hampers</Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Kids' Hampers</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support policies */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6 tracking-wide flex items-center gap-2">
              <span className="w-4 h-[1px] bg-amber-500 inline-block"></span>
              Client Care
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/#delivery-info" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Delivery & Returns</Link>
              </li>
              <li>
                <Link href="/#faq-section" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Corporate Gifting</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-amber-400 transition-colors inline-block transform hover:translate-x-1 duration-300">Contact Concierge</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5 text-sm text-neutral-400">
            <h3 className="text-white font-serif font-bold text-lg mb-6 tracking-wide flex items-center gap-2">
              <span className="w-4 h-[1px] bg-amber-500 inline-block"></span>
              Get in Touch
            </h3>
            <div className="flex items-start space-x-3 group">
              <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="leading-relaxed">{CONFIG.ADDRESS}</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <Phone className="h-5 w-5 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href={`tel:${CONFIG.CALL_NUMBER}`} className="hover:text-amber-400 transition-colors">
                {CONFIG.CALL_NUMBER}
              </a>
            </div>
            <div className="flex items-center space-x-3 group">
              <Mail className="h-5 w-5 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href={`mailto:${CONFIG.EMAIL}`} className="hover:text-amber-400 transition-colors">
                {CONFIG.EMAIL}
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-4">
              <a
                href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-amber-500/20 hover:border-amber-500 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-[#0A0A0A] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href={`https://instagram.com/${CONFIG.INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-amber-500/20 hover:border-amber-500 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-[#0A0A0A] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-500/15 pt-8 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {CONFIG.BUSINESS_NAME} Luxury Gifting. All Rights Reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-amber-500 fill-amber-500 animate-pulse" /> for luxury gifting
          </p>
        </div>
      </div>
    </footer>
  );
}
