'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { HAMPER_PACKAGES } from '@/data/products';
import { Check, ShoppingBag, AlertTriangle, User, MessageSquare, List } from 'lucide-react';

interface HamperBuilderProps {
  category: 'women' | 'men' | 'kids';
  title: string;
  subtitle: string;
  recipientLabel: string;
  messageLabel: string;
  placeholderRecipient: string;
  placeholderMessage: string;
}

export default function HamperBuilder({
  category,
  title,
  subtitle,
  recipientLabel,
  messageLabel,
  placeholderRecipient,
  placeholderMessage
}: HamperBuilderProps) {
  const { addToCart, hamperItems } = useStore();

  // Selected Package (default to Package 1)
  const [selectedPkg, setSelectedPkg] = useState(HAMPER_PACKAGES[0]);
  
  // Selected Checklist Items
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Recipient details
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // Validation state
  const [validationError, setValidationError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const availableItems = hamperItems[category] || [];

  // Reset selected items checklist when package changes
  useEffect(() => {
    setSelectedItems([]);
    setValidationError('');
  }, [selectedPkg]);

  // Handle checking/unchecking items
  const handleItemToggle = (itemName: string) => {
    setValidationError('');

    // Deselect if already selected
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((i) => i !== itemName));
      return;
    }

    // Check max limit using direct state read (avoids stale closure)
    if (selectedItems.length >= selectedPkg.maxItems) {
      setValidationError(
        `You have reached the maximum limit of ${selectedPkg.maxItems} items for ${selectedPkg.name}.`
      );
      return;
    }

    // Add the item
    setSelectedItems([...selectedItems, itemName]);
  };

  const handleAddToCart = () => {
    // Validate bounds
    const itemCount = selectedItems.length;
    if (itemCount < selectedPkg.minItems) {
      setValidationError(`Please select at least ${selectedPkg.minItems} items for ${selectedPkg.name} (currently ${itemCount} selected).`);
      return;
    }
    if (itemCount > selectedPkg.maxItems) {
      setValidationError(`Please select no more than ${selectedPkg.maxItems} items for ${selectedPkg.name} (currently ${itemCount} selected).`);
      return;
    }
    if (!recipientName.trim()) {
      setValidationError(`Please enter the ${recipientLabel.toLowerCase()}.`);
      return;
    }

    // Compose unique cart item ID
    const compositeId = `hamper-${category}-${Date.now()}`;
    const cartItemName = `Customized ${category.charAt(0).toUpperCase() + category.slice(1)} Hamper (${selectedPkg.name})`;

    addToCart({
      id: compositeId,
      productId: `hamper-${category}-${selectedPkg.id}`,
      name: cartItemName,
      price: selectedPkg.price,
      image: `hamper_${category}`, // Key to map svg placeholder in cart
      customDetails: {
        packageName: selectedPkg.name,
        hamperItems: selectedItems,
        recipientName: recipientName,
        customMessage: customMessage,
        category: category
      },
      quantity: quantity
    });

    setSuccessMsg('Luxury Gift Hamper added to cart!');
    
    // Clear forms after add
    setTimeout(() => {
      setSelectedItems([]);
      setRecipientName('');
      setCustomMessage('');
      setQuantity(1);
      setSuccessMsg('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold mb-4 tracking-wide">
          {title}
        </h1>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      {successMsg ? (
        <div className="luxury-card p-12 rounded-xl text-center bg-neutral-900/40 border border-amber-500/30 max-w-md mx-auto">
          <div className="h-16 w-16 bg-neutral-900 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-6">
            <Check className="h-8 w-8 animate-pulse" />
          </div>
          <h3 className="text-2xl font-serif text-white font-bold mb-2">{successMsg}</h3>
          <p className="text-neutral-400 text-sm">Review your cart to checkout or build another hamper.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start">
          
          {/* LEFT: Package Selector (col-span-4) */}
          <div className="lg:col-span-4 space-y-6 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>1. Choose Hamper Package</span>
            </h2>
            <div className="space-y-4">
              {HAMPER_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPkg(pkg)}
                  className={`w-full text-left luxury-card p-6 rounded-xl border flex flex-col justify-between cursor-pointer focus:outline-none transition-all ${
                    selectedPkg.id === pkg.id
                      ? 'border-amber-500 bg-neutral-900 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'border-amber-500/10 bg-neutral-900/20 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <span className="font-serif font-bold text-white text-lg">{pkg.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-amber-500 font-serif font-bold text-lg">₹{pkg.price}</span>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        selectedPkg.id === pkg.id ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-neutral-700'
                      }`}>
                        {selectedPkg.id === pkg.id && <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 mb-3 leading-relaxed">{pkg.description}</p>
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold font-serif">
                    Allows: {pkg.minItems}-{pkg.maxItems} Products
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE: Product Checklist (col-span-5) */}
          <div className="lg:col-span-5 space-y-6 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>2. Select Products ({selectedItems.length}/{selectedPkg.maxItems})</span>
            </h2>
            
            {/* Live limit feedback banner */}
            <div className={`p-4 rounded-lg flex items-center justify-between text-xs font-semibold ${
              selectedItems.length < selectedPkg.minItems 
                ? 'bg-neutral-900 border border-amber-500/30 text-amber-400' 
                : 'bg-neutral-900 border border-amber-500 text-amber-500'
            }`}>
              <div className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span>
                  {selectedItems.length < selectedPkg.minItems 
                    ? `Select at least ${selectedPkg.minItems - selectedItems.length} more products`
                    : `Valid hamper configuration achieved!`
                  }
                </span>
              </div>
              <span>{selectedItems.length} selected</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 p-2 rounded-xl custom-scrollbar">
              {availableItems.map((item) => {
                const isChecked = selectedItems.includes(item.name);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemToggle(item.name)}
                    className={`group relative flex flex-col text-left rounded-xl border transition-all overflow-hidden cursor-pointer focus:outline-none h-full ${
                      isChecked
                        ? 'border-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] bg-neutral-900'
                        : 'border-amber-500/10 hover:border-amber-500/30 bg-neutral-950'
                    }`}
                  >
                    <div className="aspect-square bg-neutral-900 w-full relative flex-shrink-0">
                      {(item as any).image ? (
                        <img 
                          src={(item as any).image} 
                          alt={item.name} 
                          className={`w-full h-full object-cover transition-all duration-500 ${isChecked ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-500/20 bg-neutral-950">
                          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current" fill="none" strokeWidth="1.5">
                            <rect x="20" y="20" width="60" height="60" rx="4" className="stroke-amber-500/30" />
                            <circle cx="50" cy="50" r="12" className="stroke-amber-500/40" />
                            <path d="M25 75 L45 55 L55 65 L75 45" className="stroke-amber-500/20" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Checkmark Overlay */}
                      <div className={`absolute top-2 right-2 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                        isChecked ? 'border-amber-500 bg-amber-500 text-neutral-950 scale-100' : 'border-neutral-500/50 bg-black/40 scale-90'
                      }`}>
                        {isChecked && <Check className="h-4 w-4 stroke-[3]" />}
                      </div>
                    </div>
                    
                    <div className={`p-3 w-full flex-grow flex items-center justify-center text-center border-t border-amber-500/10 ${isChecked ? 'bg-amber-500/10' : ''}`}>
                      <span className={`text-[11px] sm:text-xs font-bold font-serif leading-snug line-clamp-2 ${isChecked ? 'text-amber-400' : 'text-neutral-300'}`}>
                        {item.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Custom Details & Add to Cart (col-span-3) */}
          <div className="lg:col-span-3 space-y-6 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>3. Personalize & Buy</span>
            </h2>

            <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 space-y-5">
              {/* Recipient Input */}
              <div>
                <label htmlFor="recipient" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span>{recipientLabel}</span>
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipientName}
                  onChange={(e) => { setRecipientName(e.target.value); setValidationError(''); }}
                  className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs focus:outline-none placeholder-neutral-700 focus:ring-1 focus:ring-amber-500/25"
                  placeholder={placeholderRecipient}
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{messageLabel} (Optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs focus:outline-none placeholder-neutral-700 resize-none focus:ring-1 focus:ring-amber-500/25"
                  placeholder={placeholderMessage}
                />
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-9 w-9 border border-amber-500/20 rounded-md text-white hover:border-amber-500 transition-colors flex items-center justify-center font-bold cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-white font-serif font-bold text-base w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-9 w-9 border border-amber-500/20 rounded-md text-white hover:border-amber-500 transition-colors flex items-center justify-center font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Checkout details */}
              <div className="border-t border-amber-500/10 pt-4 space-y-3">
                {validationError && (
                  <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-red-500 text-[11px] font-medium leading-normal">{validationError}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Subtotal</span>
                  <span className="text-amber-500 font-bold font-serif text-lg">₹{selectedPkg.price * quantity}</span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={selectedItems.length < selectedPkg.minItems || selectedItems.length > selectedPkg.maxItems}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer ${
                    selectedItems.length < selectedPkg.minItems || selectedItems.length > selectedPkg.maxItems
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  <span>Build & Add Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
