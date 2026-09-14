'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { useStore } from '@/context/StoreContext';
import { CONFIG } from '@/config';
import { Check, ShoppingBag, Send, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
    paymentMethod: 'COD'
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderSummary, setPlacedOrderSummary] = useState<any>(null);

  // Compute pricing
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  // Protect page: redirect to home if cart is empty on mount (and not in success screen)
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      // Allow user to see success page if already ordered
    }
  }, [cart, isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!form.name.trim() || !form.phone.trim() || !form.whatsapp.trim() || !form.email.trim() || !form.address.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) {
      setErrorMsg('Please fill in all the required delivery and contact details.');
      return;
    }

    if (cart.length === 0) {
      setErrorMsg('Your cart is empty. Please add gifts before checking out.');
      return;
    }

    // Save order in localStorage so the Admin panel can retrieve it!
    const orderId = `EDSHA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: {
        name: form.name,
        phone: form.phone,
        whatsapp: form.whatsapp,
        email: form.email,
        address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`
      },
      items: cart.map(i => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        customDetails: i.customDetails
      })),
      subtotal,
      deliveryCharge,
      total,
      paymentMethod: form.paymentMethod,
      notes: form.notes,
      status: 'Pending Verification'
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('edsha_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('edsha_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Failed to log order to local admin panel database', e);
    }

    // Generate Formatted WhatsApp Message
    let itemsText = '';
    let hasFrameItem = false;
    cart.forEach((item, index) => {
      itemsText += `${index + 1}. *${item.name}* x ${item.quantity} (₹${item.price})\n`;
      if (item.customDetails) {
        if (item.customDetails.recipientName) {
          itemsText += `   - Recipient: ${item.customDetails.recipientName}\n`;
        }
        if (item.customDetails.customName) {
          itemsText += `   - Custom Name: ${item.customDetails.customName}\n`;
        }
        if (item.customDetails.customMessage) {
          itemsText += `   - Custom Message: "${item.customDetails.customMessage}"\n`;
        }
        if (item.customDetails.category === 'frames') {
          hasFrameItem = true;
        }
        if (item.customDetails.hamperItems && item.customDetails.hamperItems.length > 0) {
          itemsText += `   - Box Items: ${item.customDetails.hamperItems.join(', ')}\n`;
        }
      }
      itemsText += '\n';
    });

    const whatsappMessage = `*🎁 NEW ORDER RECEIVED - EDSHA Gifting*
----------------------------------------
*Order ID:* ${orderId}

*Customer Details:*
• Name: ${form.name}
• Phone: ${form.phone}
• WhatsApp: ${form.whatsapp}
• Email: ${form.email}
• Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}

*Order Summary:*
${itemsText}----------------------------------------
*Subtotal:* ₹${subtotal}
*Delivery Charge:* ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
*Total Amount:* ₹${total}

*Payment Method:* Cash on Delivery
*Order Notes:* ${form.notes || 'None'}
${hasFrameItem ? `
📸 *ACTION REQUIRED — PHOTO FRAME ORDER:*
Please reply to this message with the photo you want printed on your acrylic frame. We cannot proceed with your order without the photo.` : ''}

Please verify order details and process customization. Thank you!`;

    // Encode text for URL
    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedText}`;

    // Track order details for local success screen
    setPlacedOrderSummary(newOrder);
    setIsSuccess(true);
    
    // Clear cart context
    clearCart();

    // Trigger WhatsApp redirect in background
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isSuccess && placedOrderSummary ? (
            /* ORDER SUCCESS VIEW */
            <div className="luxury-card p-8 sm:p-12 rounded-xl text-center max-w-2xl mx-auto border border-amber-500 bg-neutral-950 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
              <div className="h-16 w-16 bg-neutral-900 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-6">
                <Check className="h-8 w-8 animate-bounce" />
              </div>
              <h1 className="text-3xl font-serif text-white font-bold mb-2 tracking-wide">Order Placed Successfully!</h1>
              <p className="text-amber-500 font-mono text-sm font-semibold mb-6">ORDER ID: {placedOrderSummary.id}</p>
              
              <div className="bg-neutral-900/60 rounded-xl p-6 border border-amber-500/10 text-left space-y-4 mb-8 text-sm">
                <h3 className="font-serif font-bold text-white text-base border-b border-amber-500/10 pb-2">Order summary</h3>
                <div className="space-y-2 text-neutral-400">
                  {placedOrderSummary.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="text-white font-serif">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-neutral-800 pt-3 flex justify-between font-bold text-white">
                    <span>Grand Total Paid / COD</span>
                    <span className="text-amber-500 font-serif text-lg">₹{placedOrderSummary.total}</span>
                  </div>
                  <div className="text-[11px] text-amber-400/80 leading-normal pt-2">
                    * Standard shipping updates will be posted to WhatsApp.
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border border-amber-500/10 rounded-lg text-neutral-400 text-xs sm:text-sm mb-8">
                We have initiated a WhatsApp chat redirect with your order details. If it did not open automatically, please click below to send your order manually:
                <a 
                  href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(`*🎁 NEW ORDER* - ID: ${placedOrderSummary.id}. Checking on status.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-2.5 bg-neutral-950 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Order Details on WhatsApp</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="px-6 py-3 border border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-amber-500 rounded-lg transition-colors text-sm font-semibold"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <>
              <div className="mb-10 border-b border-amber-500/10 pb-6">
                <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-wide">
                  Secure <span className="text-amber-500">Checkout</span>
                </h1>
                <p className="text-neutral-400 text-sm mt-1">Provide your shipping address and submit your order details.</p>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 luxury-card">
                  <p className="text-neutral-400 mb-6">Your shopping cart is empty.</p>
                  <Link href="/" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded text-sm uppercase">
                    Browse Store
                  </Link>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Form Fields (col-span-8) */}
                  <div className="lg:col-span-8 space-y-6">
                    <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Delivery Details</span>
                    </h2>

                    <div className="luxury-card p-6 sm:p-8 rounded-xl bg-neutral-900/30 space-y-6">
                      
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Recipient / Contact Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="Aishwarya Sharma"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="aishwarya@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone & WhatsApp */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Calling Phone Number *</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="e.g. 7305031323"
                          />
                        </div>
                        <div>
                          <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">WhatsApp Number *</label>
                          <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            required
                            value={form.whatsapp}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="For order verification chat"
                          />
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div>
                        <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Delivery Address (House, Street name) *</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          value={form.address}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                          placeholder="e.g. 104, Sunrise Apartments, Road 4"
                        />
                      </div>

                      {/* City, State, Pincode */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">City / District *</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={form.city}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="Hyderabad"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">State *</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={form.state}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="Telangana"
                          />
                        </div>
                        <div>
                          <label htmlFor="pincode" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Pincode *</label>
                          <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            required
                            value={form.pincode}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700"
                            placeholder="500033"
                          />
                        </div>
                      </div>

                      {/* Order Notes */}
                      <div>
                        <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">Order Notes / Gifting Instructions</label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={form.notes}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2.5 px-3 text-neutral-100 text-xs sm:text-sm focus:outline-none placeholder-neutral-700 resize-none"
                          placeholder="e.g. Please wrap in black box with gold ribbon. Direct gift delivery."
                        />
                      </div>

                      {/* Payment Method: COD only */}
                      <div className="pt-4 border-t border-amber-500/10">
                        <div className="border border-amber-500 bg-neutral-900/50 p-4 rounded-xl flex items-center gap-3">
                          <Check className="h-5 w-5 text-amber-500 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-white block text-sm">Cash on Delivery</span>
                            <span className="text-[10px] text-neutral-500">Pay cash upon parcel delivery — no advance payment needed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Summaries (col-span-4) */}
                  <div className="lg:col-span-4 space-y-6">
                    <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Review Items</span>
                    </h2>

                    <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 space-y-4">
                      {/* Products scroll area */}
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-xs border-b border-neutral-900 pb-2">
                            <div>
                              <span className="text-white font-medium block">{item.name}</span>
                              <span className="text-neutral-500">Qty: {item.quantity}</span>
                            </div>
                            <span className="text-amber-500 font-serif font-semibold">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Calculations breakdown */}
                      <div className="space-y-3 text-xs border-b border-amber-500/10 pb-4 pt-2">
                        <div className="flex justify-between text-neutral-400">
                          <span>Subtotal</span>
                          <span className="text-white font-serif">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Luxury Packing & Courier</span>
                          <span className="text-white font-serif">
                            {deliveryCharge === 0 ? <span className="text-amber-500">FREE</span> : `₹${deliveryCharge}`}
                          </span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center text-sm font-bold pb-2">
                        <span className="text-white uppercase tracking-wider text-[11px]">Total Amount</span>
                        <span className="text-amber-500 font-serif text-xl font-black">₹{total}</span>
                      </div>

                      {/* Validation & Place order */}
                      <div className="pt-2">
                        {errorMsg && (
                          <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg flex items-start gap-1.5 mb-3">
                            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-red-500 text-[10px] font-medium leading-tight">{errorMsg}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        >
                          <Send className="h-4 w-4" />
                          <span>Place Order via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
