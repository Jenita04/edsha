'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, HAMPER_ITEMS, Product } from '@/data/products';

export interface CartItem {
  id: string; // Unique composite key for hampers and custom frames
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customDetails?: {
    photoName?: string;
    photoUrl?: string;
    customName?: string;
    customMessage?: string;
    recipientName?: string;
    hamperItems?: string[];
    packageName?: string;
    category?: string;
  };
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  categoryFilter: string;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Dynamic Catalog & Inventory
  products: Product[];
  hamperItems: { women: any[]; men: any[]; kids: any[] };
  inventory: any[];
  addProduct: (product: { name: string; price: number; category: string; description: string; image: string; stock: number }) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (itemId: string, amount: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isHydrated, setIsHydrated] = useState(false);

  // Dynamic Catalog and Inventory States
  const [products, setProducts] = useState<Product[]>([]);
  const [hamperItems, setHamperItems] = useState<{ women: any[]; men: any[]; kids: any[] }>({
    women: [],
    men: [],
    kids: []
  });
  const [inventory, setInventory] = useState<any[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('edsha_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('edsha_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      // Load products, hamper items, and inventory
      const savedProducts = localStorage.getItem('edsha_products');
      let loadedProducts = PRODUCTS;
      if (savedProducts) {
        loadedProducts = JSON.parse(savedProducts);
        setProducts(loadedProducts);
      } else {
        setProducts(PRODUCTS);
        localStorage.setItem('edsha_products', JSON.stringify(PRODUCTS));
      }

      const savedHamperItems = localStorage.getItem('edsha_hamper_items');
      let loadedHamper = HAMPER_ITEMS;
      if (savedHamperItems) {
        loadedHamper = JSON.parse(savedHamperItems);
        setHamperItems(loadedHamper);
      } else {
        setHamperItems(HAMPER_ITEMS);
        localStorage.setItem('edsha_hamper_items', JSON.stringify(HAMPER_ITEMS));
      }

      const savedInventory = localStorage.getItem('edsha_inventory');
      if (savedInventory) {
        setInventory(JSON.parse(savedInventory));
      } else {
        // Seed initial inventory from loaded catalog
        const seededInventory: any[] = [];
        loadedProducts.forEach((p) => {
          seededInventory.push({
            id: p.id,
            name: p.name,
            category: 'Frames',
            stock: 45,
            status: 'In Stock'
          });
        });
        loadedHamper.women.forEach((item) => {
          seededInventory.push({
            id: item.id,
            name: `${item.name} (Women)`,
            category: 'Hamper Item',
            stock: 120,
            status: 'In Stock'
          });
        });
        loadedHamper.men.forEach((item) => {
          seededInventory.push({
            id: item.id,
            name: `${item.name} (Men)`,
            category: 'Hamper Item',
            stock: 8,
            status: 'Low Stock'
          });
        });
        loadedHamper.kids.forEach((item) => {
          seededInventory.push({
            id: item.id,
            name: `${item.name} (Kids)`,
            category: 'Hamper Item',
            stock: 50,
            status: 'In Stock'
          });
        });
        setInventory(seededInventory);
        localStorage.setItem('edsha_inventory', JSON.stringify(seededInventory));
      }
    } catch (error) {
      console.error('Failed to load local storage state:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('edsha_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart state:', error);
    }
  }, [cart, isHydrated]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('edsha_wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist state:', error);
    }
  }, [wishlist, isHydrated]);

  // Save products to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('edsha_products', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products state:', error);
    }
  }, [products, isHydrated]);

  // Save hamper items to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('edsha_hamper_items', JSON.stringify(hamperItems));
    } catch (error) {
      console.error('Failed to save hamper items state:', error);
    }
  }, [hamperItems, isHydrated]);

  // Save inventory to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('edsha_inventory', JSON.stringify(inventory));
    } catch (error) {
      console.error('Failed to save inventory state:', error);
    }
  }, [inventory, isHydrated]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCart((prevCart) => {
      // Find if item with same composite id already exists
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Add a product or hamper item
  const addProduct = (newProd: { name: string; price: number; category: string; description: string; image: string; stock: number }) => {
    const id = `${newProd.category}-${Date.now()}`;
    const newStock = newProd.stock;
    const status = newStock === 0 ? 'Out of Stock' : newStock <= 10 ? 'Low Stock' : 'In Stock';

    if (newProd.category === 'frames') {
      const addedProduct: Product = {
        id,
        name: newProd.name,
        price: newProd.price,
        description: newProd.description || 'Premium customizable gifting accessory.',
        image: newProd.image,
        category: 'frames'
      };
      setProducts((prev) => [addedProduct, ...prev]);
      
      const newInvItem = {
        id,
        name: addedProduct.name,
        category: 'Frames',
        stock: newStock,
        status
      };
      setInventory((prev) => [newInvItem, ...prev]);
    } else if (newProd.category === 'women' || newProd.category === 'men' || newProd.category === 'kids') {
      const addedHamperItem = {
        id,
        name: newProd.name,
        price: 0,
        image: newProd.image
      };
      setHamperItems((prev) => ({
        ...prev,
        [newProd.category]: [addedHamperItem, ...prev[newProd.category as 'women' | 'men' | 'kids']]
      }));

      const catLabel = newProd.category.charAt(0).toUpperCase() + newProd.category.slice(1);
      const newInvItem = {
        id,
        name: `${addedHamperItem.name} (${catLabel})`,
        category: 'Hamper Item',
        stock: newStock,
        status
      };
      setInventory((prev) => [newInvItem, ...prev]);
    }
  };

  // Delete product or hamper item
  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setHamperItems((prev) => ({
      women: prev.women.filter((item) => item.id !== productId),
      men: prev.men.filter((item) => item.id !== productId),
      kids: prev.kids.filter((item) => item.id !== productId)
    }));
    setInventory((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update stock level of an item
  const updateStock = (itemId: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = Math.max(0, item.stock + amount);
          const status = newStock === 0 ? 'Out of Stock' : newStock <= 10 ? 'Low Stock' : 'In Stock';
          return { ...item, stock: newStock, status };
        }
        return item;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        searchQuery,
        categoryFilter,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        setSearchQuery,
        setCategoryFilter,
        isWishlisted,
        products,
        hamperItems,
        inventory,
        addProduct,
        deleteProduct,
        updateStock
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
