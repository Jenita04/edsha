'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useStore } from '@/context/StoreContext';
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, Package, Image as ImageIcon } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/10 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-wide">
                Your Shopping <span className="text-amber-500">Cart</span>
              </h1>
              <p className="text-neutral-400 text-sm mt-1">Review your customized gifts and proceed to checkout.</p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-neutral-500 hover:text-amber-500 text-xs uppercase tracking-wider font-semibold focus:outline-none transition-colors border border-neutral-800 rounded-md px-3 py-1.5 bg-neutral-900/40"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="luxury-card p-16 rounded-xl text-center max-w-2xl mx-auto bg-neutral-900/10 py-24 flex flex-col items-center border border-amber-500/10">
              <div className="h-16 w-16 bg-neutral-950 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-inner">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mb-3">Your Cart is Empty</h2>
              <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-8">
                Explore our luxury acrylic frames and custom hamper builders to find the perfect gift.
              </p>
              <Link
                href="/"
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold rounded-lg shadow-md uppercase tracking-wider text-xs transition-all flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Gifting</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Cart Items List (col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="luxury-card p-5 sm:p-6 rounded-xl bg-neutral-900/20 border border-amber-500/15 flex flex-col sm:flex-row gap-6 relative"
                  >
                    {/* Item Thumbnail / Custom Preview */}
                    <div className="h-28 w-28 bg-neutral-950 rounded-lg flex-shrink-0 border border-amber-500/10 flex items-center justify-center p-2 overflow-hidden self-center sm:self-start">
                      {item.customDetails?.photoUrl ? (
                        <img
                          src={item.customDetails.photoUrl}
                          alt="Custom Upload"
                          className="w-full h-full object-cover rounded"
                        />
                      ) : item.customDetails?.category ? (
                        /* Hamper vector illustration placeholder */
                        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-500/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 40 L80 40 L80 80 A5 5 0 0 1 75 85 L25 85 A5 5 0 0 1 20 80 Z" />
                          <path d="M15 40 L85 40 L85 32 L15 32 Z" />
                          <circle cx="50" cy="23" r="5" />
                        </svg>
                      ) : (
                        <Package className="h-12 w-12 text-amber-500/50" />
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-bold text-white text-lg tracking-wide">{item.name}</h3>
                          <span className="text-amber-500 text-sm font-semibold">₹{item.price} each</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove Item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Render customized specifics */}
                      {item.customDetails && (
                        <div className="bg-neutral-950/60 p-3 rounded-lg border border-amber-500/5 space-y-2 text-xs">
                          {/* Recipient Details */}
                          {item.customDetails.recipientName && (
                            <div>
                              <span className="text-amber-400 font-semibold block uppercase tracking-wider">
                                {item.customDetails.category === 'kids' ? "Child's Name" : 'Recipient'}
                              </span>
                              <span className="text-neutral-300 font-medium">{item.customDetails.recipientName}</span>
                            </div>
                          )}

                          {/* Gilded/Personalized message */}
                          {item.customDetails.customMessage && (
                            <div>
                              <span className="text-amber-400 font-semibold block uppercase tracking-wider">Gilded Message</span>
                              <p className="text-neutral-300 italic font-medium">"{item.customDetails.customMessage}"</p>
                            </div>
                          )}

                          {/* Photo name link */}
                          {item.customDetails.photoName && (
                            <div className="flex items-center gap-1.5 text-neutral-300">
                              <ImageIcon className="h-3.5 w-3.5 text-amber-500" />
                              <span>Custom image: <strong>{item.customDetails.photoName}</strong></span>
                            </div>
                          )}

                          {/* Hamper checklist selected items */}
                          {item.customDetails.hamperItems && item.customDetails.hamperItems.length > 0 && (
                            <div>
                              <span className="text-amber-400 font-semibold block uppercase tracking-wider mb-1">Items Included:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {item.customDetails.hamperItems.map((item, idx) => (
                                  <span 
                                    key={idx} 
                                    className="bg-neutral-900 border border-amber-500/10 text-neutral-400 rounded-full px-2.5 py-0.5 text-[10px]"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bottom controllers */}
                      <div className="flex justify-between items-center pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 border border-amber-500/20 rounded-md text-white hover:border-amber-500 transition-colors flex items-center justify-center font-bold"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-white font-serif font-bold text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 border border-amber-500/20 rounded-md text-white hover:border-amber-500 transition-colors flex items-center justify-center font-bold"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Calculated Subtotal */}
                        <div className="text-right">
                          <span className="text-neutral-500 text-xs block uppercase">Subtotal</span>
                          <span className="text-amber-500 font-bold font-serif text-base">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary Card (col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <span>Order Summary</span>
                </h2>
                <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 space-y-4">
                  
                  {/* Detailed breakdown */}
                  <div className="space-y-3 text-sm border-b border-amber-500/10 pb-4">
                    <div className="flex justify-between text-neutral-400">
                      <span>Bag Subtotal</span>
                      <span className="text-white font-serif">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Gifting Package Delivery</span>
                      <span className="text-white font-serif">
                        {deliveryCharge === 0 ? <span className="text-amber-500">FREE</span> : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    {deliveryCharge > 0 && (
                      <p className="text-[11px] text-amber-400/80 leading-normal italic">
                        * Add ₹{2000 - subtotal} more of gifts to unlock free delivery!
                      </p>
                    )}
                  </div>

                  {/* Grand total */}
                  <div className="flex justify-between items-center text-base font-bold pb-2">
                    <span className="text-white uppercase tracking-wider text-sm">Grand Total</span>
                    <span className="text-amber-500 font-serif text-2xl font-black">₹{total}</span>
                  </div>

                  {/* CTA Checkout button */}
                  <div className="pt-2">
                    <Link
                      href="/checkout"
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Continue Shopping button */}
                  <div className="text-center pt-2">
                    <Link
                      href="/"
                      className="text-neutral-400 hover:text-amber-500 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 focus:outline-none"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
