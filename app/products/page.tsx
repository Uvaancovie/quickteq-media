// src/app/products/page.tsx
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { } from "drizzle-orm"; // For advanced queries if needed
import ProductSearch from "./ProductSearch";
import type { InferModel } from "drizzle-orm";

type Product = InferModel<typeof products>; 

export default async function ProductsPage() {
  // 1) Fetch products from Drizzle (Neon DB)
  const allProducts: Product[] = await db.select().from(products).orderBy(products.id);

  // 2) Pass the array to a client component for interactive filtering
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <ProductSearch initialProducts={allProducts} />
    </div>
  );
}
