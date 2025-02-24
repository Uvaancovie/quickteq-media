"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard"; // Renders each product
import type { InferModel } from "drizzle-orm";
import { products } from "@/db/schema";

type Product = InferModel<typeof products>;

interface ProductSearchProps {
  initialProducts: Product[];
}

export default function ProductSearch({ initialProducts }: ProductSearchProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // Filter logic via useMemo
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      // Brand match
      const matchesBrand =
        !brand || p.brand?.toLowerCase().includes(brand.toLowerCase());
      // Model match
      const matchesModel =
        !model || p.model?.toLowerCase().includes(model.toLowerCase());
      // Price match
      let matchesPrice = true;
      if (maxPrice) {
        const priceNum = parseFloat(p.price.toString()); 
        const max = parseFloat(maxPrice);
        matchesPrice = priceNum <= max;
      }

      return matchesBrand && matchesModel && matchesPrice;
    });
  }, [initialProducts, brand, model, maxPrice]);

  return (
    <div>
      {/* Filter Inputs */}
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="brand" className="font-semibold">
            Brand
          </label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. Dell"
            className="border p-1 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="model" className="font-semibold">
            Model
          </label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g. Inspiron 15"
            className="border p-1 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="font-semibold">
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1000"
            className="border p-1 rounded"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id.toString(),
                name: p.name,
                shortDescription: p.description || "",
                price: parseFloat(p.price),   // Convert Drizzle numeric
                image: p.imageUrl || undefined,
              }}
            />
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </div>
    </div>
  );
}
