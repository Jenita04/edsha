'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/products';
import { Check, Heart, ShoppingBag, Eye, MessageCircle } from 'lucide-react';

export default function FramesPage() {
  const { products, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Customization Form State
  const [customName, setCustomName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const frames = products.filter((p) => p.category === 'frames');

  const openCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setCustomName('');
    setCustomMessage('');
    setQuantity(1);
    setValidationError('');
    setSuccessMsg('');
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    if (!customName.trim()) {
      setValidationError('Please enter a custom name.');
      return;
    }

    // Generate unique composite key so different frame customizations are saved separately
    const compositeId = `${selectedProduct.id}-${Date.now()}`;

    addToCart({
      id: compositeId,
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      customDetails: {
        customName: customName,
        customMessage: customMessage,
        category: 'frames'
      },
      quantity: quantity
    });

    setSuccessMsg('Custom Acrylic Frame added to cart!');
    setTimeout(() => {
      setSelectedProduct(null);
      setSuccessMsg('');
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold mb-4 tracking-wide">
              Acrylic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 gold-text-glow">Photo Frames</span>
            </h1>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Crystal-clear, shatterproof acrylic glass frames that highlight your photos with premium gold accents. Customize with names, custom titles, and memories.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {frames.map((product) => (
              <div 
                key={product.id} 
                className="luxury-card rounded-xl overflow-hidden flex flex-col h-full bg-neutral-900/40 border border-amber-500/15"
              >
                {/* Product Image with Wooden Frame Effect */}
                <div className="h-72 bg-neutral-900 flex items-center justify-center p-6 relative overflow-hidden border-b border-amber-500/10 group">
                  <div className="w-full h-full relative z-10" style={{
                    border: '16px solid #4a3018',
                    borderLeftColor: '#5c4028',
                    borderTopColor: '#6a4b32',
                    borderRightColor: '#3a2008',
                    borderBottomColor: '#2d1804',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.6), inset 0 0 15px rgba(0,0,0,0.9)',
                    backgroundColor: '#fff'
                  }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent pointer-events-none z-20" />

                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 bg-neutral-900 border border-amber-500/20 hover:border-amber-500 rounded-full text-neutral-400 hover:text-amber-500 transition-colors shadow-md"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isWishlisted(product.id) ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>


                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-white tracking-wide mb-2">{product.name}</h3>
                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed line-clamp-3">{product.description}</p>
                  </div>
                  <div>
                    <div className="text-amber-500 text-lg font-semibold font-serif mb-4">₹{product.price}</div>
                    <button
                      onClick={() => openCustomizer(product)}
                      className="w-full py-2.5 rounded bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold transition-all duration-300 shadow-md text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Customize Frame</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Drawer / Modal Overlay */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
            <div className="luxury-card rounded-xl max-w-2xl w-full bg-neutral-950 p-6 sm:p-8 border border-amber-500/40 relative max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-amber-500 text-3xl focus:outline-none font-bold"
              >
                ×
              </button>

              <h2 className="text-2xl font-serif text-amber-500 font-bold mb-6 pb-2 border-b border-amber-500/10">
                Personalize {selectedProduct.name}
              </h2>

              {successMsg ? (
                <div className="text-center py-12">
                  <div className="h-14 w-14 rounded-full border border-amber-500 flex items-center justify-center text-amber-500 mx-auto mb-6">
                    <Check className="h-6 w-6 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-serif text-white font-bold mb-2">{successMsg}</h3>
                  <p className="text-neutral-400 text-sm">Directing you back to customizer...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: WhatsApp Photo Instruction */}
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Step 1: Your Photo
                    </label>
                    <div className="border-2 border-amber-500/30 rounded-xl bg-neutral-900/30 p-6 flex flex-col items-center justify-center text-center h-64">
                      <div className="h-14 w-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                        <MessageCircle className="h-7 w-7 text-amber-500" />
                      </div>
                      <p className="text-white text-sm font-semibold mb-2">Send Photo via WhatsApp</p>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        After placing your order, send your photo directly to our WhatsApp. We will use it to personalise your frame.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Custom text inputs */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label htmlFor="custom-name" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                          Step 2: Enter Custom Title / Names
                        </label>
                        <input
                          type="text"
                          id="custom-name"
                          value={customName}
                          onChange={(e) => { setCustomName(e.target.value); setValidationError(''); }}
                          className="w-full bg-neutral-900 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-sm focus:outline-none placeholder-neutral-600 focus:ring-1 focus:ring-amber-500/20"
                          placeholder="e.g. Aishwarya & Vikram / Love Story"
                        />
                      </div>

                      {/* Message input */}
                      <div>
                        <label htmlFor="custom-msg" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                          Step 3: Enter Custom Message (Optional)
                        </label>
                        <textarea
                          id="custom-msg"
                          rows={3}
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          className="w-full bg-neutral-900 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-sm focus:outline-none placeholder-neutral-600 resize-none focus:ring-1 focus:ring-amber-500/20"
                          placeholder="e.g. Together Forever since 15.02.2023..."
                        />
                      </div>

                      {/* Quantity Selector */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                          Step 4: Quantity
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="h-10 w-10 border border-amber-500/20 rounded-md text-white hover:border-amber-500 transition-colors flex items-center justify-center text-lg font-bold"
                          >
                            −
                          </button>
                          <span className="text-white font-serif font-bold text-lg w-6 text-center">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="h-10 w-10 border border-amber-500/20 rounded-md text-white hover:border-amber-500 transition-colors flex items-center justify-center text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions inside drawer */}
                    <div className="pt-6 mt-6 border-t border-amber-500/10">
                      {validationError && (
                        <p className="text-red-500 text-xs font-medium mb-3">{validationError}</p>
                      )}
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-neutral-400 text-sm">Estimated Price</span>
                        <span className="text-amber-500 font-bold font-serif text-xl">₹{selectedProduct.price * quantity}</span>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                      >
                        <ShoppingBag className="h-4.5 w-4.5" />
                        <span>Add To Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
