'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Menu, X, Search, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { CONFIG } from '@/config';

export default function Navbar() {
  const { cart, wishlist, searchQuery, setSearchQuery } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Acrylic Frames', href: '/frames' },
    { name: 'Women Hampers', href: '/women' },
    { name: 'Men Hampers', href: '/men' },
    { name: 'Kids Hampers', href: '/kids' },
    { name: 'Contact Us', href: '/#contact' },
    { name: 'Admin', href: '/admin' }
  ];

  // Determine admin visibility for navigation links
  const { isAdmin } = useAuth();
  const displayLinks = navLinks.filter(link => !(link.name === 'Admin' && !isAdmin));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Redirect to home if search is initiated from another page, so users can see filter results
    if (pathname !== '/' && e.target.value.length > 0) {
      router.push('/');
    }
  };

  const isActive = (path: string) => {
  if (path.startsWith('/#')) {
    // Hash link: treat as active when on the home page
    return pathname === '/';
  }
  return pathname === path;
};

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-amber-500/20 py-1' : 'bg-transparent py-2 md:py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/images/edsha_logo.jpeg" alt="EDSHA Logo" className="h-10 w-10 object-cover rounded-md border border-amber-500/30 group-hover:scale-105 transition-transform duration-300" />
              <span className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-700 md:from-amber-300 md:via-yellow-500 md:to-amber-600 gold-text-glow font-serif">
                {CONFIG.BUSINESS_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">

          {displayLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm tracking-wide font-medium transition-colors duration-300 group px-1 py-2 ${
                isActive(link.href)
                  ? 'text-amber-500'
                  : 'text-neutral-300 hover:text-amber-400'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 transform origin-left transition-transform duration-300 ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Bar Toggle */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-neutral-300 hover:text-amber-400 transition-colors focus:outline-none"
                aria-label="Toggle Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="absolute right-10 w-48 sm:w-64 bg-neutral-900 border border-amber-500/40 text-neutral-100 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:border-amber-500 transition-all shadow-md placeholder-neutral-500"
                />
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              href="/#wishlist-section"
              className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors"
              aria-label="Wishlist"
              onClick={() => {
                if (pathname !== '/') router.push('/#wishlist-section');
              }}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-[10px] rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-yellow-600 text-neutral-950 font-bold text-[10px] rounded-full h-4 w-4 flex items-center justify-center shadow-lg border border-neutral-950">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-amber-400 md:hidden transition-colors focus:outline-none bg-neutral-900/30 rounded-full"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-amber-500/20 py-4 px-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-4">
            {displayLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium tracking-wide py-2 ${
                  isActive(link.href)
                    ? 'text-amber-500 pl-2 border-l-2 border-amber-500'
                    : 'text-neutral-300 pl-2'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
