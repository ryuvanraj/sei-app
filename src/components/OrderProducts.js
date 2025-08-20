"use client";


import Image from "next/image";
import Link from "next/link";
import { Products } from "@/app/data/product";

export default function OrderProducts() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Order Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="font-medium mt-1">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
