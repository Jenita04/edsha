'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { 
  DollarSign, ShoppingBag, Box, Users, ChevronDown, ChevronUp, Check, 
  Trash2, Plus, Edit, ShieldAlert, BarChart2, CheckCircle2, Package
} from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { useStore } from '@/context/StoreContext';

export default function AdminPage() {
  const { isAdmin, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'inventory' | 'customers'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  // Connect to global Store Context
  const { products, hamperItems, inventory, addProduct, deleteProduct, updateStock } = useStore();
  
  // Combine all items in dynamic catalog
  const adminProducts = [
    ...products,
    ...hamperItems.women.map(p => ({ ...p, category: 'women' })),
    ...hamperItems.men.map(p => ({ ...p, category: 'men' })),
    ...hamperItems.kids.map(p => ({ ...p, category: 'kids' }))
  ];

  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    category: 'frames', 
    description: '', 
    image: '', 
    stock: '50' 
  });
  
  const [adjustments, setAdjustments] = useState<{ [key: string]: string }>({});
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('edsha_orders') || '[]');
    // Seed some mock orders if none exist
    if (savedOrders.length === 0) {
      const mockOrders = [
        {
          id: 'EDSHA-984321',
          date: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
          customer: {
            name: 'Rohit K.',
            phone: '9876543211',
            whatsapp: '9876543211',
            email: 'rohit@example.com',
            address: 'Flat 402, Lotus Residency, Gachibowli, Hyderabad - 500032'
          },
          items: [
            {
              name: 'Couple Acrylic Frame',
              price: 899,
              quantity: 1,
              customDetails: {
                photoName: 'anniversary_pic.jpg',
                customName: 'Rohit & Shruti',
                customMessage: 'Together since 2018',
                category: 'frames'
              }
            }
          ],
          subtotal: 899,
          deliveryCharge: 99,
          total: 998,
          paymentMethod: 'UPI',
          notes: 'Deliver before Friday if possible.',
          status: 'Delivered'
        },
        {
          id: 'EDSHA-182390',
          date: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
          customer: {
            name: 'Priyanka Sen',
            phone: '9876543212',
            whatsapp: '9876543212',
            email: 'priyanka.s@example.com',
            address: 'Villa 12, Palm Meadows, Whitefield, Bangalore - 560066'
          },
          items: [
            {
              name: 'Customized Women Hamper (Package 2)',
              price: 999,
              quantity: 2,
              customDetails: {
                packageName: 'Package 2',
                hamperItems: ['Premium Belgian Chocolates', 'Rose & Oud Scented Candle', 'Luxury Rose Gold Perfume (50ml)', 'Feminine Gold Rim Mug', 'Gold-Plated Minimalist Earrings'],
                recipientName: 'Mom & Aunt',
                customMessage: 'Happy Mother\'s Day!',
                category: 'women'
              }
            }
          ],
          subtotal: 1998,
          deliveryCharge: 0,
          total: 1998,
          paymentMethod: 'COD',
          notes: 'Call before delivery.',
          status: 'Dispatched'
        }
      ];
      localStorage.setItem('edsha_orders', JSON.stringify(mockOrders));
      setOrders(mockOrders);
    } else {
      setOrders(savedOrders);
    }
  }, []);

  // Update order status
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('edsha_orders', JSON.stringify(updated));
  };

  // Delete order record
  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order record?')) {
      const updated = orders.filter(o => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem('edsha_orders', JSON.stringify(updated));
    }
  };

  // Add new Product handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image,
      stock: parseInt(newProduct.stock, 10) || 0
    });

    setNewProduct({ 
      name: '', 
      price: '', 
      category: 'frames', 
      description: '', 
      image: '', 
      stock: '50' 
    });
  };

  // Delete Product
  const handleDeleteProduct = (prodId: string) => {
    if (confirm('Delete this product from catalog?')) {
      deleteProduct(prodId);
    }
  };

  // Apply stock count adjustment (+/- format)
  const handleApplyAdjustment = (itemId: string) => {
    const val = (adjustments[itemId] || '').trim();
    if (!val) return;
    const match = val.match(/^([+-]?)\s*(\d+)$/);
    if (match) {
      const sign = match[1];
      const num = parseInt(match[2], 10);
      const amount = sign === '-' ? -num : num;
      updateStock(itemId, amount);
      setAdjustments(prev => ({ ...prev, [itemId]: '' }));
    } else {
      alert("Please enter a valid adjustment format (e.g. +5 or -10)");
    }
  };

  // Calculate statistics
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'Cancelled' ? sum + o.total : sum, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending Verification' || o.status === 'Dispatched').length;

  // Compile unique customers
  const customersMap: { [key: string]: any } = {};
  orders.forEach(o => {
    const key = o.customer.email.toLowerCase();
    if (!customersMap[key]) {
      customersMap[key] = {
        name: o.customer.name,
        email: o.customer.email,
        phone: o.customer.phone,
        totalOrders: 0,
        totalSpend: 0
      };
    }
    customersMap[key].totalOrders += 1;
    if (o.status !== 'Cancelled') {
      customersMap[key].totalSpend += o.total;
    }
  });
  const customersList = Object.values(customersMap);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="p-8 bg-neutral-900 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full mb-4 p-2 bg-neutral-800 border border-amber-500/30 rounded text-white focus:outline-none"
          />
          <button
            onClick={() => {
              const success = login(password);
              if (success) {
                setPassword('');
                setLoginError('');
              } else {
                setLoginError('Incorrect password');
              }
            }}
            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold rounded"
          >
            Login
          </button>
          {loginError && <p className="mt-2 text-red-500">{loginError}</p>}
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />

