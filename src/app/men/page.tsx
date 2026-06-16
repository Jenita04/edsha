'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import HamperBuilder from '@/components/HamperBuilder';

export default function MenHampersPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-neutral-950">
        <HamperBuilder
          category="men"
          title="Men's Gift Hampers"
          subtitle="Curate a sophisticated collection of matte black coffee tumblers, premium fragrances, leather wallets, ties, and notebooks for the remarkable men in your life."
          recipientLabel="Recipient's Name"
          messageLabel="Occasion Message"
          placeholderRecipient="e.g. Dad / Vikram / Hubby"
          placeholderMessage="e.g. Cheers to the best husband! Happy Anniversary, love!"
        />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
