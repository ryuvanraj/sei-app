import Link from "next/link";
import Image from "next/image";
import { Products } from "@/app/data/product";

export default function ProductsPage() {
  // Group products by category
  const categories = [...new Set(Products.map(product => product.category))];
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-drone-charcoal bg-drone-graphite/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-drone-highlight hover:text-white transition-colors">
              <span className="text-lg">←</span>
              <span className="font-orbitron">Back to Dashboard</span>
            </Link>
            <h1 className="font-orbitron text-2xl font-bold text-drone-highlight">All Products</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.map((category) => {
          const categoryProducts = Products.filter(product => product.category === category);
          
          return (
            <div key={category} className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-drone-highlight font-orbitron">
                {category}
              </h2>
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categoryProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="group bg-drone-graphite/30 backdrop-blur-sm border border-drone-charcoal rounded-lg p-4 hover:border-drone-highlight transition-colors"
                  >
                    <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-lg text-white mb-2">{product.name}</h3>
                    <p className="font-bold text-drone-highlight">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
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