<main className="flex-grow bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/10 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-wide">
                Admin <span className="text-amber-500">Dashboard</span>
              </h1>
            </div>
            <button
              onClick={logout}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold rounded"
            >
              Logout
            </button>
          </div>

          {/* Stats Analytics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Stat 1 */}
            <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 flex items-center gap-5">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider block">Total Revenue</span>
                <span className="text-2xl font-serif font-bold text-white">₹{totalRevenue}</span>
              </div>
            </div>
            {/* Stat 2 */}
            <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 flex items-center gap-5">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider block">Total Orders</span>
                <span className="text-2xl font-serif font-bold text-white">{totalOrdersCount}</span>
              </div>
            </div>
            {/* Stat 3 */}
            <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 flex items-center gap-5">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                <BarChart2 className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider block">Active Orders</span>
                <span className="text-2xl font-serif font-bold text-white">{pendingOrdersCount}</span>
              </div>
            </div>
            {/* Stat 4 */}
            <div className="luxury-card p-6 rounded-xl bg-neutral-900/30 flex items-center gap-5">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                <Box className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider block">Catalog items</span>
                <span className="text-2xl font-serif font-bold text-white">{adminProducts.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-900 mb-8 overflow-x-auto gap-2">
            {(['orders', 'products', 'inventory', 'customers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-6 font-semibold uppercase tracking-wider text-xs border-b-2 transition-all focus:outline-none flex items-center gap-2 ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-500 bg-amber-500/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab === 'orders' && <ShoppingBag className="h-4 w-4" />}
                {tab === 'products' && <Package className="h-4 w-4" />}
                {tab === 'inventory' && <Box className="h-4 w-4" />}
                {tab === 'customers' && <Users className="h-4 w-4" />}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          {/* TAB CONTENT: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>Manage Orders</span>
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12 border border-neutral-900 bg-neutral-950 rounded-xl">
                  <p className="text-neutral-500 text-base">No orders logged in store yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const isExpanded = expandedOrder === order.id;
                    return (
                      <div 
                        key={order.id} 
                        className={`luxury-card rounded-xl overflow-hidden border transition-all ${
                          isExpanded ? 'border-amber-500 bg-neutral-900/40 shadow-md' : 'border-amber-500/10 bg-neutral-900/10'
                        }`}
                      >
                        {/* Header Row */}
                        <div 
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/20"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white tracking-wide">{order.id}</span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold font-serif uppercase tracking-wider ${
                                order.status === 'Delivered' 
                                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20' 
                                  : order.status === 'Cancelled'
                                  ? 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                                  : 'bg-neutral-950 text-amber-400 border border-amber-400/40 animate-pulse'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-neutral-500 text-xs">Placed on: {new Date(order.date).toLocaleString()}</p>
                          </div>

                          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right">
                              <span className="text-neutral-500 text-[10px] block uppercase">Grand Total</span>
                              <span className="text-amber-500 font-bold font-serif">₹{order.total}</span>
                            </div>
                            {isExpanded ? <ChevronUp className="h-5 w-5 text-neutral-400" /> : <ChevronDown className="h-5 w-5 text-neutral-400" />}
                          </div>
                        </div>

                        {/* Expandable Details Area */}
                        {isExpanded && (
                          <div className="p-6 border-t border-amber-500/10 bg-neutral-950/60 space-y-6 text-sm leading-relaxed text-neutral-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Customer Information */}
                              <div className="space-y-2.5">
                                <h3 className="text-xs uppercase tracking-wider font-bold text-amber-500 font-serif border-b border-neutral-900 pb-1">Customer & Shipping</h3>
                                <p><strong>Name:</strong> {order.customer.name}</p>
                                <p><strong>Phone:</strong> {order.customer.phone}</p>
                                <p><strong>WhatsApp:</strong> {order.customer.whatsapp}</p>
                                <p><strong>Email:</strong> {order.customer.email}</p>
                                <p><strong>Address:</strong> {order.customer.address}</p>
                              </div>

                              {/* Order Properties */}
                              <div className="space-y-2.5">
                                <h3 className="text-xs uppercase tracking-wider font-bold text-amber-500 font-serif border-b border-neutral-900 pb-1">Billing & Specs</h3>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <p><strong>Subtotal:</strong> ₹{order.subtotal}</p>
                                <p><strong>Delivery Fee:</strong> ₹{order.deliveryCharge}</p>
                                <p><strong>Order Notes:</strong> <span className="italic">"{order.notes || 'None'}"</span></p>
                              </div>
                            </div>

                            {/* Ordered Customizable Products */}
                            <div className="space-y-3 pt-3 border-t border-neutral-900">
                              <h3 className="text-xs uppercase tracking-wider font-bold text-amber-500 font-serif mb-1">Products Customized</h3>
                              <div className="space-y-4">
                                {order.items.map((item: any, idx: number) => (
                                  <div key={idx} className="bg-neutral-900 p-4 rounded-lg border border-amber-500/5 space-y-2">
                                    <div className="flex justify-between font-semibold text-white">
                                      <span>{item.name} x {item.quantity}</span>
                                      <span className="text-amber-500 font-serif">₹{item.price * item.quantity}</span>
                                    </div>
                                    
                                    {item.customDetails && (
                                      <div className="pl-4 border-l border-amber-500/20 space-y-1 text-xs text-neutral-400">
                                        {item.customDetails.recipientName && (
                                          <p>• Recipient: <strong>{item.customDetails.recipientName}</strong></p>
                                        )}
                                        {item.customDetails.customName && (
                                          <p>• Custom Title: <strong>{item.customDetails.customName}</strong></p>
                                        )}
                                        {item.customDetails.customMessage && (
                                          <p>• Message: <span className="italic">"{item.customDetails.customMessage}"</span></p>
                                        )}
                                        {item.customDetails.photoName && (
                                          <p>• Uploaded File: <strong>{item.customDetails.photoName}</strong></p>
                                        )}
                                        {item.customDetails.hamperItems && (
                                          <p>• Hamper contents: <strong>{item.customDetails.hamperItems.join(', ')}</strong></p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions Control bar */}
                            <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className="text-neutral-500 text-xs uppercase font-semibold">Change Status:</span>
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                  className="bg-neutral-900 border border-amber-500/20 rounded-md py-1 px-3 text-neutral-200 text-xs focus:outline-none focus:border-amber-500"
                                >
                                  <option value="Pending Verification">Pending Verification</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>
                              
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="flex items-center gap-1.5 text-neutral-500 hover:text-red-500 transition-colors text-xs font-semibold focus:outline-none"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete Record</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Product catalog display (col-span-2) */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <span>Active Catalog ({adminProducts.length})</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adminProducts.map((p) => (
                    <div key={p.id} className="luxury-card p-4 rounded-xl bg-neutral-900/20 border border-amber-500/10 flex gap-4 items-center justify-between">
                      <div>
                        <span className="text-[10px] text-amber-500 border border-amber-500/20 rounded px-1.5 py-0.5 uppercase tracking-wider font-semibold font-mono block w-max mb-1.5">
                          {p.category}
                        </span>
                        <h4 className="font-bold text-white text-sm tracking-wide">{p.name}</h4>
                        <span className="text-amber-400 font-serif text-xs font-bold block mt-1">₹{p.price}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-neutral-600 hover:text-red-500 transition-colors p-2"
                        aria-label="Delete Product"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Product Form (col-span-1) */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <span>Add Product</span>
                </h2>

                <form onSubmit={handleAddProduct} className="luxury-card p-6 rounded-xl bg-neutral-900/30 space-y-4">
                  <div>
                    <label htmlFor="p-name" className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Product Name</label>
                    <input
                      type="text"
                      id="p-name"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2 px-3 text-neutral-100 text-xs focus:outline-none"
                      placeholder="e.g. Shadow Box Acrylic Frame"
                    />
                  </div>

                  <div>
                    <label htmlFor="p-price" className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Price (INR)</label>
                    <input
                      type="number"
                      id="p-price"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2 px-3 text-neutral-100 text-xs focus:outline-none"
                      placeholder="e.g. 1199"
                    />
                  </div>

                  <div>
                    <label htmlFor="p-category" className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Category</label>
                    <select
                      id="p-category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2 px-3 text-neutral-300 text-xs focus:outline-none"
                    >
                      <option value="frames">Acrylic Frames</option>
                      <option value="women">Women Hampers</option>
                      <option value="men">Men Hampers</option>
                      <option value="kids">Kids Hampers</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="p-desc" className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Short Description</label>
                    <textarea
                      id="p-desc"
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2 px-3 text-neutral-100 text-xs focus:outline-none resize-none"
                      placeholder="Product details and customization support..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Product Image</label>
                    <div className="flex flex-col gap-3">
                      {newProduct.image ? (
                        <div className="relative h-32 w-full border border-amber-500/20 rounded-lg overflow-hidden bg-neutral-950">
                          <img
                            src={newProduct.image}
                            alt="Product Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setNewProduct({ ...newProduct, image: '' })}
                            className="absolute bottom-2 right-2 bg-neutral-900/90 text-amber-500 hover:text-amber-400 font-bold text-xs py-1 px-3 rounded border border-amber-500/30"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="border border-dashed border-amber-500/20 rounded-lg bg-neutral-950 p-4 text-center hover:border-amber-500/50 transition-colors relative cursor-pointer">
                          <Plus className="h-6 w-6 text-amber-500/50 mx-auto mb-2" />
                          <span className="text-neutral-400 text-xs block font-semibold">Upload Image</span>
                          <span className="text-neutral-600 text-[10px] block mt-0.5">Supports JPG, PNG</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setNewProduct({ ...newProduct, image: event.target.result as string });
                                  }
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="p-stock" className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Initial Stock Quantity</label>
                    <input
                      type="number"
                      id="p-stock"
                      required
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded-lg py-2 px-3 text-neutral-100 text-xs focus:outline-none"
                      placeholder="e.g. 50"
                      min="0"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-lg transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Catalog Item</span>
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB CONTENT: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>Stock Control</span>
              </h2>

              <div className="luxury-card rounded-xl overflow-hidden bg-neutral-900/10 border border-amber-500/10">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-900 text-amber-500 font-serif uppercase tracking-wider border-b border-amber-500/10 text-[10px]">
                      <th className="p-4 font-bold">Item Identifier</th>
                      <th className="p-4 font-bold">Classification</th>
                      <th className="p-4 font-bold">Stock Count</th>
                      <th className="p-4 font-bold">Availability Status</th>
                      <th className="p-4 font-bold text-right">Adjustment Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-900/25">
                        <td className="p-4 font-bold text-white">{item.name}</td>
                        <td className="p-4 text-neutral-400">{item.category}</td>
                        <td className="p-4 font-mono font-bold text-sm">{item.stock}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${
                            item.status === 'In Stock' 
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : item.status === 'Low Stock'
                              ? 'bg-amber-400/10 text-amber-400 border-amber-400/20 animate-pulse'
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-right flex justify-end items-center gap-2">
                          <input
                            type="text"
                            value={adjustments[item.id] || ''}
                            onChange={(e) => setAdjustments({ ...adjustments, [item.id]: e.target.value })}
                            placeholder="e.g. +5 or -10"
                            className="w-24 bg-neutral-950 border border-amber-500/20 focus:border-amber-500 rounded px-2.5 py-1 text-white text-xs focus:outline-none text-center"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleApplyAdjustment(item.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleApplyAdjustment(item.id)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded text-xs transition-colors focus:outline-none"
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-serif text-amber-500 border-b border-amber-500/10 pb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>Customer Log</span>
              </h2>

              {customersList.length === 0 ? (
                <div className="text-center py-12 border border-neutral-900 bg-neutral-950 rounded-xl">
                  <p className="text-neutral-500 text-base">No customer metrics recorded yet.</p>
                </div>
              ) : (
                <div className="luxury-card rounded-xl overflow-hidden bg-neutral-900/10 border border-amber-500/10">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-900 text-amber-500 font-serif uppercase tracking-wider border-b border-amber-500/10 text-[10px]">
                        <th className="p-4 font-bold">Customer Profile</th>
                        <th className="p-4 font-bold">Contact Email</th>
                        <th className="p-4 font-bold">Phone Link</th>
                        <th className="p-4 font-bold">Total Orders Placed</th>
                        <th className="p-4 font-bold text-right">Cumulative Spend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-300">
                      {customersList.map((cust, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/25">
                          <td className="p-4 font-bold text-white">{cust.name}</td>
                          <td className="p-4 font-mono">{cust.email}</td>
                          <td className="p-4 text-neutral-400">{cust.phone}</td>
                          <td className="p-4 text-center font-bold">{cust.totalOrders}</td>
                          <td className="p-4 text-right font-serif font-bold text-amber-500 text-sm">₹{cust.totalSpend}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
