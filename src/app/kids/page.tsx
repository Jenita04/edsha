'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import HamperBuilder from '@/components/HamperBuilder';

export default function KidsHampersPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-neutral-950">
        <HamperBuilder
          category="kids"
          title="Kids' Gift Hampers"
          subtitle="Curate a magical hamper filled with soft teddy bears, wood jigsaw puzzles, metallic sticker sheets, coloring books, and gold coin chocolates."
          recipientLabel="Child's Name"
          messageLabel="Birthday Message"
          placeholderRecipient="e.g. Aarav / Riya / Champ"
          placeholderMessage="e.g. Happy 5th Birthday, little superstar! Hope your day is filled with toys and smiles!"
        />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
