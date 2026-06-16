'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import HamperBuilder from '@/components/HamperBuilder';

export default function WomenHampersPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-neutral-950">
        <HamperBuilder
          category="women"
          title="Women's Gift Hampers"
          subtitle="Curate a feminine collection of luxury body scrubs, scented candles, chocolates, fine skincare, and customized mugs for the special women in your life."
          recipientLabel="Recipient's Name"
          messageLabel="Greeting Message"
          placeholderRecipient="e.g. Mom / Aishwarya / Sister"
          placeholderMessage="e.g. Wishing you a day as beautiful as you are! Happy Birthday!"
        />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
