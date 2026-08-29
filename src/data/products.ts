export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'frames' | 'women' | 'men' | 'kids';
}

export const PRODUCTS: Product[] = [
  // Frame Sizes
  {
    id: 'frame-4x6',
    name: '4x6 Frame',
    price: 149,
    description: 'Premium quality 4x6 inch frame, perfect for small photos. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-4x6/600/400',
    category: 'frames'
  },
  {
    id: 'frame-5x7',
    name: '5x7 Frame',
    price: 199,
    description: 'Premium quality 5x7 inch frame, ideal for standard prints. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-5x7/600/400',
    category: 'frames'
  },
  {
    id: 'frame-6x8',
    name: '6x8 Frame',
    price: 249,
    description: 'Premium quality 6x8 inch frame, great for portraits. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-6x8/600/400',
    category: 'frames'
  },
  {
    id: 'frame-6x9',
    name: '6x9 Frame',
    price: 299,
    description: 'Premium quality 6x9 inch frame, beautiful display piece. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-6x9/600/400',
    category: 'frames'
  },
  {
    id: 'frame-8x10',
    name: '8x10 Frame',
    price: 399,
    description: 'Premium quality 8x10 inch frame, standard large portrait size. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-8x10/600/400',
    category: 'frames'
  },
  {
    id: 'frame-8x12',
    name: '8x12 Frame',
    price: 499,
    description: 'Premium quality 8x12 inch frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-8x12/600/400',
    category: 'frames'
  },
  {
    id: 'frame-10x12',
    name: '10x12 Frame',
    price: 599,
    description: 'Premium quality 10x12 inch frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-10x12/600/400',
    category: 'frames'
  },
  {
    id: 'frame-10x15',
    name: '10x15 Frame',
    price: 799,
    description: 'Premium quality 10x15 inch frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-10x15/600/400',
    category: 'frames'
  },
  {
    id: 'frame-12x18',
    name: '12x18 Frame',
    price: 999,
    description: 'Premium quality 12x18 inch frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-12x18/600/400',
    category: 'frames'
  },
  {
    id: 'frame-15x21',
    name: '15x21 Frame',
    price: 1499,
    description: 'Premium quality 15x21 inch frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-15x21/600/400',
    category: 'frames'
  },
  {
    id: 'frame-18x24',
    name: '18x24 Frame',
    price: 1999,
    description: 'Premium quality 18x24 inch poster size frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-18x24/600/400',
    category: 'frames'
  },
  {
    id: 'frame-24x36',
    name: '24x36 Frame',
    price: 2999,
    description: 'Premium quality 24x36 inch large poster size frame. HD Photo Printing, Custom Designs Available.',
    image: 'https://picsum.photos/seed/frame-24x36/600/400',
    category: 'frames'
  }
];

