'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useStore } from '@/context/StoreContext';
import { TESTIMONIALS, FAQS } from '@/data/products';
import { 
  Award, Zap, Shield, Heart, ArrowRight, Gift, ChevronLeft, ChevronRight, 
  MapPin, Check, Star, Send, Info, RefreshCw, MessageSquare
} from 'lucide-react';
import { CONFIG } from '@/config';

export default function HomePage() {
  const { products, searchQuery, wishlist, toggleWishlist, isWishlisted } = useStore();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    {
      id: 'frames',
      name: 'Acrylic Photo Frames',
      desc: 'Shatterproof crystal-clear acrylic frames personalized with your photo, names, and messages in elegant gold font.',
      href: '/frames',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500 fill-none stroke-current" strokeWidth="2">
          <rect x="15" y="15" width="70" height="70" rx="4" className="stroke-amber-500" />
          <rect x="25" y="25" width="50" height="50" rx="2" className="stroke-neutral-800" />
          <circle cx="50" cy="45" r="10" className="stroke-amber-600" />
          <path d="M28 72 L45 55 L58 65 L72 48" className="stroke-amber-500" />
          <path d="M15 15 L30 30 M85 15 L70 30 M15 85 L30 70 M85 85 L70 70" className="stroke-amber-500/40" />
        </svg>
      )
    },
    {
      id: 'women',
      name: 'Women Hampers',
      desc: 'Elegant, pampering assortments featuring scented candles, chocolates, skincare, perfumes, and custom greeting cards.',
      href: '/women',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500 fill-none stroke-current" strokeWidth="2">
          <path d="M20 40 L80 40 L80 80 A5 5 0 0 1 75 85 L25 85 A5 5 0 0 1 20 80 Z" className="stroke-amber-500" />
          <path d="M15 40 L85 40 L85 30 L15 30 Z" className="stroke-amber-600 fill-neutral-900" />
          <path d="M50 15 C50 15 45 25 35 25 C25 25 30 15 50 15 Z" className="stroke-amber-500" />
          <path d="M50 15 C50 15 55 25 65 25 C75 25 70 15 50 15 Z" className="stroke-amber-500" />
          <path d="M50 30 L50 85" className="stroke-amber-500" />
          <path d="M20 55 H80" className="stroke-amber-500/20" />
          <circle cx="35" cy="55" r="5" className="stroke-amber-500" />
          <path d="M60 55 C60 50 65 48 70 52 C70 55 60 55 60 55" className="stroke-amber-500" />
        </svg>
      )
    },
    {
      id: 'men',
      name: 'Men Hampers',
      desc: 'Premium masculine hampers combining genuine leather wallets, grooming products, insulated flasks, and steel accessories.',
      href: '/men',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500 fill-none stroke-current" strokeWidth="2">
          <path d="M20 45 L80 45 L80 85 A3 3 0 0 1 77 88 L23 88 A3 3 0 0 1 20 85 Z" className="stroke-amber-500" />
          <path d="M15 45 L85 45 L85 35 L15 35 Z" className="stroke-amber-600 fill-neutral-900" />
          <path d="M50 35 L40 20 L50 10 L60 20 Z" className="stroke-amber-500" />
          <path d="M50 45 L50 88" className="stroke-amber-500" />
          <rect x="30" y="55" width="12" height="20" rx="1" className="stroke-amber-600" />
          <circle cx="65" cy="65" r="7" className="stroke-amber-600" />
        </svg>
      )
    },
    {
      id: 'kids',
      name: 'Kids Hampers',
      desc: 'Joyful boxes filled with plush teddy bears, coloring activity books, puzzle games, chocolates, and colorful customized mugs.',
      href: '/kids',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500 fill-none stroke-current" strokeWidth="2">
          <circle cx="35" cy="35" r="10" className="stroke-amber-500" />
          <circle cx="65" cy="35" r="10" className="stroke-amber-500" />
          <circle cx="22" cy="22" r="5" className="stroke-amber-600" />
          <circle cx="78" cy="22" r="5" className="stroke-amber-600" />
          <path d="M50 50 C50 65 30 65 30 75 C30 85 70 85 70 75 C70 65 50 65 50 50 Z" className="stroke-amber-500" />
          <circle cx="43" cy="33" r="1.5" className="fill-amber-500" />
          <circle cx="57" cy="33" r="1.5" className="fill-amber-500" />
          <path d="M47 42 Q50 45 53 42" className="stroke-amber-500" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-20">
        
        {/* Search Results view overlay if user has typed a query */}
        {searchQuery.length > 0 ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-serif text-amber-500 font-bold mb-8">Search Results for "{searchQuery}"</h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 border border-neutral-900 bg-neutral-950 rounded-xl">
                <p className="text-neutral-500 text-lg">No products found matching your search. Please try another query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((prod) => (
                  <div key={prod.id} className="luxury-card rounded-xl overflow-hidden flex flex-col h-full bg-neutral-900/50">
                    <div className="h-56 bg-neutral-950 flex items-center justify-center border-b border-amber-500/10 p-6">
                      {prod.category === 'frames' ? (
                        <svg viewBox="0 0 100 100" className="w-20 h-20 text-amber-500/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="20" y="15" width="60" height="70" rx="3" />
                          <circle cx="50" cy="45" r="8" />
                          <path d="M30 75 L48 58 L58 66 L70 50" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 100 100" className="w-20 h-20 text-amber-500/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="15" y="35" width="70" height="50" rx="4" />
                          <path d="M10 35 H90" />
                          <path d="M50 15 L40 25 H60 Z" />
                        </svg>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold font-serif text-white hover:text-amber-400 transition-colors">
                            {prod.name}
                          </h3>
                          <button 
                            onClick={() => toggleWishlist(prod.id)}
                            className="p-1 hover:text-amber-500 transition-colors focus:outline-none"
                          >
                            <Heart className={`h-5 w-5 ${isWishlisted(prod.id) ? 'text-amber-500 fill-amber-500' : 'text-neutral-500'}`} />
                          </button>
                        </div>
                        <p className="text-neutral-400 text-sm mb-4 line-clamp-3">{prod.description}</p>
                      </div>
                      <div>
                        <div className="text-amber-500 text-lg font-semibold font-serif mb-4">₹{prod.price}</div>
                        <Link 
                          href={prod.category === 'frames' ? '/frames' : `/${prod.category}`}
                          className="w-full text-center block py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold transition-all duration-300 shadow-lg text-sm"
                        >
                          Customize & Shop
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
              
              {/* Background: Radial Gold Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-500/5 blur-[120px]"></div>
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/3 blur-[80px]"></div>
              </div>

              {/* Background: Luxury Grid Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" className="stroke-amber-500/30" strokeWidth="0.5">
                  <defs>
                    <pattern id="luxgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#luxgrid)" />
                  <circle cx="50%" cy="50%" r="250" className="stroke-amber-500/10 fill-none" />
                  <circle cx="50%" cy="50%" r="450" className="stroke-amber-500/5 fill-none" />
                </svg>
              </div>

              {/* Floating Gold Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-amber-500/20 animate-float"
                    style={{
                      width: `${4 + (i % 5) * 3}px`,
                      height: `${4 + (i % 5) * 3}px`,
                      left: `${8 + i * 7.5}%`,
                      top: `${15 + (i * 23) % 70}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${5 + i * 0.7}s`,
                    }}
                  />
                ))}
              </div>

              {/* Hero Content */}
              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
                
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center space-x-2 border border-amber-500/30 px-5 py-2 rounded-full bg-amber-500/5 mb-8 backdrop-blur-sm">
                  <Gift className="h-4 w-4 text-amber-500" />
                  <span className="text-amber-400 font-medium tracking-widest text-xs uppercase">Luxury Gifting Redefined</span>
                </div>
                
                {/* Main Heading */}
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 font-serif leading-[1.1]">
                  Gifts That Tell
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 gold-text-glow mt-2">
                    Your Story
                  </span>
                </h1>
                
                {/* Sub-heading */}
                <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                  Premium Acrylic Frames & Handcrafted Gift Hampers — curated for birthdays, weddings, anniversaries, and every precious milestone in life.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
                  <Link 
                    href="/frames" 
                    className="w-full sm:w-auto px-10 py-4 gold-gradient-bg text-[#0A0A0A] font-bold tracking-wide text-sm flex items-center justify-center gap-2 shadow-[0_4px_30px_rgba(212,175,55,0.3)]"
                  >
                    <span>Shop Custom Frames</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    href="#featured-categories" 
                    className="w-full sm:w-auto px-10 py-4 gold-outline-btn text-sm flex items-center justify-center gap-2"
                  >
                    <span>Explore Hampers</span>
                  </Link>
                </div>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-500 tracking-wide uppercase">
                  {[
                    { icon: <Shield className="h-4 w-4 text-amber-500/70" />, label: 'Secure Payments' },
                    { icon: <Zap className="h-4 w-4 text-amber-500/70" />, label: 'Fast Delivery' },
                    { icon: <Award className="h-4 w-4 text-amber-500/70" />, label: 'Premium Quality' },
                    { icon: <Heart className="h-4 w-4 text-amber-500/70" />, label: 'Crafted with Love' },
                  ].map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2">
                      {badge.icon}
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none"></div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-neutral-950 py-20 border-b border-amber-500/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4 tracking-wide">
                    Why Choose <span className="text-amber-500">EDSHA</span>
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                    We ensure every single gift leaves a lasting impression through visual beauty, meticulous craftsmanship, and reliable logistics.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Card 1 */}
                  <div className="luxury-card p-8 rounded-xl bg-neutral-900/40 text-center flex flex-col items-center">
                    <div className="h-16 w-16 bg-neutral-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-md">
                      <Award className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif mb-3">Premium Quality</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Shatterproof high-grade acrylic sheets and luxury velvet box packaging materials.
                    </p>
                  </div>
                  {/* Card 2 */}
                  <div className="luxury-card p-8 rounded-xl bg-neutral-900/40 text-center flex flex-col items-center">
                    <div className="h-16 w-16 bg-neutral-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-md">
                      <Gift className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif mb-3">Personalized Gifts</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Tailor your text engraving, choose products, upload photos, and draft customized notes.
                    </p>
                  </div>
                  {/* Card 3 */}
                  <div className="luxury-card p-8 rounded-xl bg-neutral-900/40 text-center flex flex-col items-center">
                    <div className="h-16 w-16 bg-neutral-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-md">
                      <Zap className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif mb-3">Fast Delivery</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Quick turnarounds on custom orders, packed securely and dispatched via premium courier partners.
                    </p>
                  </div>
                  {/* Card 4 */}
                  <div className="luxury-card p-8 rounded-xl bg-neutral-900/40 text-center flex flex-col items-center">
                    <div className="h-16 w-16 bg-neutral-900 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-md">
                      <Shield className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif mb-3">Affordable Pricing</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Premium luxury gifting packages starting at just ₹699, inclusive of customization services.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Categories */}
            <section id="featured-categories" className="bg-neutral-950 py-20 border-b border-amber-500/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4 tracking-wide">
                    Featured <span className="text-amber-500">Categories</span>
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                    Select your gifting collection below to begin customizing your perfect luxury present.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {categories.map((cat) => (
                    <div key={cat.id} className="luxury-card p-8 rounded-xl bg-neutral-900/30 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:border-amber-500/40">
                      <div className="flex-shrink-0 bg-neutral-950 p-4 border border-amber-500/15 rounded-xl shadow-inner">
                        {cat.svg}
                      </div>
                      <div className="flex-grow flex flex-col justify-between h-full text-center sm:text-left">
                        <div className="mb-4">
                          <h3 className="text-2xl font-serif text-amber-500 font-bold mb-2 tracking-wide">{cat.name}</h3>
                          <p className="text-neutral-400 text-sm leading-relaxed">{cat.desc}</p>
                        </div>
                        <Link 
                          href={cat.href}
                          className="inline-flex items-center justify-center sm:justify-start gap-2 text-amber-400 hover:text-amber-300 font-semibold group transition-all text-sm"
                        >
                          <span>Explore Gifting Options</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300 text-amber-400" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Wishlist Section (if not empty) */}
            {wishlist.length > 0 && (
              <section id="wishlist-section" className="bg-neutral-950 py-20 border-b border-amber-500/10 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-serif text-amber-500 font-bold mb-8">Your Wishlist ({wishlist.length})</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.filter(p => wishlist.includes(p.id)).map((prod) => (
                      <div key={prod.id} className="luxury-card rounded-xl overflow-hidden flex flex-col h-full bg-neutral-900/50">
                        <div className="h-56 bg-neutral-950 flex items-center justify-center border-b border-amber-500/10 p-6">
                          <svg viewBox="0 0 100 100" className="w-20 h-20 text-amber-500/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="20" y="15" width="60" height="70" rx="3" />
                            <circle cx="50" cy="45" r="8" />
                            <path d="M30 75 L48 58 L58 66 L70 50" />
                          </svg>
                        </div>
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold font-serif text-white">{prod.name}</h3>
                              <button 
                                onClick={() => toggleWishlist(prod.id)}
                                className="p-1 text-amber-500 hover:text-amber-400 transition-colors focus:outline-none"
                              >
                                <Heart className="h-5 w-5 fill-amber-500" />
                              </button>
                            </div>
                            <p className="text-neutral-400 text-sm mb-4 line-clamp-3">{prod.description}</p>
                          </div>
                          <div>
                            <div className="text-amber-500 text-lg font-semibold font-serif mb-4">₹{prod.price}</div>
                            <Link 
                              href="/frames"
                              className="w-full text-center block py-2 px-4 rounded bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold transition-all duration-300 shadow-lg text-sm"
                            >
                              Configure & Shop
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Customer Testimonials Carousel */}
            <section className="bg-neutral-950 py-20 border-b border-amber-500/10 overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-12 tracking-wide">
                  What Our <span className="text-amber-500">Customers Say</span>
                </h2>

                <div className="relative min-h-[220px] sm:min-h-[180px] flex items-center justify-center">
                  {TESTIMONIALS.map((t, idx) => (
                    <div 
                      key={t.id}
                      className={`absolute inset-0 px-6 sm:px-12 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                        idx === activeTestimonial ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 pointer-events-none translate-x-12 scale-95'
                      }`}
                    >
                      <div className="flex items-center space-x-1 mb-4 text-amber-400">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-lg sm:text-xl text-neutral-300 italic mb-6 leading-relaxed font-serif">
                        "{t.text}"
                      </p>
                      <div>
                        <span className="font-bold text-white block tracking-wider uppercase font-serif text-sm">{t.name}</span>
                        <span className="text-amber-500 text-xs tracking-wide">{t.location}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Left/Right controls */}
                <div className="flex justify-center items-center space-x-6 mt-12">
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="p-2 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors focus:outline-none"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex space-x-2">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          idx === activeTestimonial ? 'bg-amber-500' : 'bg-neutral-800'
                        }`}
                        aria-label={`Go to Testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                    className="p-2 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors focus:outline-none"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* Delivery and Return Policy Links */}
            <section className="bg-neutral-950 py-16 border-b border-amber-500/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => setShowDeliveryModal(true)}
                    className="luxury-card px-8 py-5 rounded-xl bg-neutral-900/40 hover:border-amber-500 flex items-center gap-4 text-left justify-between text-white focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-500/10 p-3 rounded-lg text-amber-500">
                        <Info className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold font-serif text-lg leading-tight">Delivery Information</h4>
                        <p className="text-xs text-neutral-400">Trackings, express delivery & coverage</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-amber-500" />
                  </button>

                  <button 
                    onClick={() => setShowReturnModal(true)}
                    className="luxury-card px-8 py-5 rounded-xl bg-neutral-900/40 hover:border-amber-500 flex items-center gap-4 text-left justify-between text-white focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-500/10 p-3 rounded-lg text-amber-500">
                        <RefreshCw className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold font-serif text-lg leading-tight">Return Policy</h4>
                        <p className="text-xs text-neutral-400">Replacements, damaged product claims</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-amber-500" />
                  </button>
                </div>
              </div>
            </section>

            {/* FAQS Accordion */}
            <section id="faq-section" className="bg-neutral-950 py-20 border-b border-amber-500/10 scroll-mt-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4 tracking-wide">
                    Frequently Asked <span className="text-amber-500">Questions</span>
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                    Got questions? We have answers. Learn more about customizations, ordering, and delivery.
                  </p>
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="luxury-card rounded-xl overflow-hidden bg-neutral-900/20 border border-amber-500/10">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-serif font-bold text-white tracking-wide text-base sm:text-lg">
                          {faq.question}
                        </span>
                        <span className="text-amber-500 flex-shrink-0 ml-4 font-bold text-xl">
                          {activeFaq === idx ? '−' : '+'}
                        </span>
                      </button>
                      
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          activeFaq === idx ? 'max-h-48 border-t border-amber-500/5' : 'max-h-0'
                        }`}
                      >
                        <div className="p-6 text-sm sm:text-base text-neutral-400 leading-relaxed bg-neutral-950/40">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Instagram Feed Grid */}
            <section className="bg-neutral-950 py-20 border-b border-amber-500/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 mb-2 text-neutral-500">
                    <svg className="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="text-sm tracking-widest font-semibold uppercase text-amber-400">@edsha.gifting</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4 tracking-wide">
                    Follow Our Journey
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                    Sneak peeks of customized acrylic frames, behind the scenes of hamper packaging, and custom designs.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="group relative luxury-card aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-amber-500/10 flex items-center justify-center p-4">
                      {/* Luxury Graphic Post Overlay */}
                      <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500/40 stroke-current" fill="none" strokeWidth="1">
                        <circle cx="50" cy="50" r="40" className="stroke-amber-500/15" />
                        <rect x="25" y="25" width="50" height="50" rx="3" className="stroke-amber-500/20" />
                        <path d="M30 45 L50 20 L70 45 L60 65 L40 65 Z" className="stroke-amber-500/30" />
                      </svg>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                        <svg className="h-8 w-8 text-amber-500 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span className="text-white font-bold text-xs tracking-wider uppercase">View Post</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="bg-neutral-950 py-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4 tracking-wide">
                    Contact <span className="text-amber-500">EDSHA</span>
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                    Have questions about corporate orders, wholesale rates, or bulk customizations? Drop us a message.
                  </p>
                </div>

                <div className="luxury-card p-8 sm:p-12 rounded-xl bg-neutral-900/20">
                  {contactSuccess ? (
                    <div className="text-center py-8">
                      <div className="h-14 w-14 rounded-full border border-amber-500 flex items-center justify-center text-amber-500 mx-auto mb-6">
                        <Send className="h-6 w-6 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-serif text-white font-bold mb-3">Message Sent Successfully!</h3>
                      <p className="text-neutral-400 text-sm">Thank you for writing to EDSHA. We will get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Name</label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg py-3 px-4 text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg py-3 px-4 text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Your Message</label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg py-3 px-4 text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
                          placeholder="Tell us what you are looking for..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold tracking-wider uppercase shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Delivery Info Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
          <div className="luxury-card rounded-xl max-w-lg w-full bg-neutral-950 p-8 border border-amber-500/40 relative">
            <button 
              onClick={() => setShowDeliveryModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-amber-500 text-2xl focus:outline-none font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-serif text-amber-500 font-bold mb-6 flex items-center gap-2 border-b border-amber-500/10 pb-3">
              <Info className="h-6 w-6" />
              <span>Delivery Information</span>
            </h3>
            <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Free Standard Delivery</strong>: Available across major cities on orders above ₹1,999. Usually takes 3-5 business days.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Express Delivery</strong>: Dispatched via air transport. Delivered within 24-48 hours inside metros (extra charge applicable).</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Secure Wooden Box Packing</strong>: Acrylic frames are double bubble-wrapped and packaged in robust cardboard layers to prevent transit damages.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Real-time Tracking</strong>: You will receive direct updates on your registered WhatsApp number as soon as the package is dispatched.</span>
              </p>
            </div>
            <button 
              onClick={() => setShowDeliveryModal(false)}
              className="w-full mt-8 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-lg transition-colors text-sm"
            >
              Close Info
            </button>
          </div>
        </div>
      )}

      {/* Return Policy Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
          <div className="luxury-card rounded-xl max-w-lg w-full bg-neutral-950 p-8 border border-amber-500/40 relative">
            <button 
              onClick={() => setShowReturnModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-amber-500 text-2xl focus:outline-none font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-serif text-amber-500 font-bold mb-6 flex items-center gap-2 border-b border-amber-500/10 pb-3">
              <RefreshCw className="h-6 w-6" />
              <span>Return & Damage Claims</span>
            </h3>
            <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Customized Items Policy</strong>: Personalized products (custom acrylic frames, filled hampers) are not eligible for direct returns unless received in damaged condition.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Damaged Product Claim</strong>: If a product is damaged during transit, please record a continuous **unpacking video** showing the damage. Share the video within 24 hours on WhatsApp.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Free Replacement</strong>: Once the damage claim is validated from the unpacking video, we will dispatch a brand new replacement immediately at zero extra cost.</span>
              </p>
            </div>
            <button 
              onClick={() => setShowReturnModal(false)}
              className="w-full mt-8 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-lg transition-colors text-sm"
            >
              Close Info
            </button>
          </div>
        </div>
      )}

      <Footer />
      <FloatingActions />
    </>
  );
}
