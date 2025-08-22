
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";

const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_SEI_CHAIN_ID || "atlantic-2";

function truncateMiddle(value, prefix = 8, suffix = 6) {
  if (!value) return "";
  if (value.length <= prefix + suffix + 3) return value;
  return `${value.slice(0, prefix)}...${value.slice(-suffix)}`;
}

export default function PaymentPage() {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { cart, getTotalPrice } = useCart();
  const chainId = DEFAULT_CHAIN_ID;

  // Calculate order totals from actual cart
  const subtotal = getTotalPrice();
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window === "undefined" || !window.compass) return;
      try {
        const key = await window.compass.getKey(chainId);
        if (key?.bech32Address) {
          setWalletConnected(true);
          setWalletAddress(key.bech32Address);
        }
      } catch {
        // not connected yet
      }
    };
    checkWallet();
  }, [chainId]);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window === "undefined" || !window.compass) {
        alert("Compass wallet not found. Please install the Compass extension for SEI.");
        return;
      }
      await window.compass.enable(chainId);
      const key = await window.compass.getKey(chainId);
      if (key?.bech32Address) {
        setWalletConnected(true);
        setWalletAddress(key.bech32Address);
      }
    } catch (err) {
      console.error("Error connecting Compass wallet:", err);
      alert("Failed to connect to Compass wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePayment = async () => {
    if (!walletConnected) {
      // Connect to Compass Sei wallet first
      await connectWallet();
      return;
    }

    setIsProcessing(true);
    try {
      // Here you would implement actual blockchain transaction
      // For now, we'll simulate the payment process
      
      // Simulate blockchain payment processing
      setTimeout(() => {
        setIsProcessing(false);
        alert('Payment successful via Sei Blockchain! Your drone delivery is on the way!');
        // In real app, you would:
        // 1. Clear the cart
        // 2. Redirect to success page
        // 3. Start delivery tracking
      }, 3000);
    } catch (error) {
      setIsProcessing(false);
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-drone-charcoal bg-drone-graphite/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center gap-2 text-drone-highlight hover:text-white transition-colors">
              <span className="text-lg">←</span>
              <span className="font-orbitron">Back to Cart</span>
            </Link>
            <h1 className="font-orbitron text-2xl font-bold text-drone-highlight">Secure Payment</h1>
          </div>
        </div>
      </header>

      {/* Payment Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="bg-drone-graphite/30 backdrop-blur-sm border border-drone-charcoal rounded-lg p-6">
              <h2 className="text-xl font-bold text-drone-highlight mb-6 font-orbitron">Delivery Address</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Delivery Location</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your address for drone delivery"
                    className="w-full px-4 py-3 bg-drone-charcoal border border-drone-highlight/30 rounded-lg text-white placeholder-gray-400 focus:border-drone-highlight focus:outline-none"
                  />
                  <p className="text-sm text-gray-400 mt-2">📍 Drone delivery available within 10km radius</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-drone-charcoal border border-drone-highlight/30 rounded-lg text-white placeholder-gray-400 focus:border-drone-highlight focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Special Instructions</label>
                    <input
                      type="text"
                      placeholder="e.g., Leave at front door"
                      className="w-full px-4 py-3 bg-drone-charcoal border border-drone-highlight/30 rounded-lg text-white placeholder-gray-400 focus:border-drone-highlight focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-drone-graphite/30 backdrop-blur-sm border border-drone-charcoal rounded-lg p-6">
              <h2 className="text-xl font-bold text-drone-highlight mb-6 font-orbitron">Payment Method</h2>
              
              {/* Compass Sei Blockchain Payment */}
              <div className="p-6 border-2 border-drone-highlight rounded-lg bg-drone-charcoal/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-drone-highlight rounded-full flex items-center justify-center">
                    <span className="text-2xl">⛓️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl">Compass Sei Wallet</h3>
                    <p className="text-sm text-gray-400">Secure payment via Sei Blockchain with escrow protection</p>
                  </div>
                  <span className="text-xs bg-drone-highlight text-black px-3 py-1 rounded-full font-bold">ONLY OPTION</span>
                </div>

                {/* Wallet Connection Status */}
                <div className="mb-6">
                  {walletConnected ? (
                    <div className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600 rounded-lg">
                      <span className="text-green-400 text-xl">✅</span>
                      <div>
                        <h4 className="font-bold text-green-400">Wallet Connected</h4>
                        <p className="text-sm text-gray-300">{truncateMiddle(walletAddress)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                      <span className="text-yellow-400 text-xl">⚠️</span>
                      <div>
                        <h4 className="font-bold text-yellow-400">Wallet Not Connected</h4>
                        <p className="text-sm text-gray-300">Click &quot;Connect Wallet&quot; to proceed with payment</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Blockchain Features */}
                <div className="p-4 bg-drone-charcoal/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <h4 className="font-bold text-drone-highlight">Sei Blockchain Escrow Protection</h4>
                      <p className="text-sm text-gray-400">Your payment is secured until delivery is confirmed</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>✅ Funds held in smart contract until delivery</li>
                    <li>✅ Automatic release upon successful delivery</li>
                    <li>✅ Dispute resolution through decentralized protocol</li>
                    <li>✅ Full transparency and immutable transaction records</li>
                    <li>✅ Fast and low-cost transactions on Sei Network</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-drone-graphite/30 backdrop-blur-sm border border-drone-charcoal rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-drone-highlight mb-6 font-orbitron">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Items ({totalItems})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Drone Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <hr className="border-drone-charcoal" />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-drone-highlight">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing || isConnecting || !deliveryAddress || cart.length === 0}
                className="w-full bg-drone-highlight hover:bg-drone-highlight/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-lg transition-colors font-orbitron"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span>
                    Processing Payment...
                  </span>
                ) : isConnecting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span>
                    Connecting Wallet...
                  </span>
                ) : walletConnected ? (
                  'Complete Order via Sei Blockchain'
                ) : (
                  'Connect Compass Sei Wallet'
                )}
              </button>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-drone-charcoal">
                <h4 className="font-bold text-white mb-3">Security Features</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>🔐 End-to-end encryption</li>
                  <li>🛡️ Fraud protection</li>
                  <li>⛓️ Blockchain verification</li>
                  <li>📱 Real-time tracking</li>
                </ul>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-4 pt-4 border-t border-drone-charcoal">
                <h4 className="font-bold text-white mb-2">Estimated Delivery</h4>
                <div className="flex items-center gap-2 text-drone-highlight">
                  <span className="text-xl">🚁</span>
                  <span className="font-bold">15-30 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
