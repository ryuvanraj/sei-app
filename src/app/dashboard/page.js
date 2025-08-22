"use client";

import Link from "next/link";
import { useState } from "react";

import WalletConnection from "@/components/WalletConnection";
import OrderProducts from "@/components/OrderProducts";
import OrderHistoryWidget from "@/components/OrderHistoryWidget";
import MapInterface from "@/components/MapInterface";
import DeliveryRequestForm from "@/components/DeliveryRequestForm";

export default function Dashboard() {
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-drone-charcoal bg-drone-graphite/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-drone-highlight hover:text-white transition-colors">
              <span className="text-lg">←</span>
              <span className="font-orbitron">Back to DroneX</span>
            </Link>
            <div className="flex items-center gap-6">
              <h1 className="font-orbitron text-2xl font-bold text-drone-highlight">Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            <WalletConnection />
            <OrderHistoryWidget />
          </div>

          {/* Center column */}
          <div className="lg:col-span-2 space-y-8">
            <MapInterface />
            <OrderProducts onOneToOneClick={() => setShowDeliveryForm(true)} />
          </div>
        </div>
      </div>

      {/* Delivery Request Form Popup */}
      <DeliveryRequestForm 
        isOpen={showDeliveryForm} 
        onClose={() => setShowDeliveryForm(false)} 
      />

      {/* Footer */}
      <footer className="border-t border-drone-charcoal bg-drone-graphite/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="font-orbitron text-drone-highlight">DroneX • Powered by Sei Blockchain • Eliza OS Integration</p>
            <p className="text-sm text-gray-400 mt-2">Revolutionizing delivery with decentralized drone networks</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


