// src/components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";


interface ProductCardProps {
  product: {
    id: string;
    name: string;
    shortDescription: string;
    price: number;
    image?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <a className="block border rounded p-4 hover:shadow-lg transition-shadow">
        {product.image ? (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="bg-gray-100 flex items-center justify-center h-48 mb-4">
            <p className="text-sm text-gray-500">No Image</p>
          </div>
        )}
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-700">{product.shortDescription}</p>
        <p className="mt-2 font-bold">${product.price}</p>
      </a>
    </Link>
  );
}