export const HAMPER_ITEMS = {
  women: [
    { id: 'w-choc', name: 'Premium Belgian Chocolates', price: 0, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' },
    { id: 'w-candle', name: 'Rose & Oud Scented Candle', price: 0, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80' },
    { id: 'w-mask', name: 'Gold Peeling Face Mask', price: 0, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80' },
    { id: 'w-perfume', name: 'Luxury Rose Gold Perfume (50ml)', price: 0, image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80' },
    { id: 'w-earring', name: 'Gold-Plated Minimalist Earrings', price: 0, image: '/images/women gift hamper/earing.jpeg' },
    { id: 'w-mug', name: 'Feminine Gold Rim Mug', price: 0, image: '/images/women gift hamper/cup.jpeg' },
    { id: 'w-cream', name: 'Luxury Skincare Hand Cream', price: 0, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80' },
    { id: 'w-card', name: 'Feminine Gilded Greeting Card', price: 0, image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
    { id: 'w-serum', name: 'Vitamin C Glow Serum', price: 0, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80' },
    { id: 'w-soap', name: 'Handmade Gold-Dust Honey Soap', price: 0, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80' },
    { id: 'w-scrub', name: 'Exfoliating Coffee Body Scrub', price: 0, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80' },
    { id: 'w-ring', name: 'Gold Statement Ring', price: 0, image: '/images/women gift hamper/ring.jpeg' },
    { id: 'w-lipbalm', name: 'Rose Petal Luxury Lip Balm', price: 0, image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&q=80' },
    { id: 'w-mirror', name: 'Gold Compact Mirror', price: 0, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80' },
    { id: 'w-bracelet', name: 'Dainty Gold Chain Bracelet', price: 0, image: '/images/women gift hamper/chain.jpeg' },
    { id: 'w-lotion', name: 'Shea Butter Body Lotion', price: 0, image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400&q=80' },
    { id: 'w-eyemask', name: 'Silk Sleep Eye Mask', price: 0, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
    { id: 'w-nailset', name: 'Premium Manicure Kit', price: 0, image: '/images/women gift hamper/nail polish.jpeg' },
    { id: 'w-hairoil', name: 'Argan & Rose Hair Oil', price: 0, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80' },
    { id: 'w-pouch', name: 'Velvet Cosmetic Pouch', price: 0, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' }
  ],
  men: [
    { id: 'm-wallet', name: 'Premium Black Leather Wallet', price: 0, image: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=400&q=80' },
    { id: 'm-perfume', name: 'Luxury Intense Oud Perfume', price: 0, image: 'https://images.unsplash.com/photo-1590156562745-5f4f82d9e0a9?w=400&q=80' },
    { id: 'm-groom', name: 'Sandalwood Shaving & Grooming Kit', price: 0, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80' },
    { id: 'm-shade', name: 'Classic Gold-Frame Sunglasses', price: 0, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
    { id: 'm-key', name: 'Leather & Brass Keyring', price: 0, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
    { id: 'm-mug', name: 'Matte Black Ceramic Mug', price: 0, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80' },
    { id: 'm-choc', name: 'Dark Truffle Chocolate Box', price: 0, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' },
    { id: 'm-bottle', name: 'Insulated Matte Black Flask', price: 0, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
    { id: 'm-tumbler', name: 'Gold Accented Coffee Tumbler', price: 0, image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&q=80' },
    { id: 'm-tie', name: 'Golden Silk Necktie Set', price: 0, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80' },
    { id: 'm-bracelet', name: 'Golden Steel Chain Bracelet', price: 0, image: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&q=80' },
    { id: 'm-notes', name: 'Luxury Black Gilded Notebook', price: 0, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80' },
    { id: 'm-belt', name: 'Italian Leather Belt (Black)', price: 0, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { id: 'm-cardholder', name: 'Carbon Fibre Card Holder', price: 0, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80' },
    { id: 'm-cufflinks', name: 'Gold & Onyx Cufflinks', price: 0, image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=400&q=80' },
    { id: 'm-beardoil', name: 'Premium Beard Oil (Cedarwood)', price: 0, image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=400&q=80' },
    { id: 'm-socks', name: 'Bamboo Luxury Socks Gift Set', price: 0, image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80' },
    { id: 'm-pen', name: 'Matte Black Executive Pen', price: 0, image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80' },
    { id: 'm-pocketknife', name: 'Stainless Steel Pocket Tool', price: 0, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { id: 'm-deo', name: 'Premium Body Spray (100ml)', price: 0, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80' }
  ],
  kids: [
    { id: 'k-toy', name: 'Premium Golden Teddy Bear', price: 0, image: '/images/kids gift hamper/teddy bear.jpeg' },
    { id: 'k-book', name: 'Occasion Coloring & Activity Book', price: 0, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80' },
    { id: 'k-crayon', name: 'Luxury Pastel Crayon Set (24 Colors)', price: 0, image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80' },
    { id: 'k-choc', name: 'Premium Milk Chocolate Coins', price: 0, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80' },
    { id: 'k-story', name: 'The Golden Treasure Story Book', price: 0, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
    { id: 'k-puzzle', name: 'Wooden Castle Jigsaw Puzzle', price: 0, image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&q=80' },
    { id: 'k-camera', name: 'Mini Toy Camera', price: 0, image: '/images/kids gift hamper/small camera.jpeg' },
    { id: 'k-bottle', name: 'BPA-Free Kids Water Bottle', price: 0, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
    { id: 'k-mug', name: 'Custom Cartoon Golden Mug', price: 0, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80' },
    { id: 'k-dolls', name: 'Small Dolls Set', price: 0, image: '/images/kids gift hamper/small dolls.jpeg' },
    { id: 'k-badge', name: 'Golden Star Badge Set', price: 0, image: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?w=400&q=80' },
    { id: 'k-clay', name: 'Air-Dry Modeling Clay Kit', price: 0, image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80' },
    { id: 'k-markers', name: 'Washable Magic Marker Set', price: 0, image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&q=80' },
    { id: 'k-dino', name: 'Dinosaur Figure Collection', price: 0, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
    { id: 'k-car', name: 'Premium Die-Cast Toy Car', price: 0, image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&q=80' },
    { id: 'k-slime', name: 'Sparkle Glitter Slime Kit', price: 0, image: 'https://images.unsplash.com/photo-1550534791-2677533605ab?w=400&q=80' },
    { id: 'k-lunchbox', name: 'Gold Star Lunch Box', price: 0, image: 'https://images.unsplash.com/photo-1611068120813-ead2b6b3b9be?w=400&q=80' },
    { id: 'k-crown', name: 'Birthday Crown & Wand Set', price: 0, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80' },
    { id: 'k-plush', name: 'Light-up Panda Plush', price: 0, image: '/images/kids gift hamper/light panda.jpeg' },
    { id: 'k-artset', name: 'Deluxe Art & Craft Kit', price: 0, image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80' }
  ]

};

export const HAMPER_PACKAGES = [
  { id: 'pkg-1', name: 'Package 1', minItems: 5, maxItems: 7, price: 699, description: 'Select 5-7 premium products for a beautiful customized gift box.' },
  { id: 'pkg-2', name: 'Package 2', minItems: 10, maxItems: 12, price: 999, description: 'Select 10-12 premium products for a larger, exquisite gifting hamper.' },
  { id: 'pkg-3', name: 'Package 3', minItems: 10, maxItems: 15, price: 1499, description: 'Select 10-15 premium products for the ultimate luxury gifting experience.' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aishwarya R.',
    location: 'Mumbai',
    text: 'I ordered the LED Acrylic Frame for my anniversary. The custom gold border and name calligraphy are incredibly beautiful. EDSHA is my go-to for gifting now!',
    rating: 5
  },
  {
    id: 2,
    name: 'Vikram Singh',
    location: 'Delhi',
    text: 'The Men\'s Hamper Package 2 was a hit. The combination of the matte black flask, perfume, and wallet looked extremely premium. The recipient loved it.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sneha Patel',
    location: 'Bangalore',
    text: 'Superb quality and exceptionally fast delivery. The Kids Hamper was packaged beautifully in a luxury black box with a gold ribbon. Truly premium!',
    rating: 5
  },
  {
    id: 4,
    name: 'Rahul Mehta',
    location: 'Hyderabad',
    text: 'Highly recommend the Wedding Acrylic Frame. The layout, custom message printing, and heavy glossy acrylic made it look like a high-end artifact.',
    rating: 5
  }
];

export const FAQS = [
  {
    question: 'How do I customize an Acrylic Photo Frame?',
    answer: 'Simply select your desired frame, upload your photo (we support major image formats), type in the recipient\'s name, and add a custom message. We will print it precisely with premium gold accents.'
  },
  {
    question: 'How does Hamper Customization work?',
    answer: 'First, select a hamper package (Package 1: 5-7 items, Package 2: 10-12 items, Package 3: 10-15 items). Then choose your products from our curated list. Add custom name/message, and add to cart!'
  },
  {
    question: 'What is the shipping time?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Tracking details will be shared on WhatsApp once the order is placed.'
  },
  {
    question: 'How do I place an order?',
    answer: 'Add items to the cart, fill in your delivery details on the Checkout page, choose Cash on Delivery or UPI, and click "Place Order". Your order summary will be sent directly to our business WhatsApp for validation and payment.'
  },
  {
    question: 'Can I send a gift directly to the recipient?',
    answer: 'Yes! Enter the recipient\'s address in the delivery address fields at checkout and specify in the order notes that it is a direct gift. We will package it as a gift without the price tag.'
  }
];
