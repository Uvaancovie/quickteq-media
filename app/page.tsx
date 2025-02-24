// app/products/page.tsx
import Image from 'next/image';
import { db } from '@/db/db';
import { products } from '@/db/schema';

// Example: import Card components from shadcn/ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

// If you have a typed model:
import type { InferModel } from 'drizzle-orm';
type Product = InferModel<typeof products>; // Drizzle infers fields from your schema

export default async function ProductsPage() {
  // 1) Fetch products from your Neon DB
  const allProducts: Product[] = await db.select().from(products);

  return (
    <main className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>

      {/* 2) Display products in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allProducts.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              {/* Convert price (numeric) to a string if needed */}
              <CardDescription>${p.price?.toString()}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* If you have an imageUrl in your product */}
              {p.imageUrl ? (
                <div className="relative w-full h-48">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                /* Fallback if no image URL */
                <div className="bg-gray-100 flex items-center justify-center h-48">
                  <p className="text-sm text-gray-500">No Image</p>
                </div>
              )}

              {p.description && (
                <p className="text-sm text-gray-700">{p.description}</p>
              )}

              {/* Optionally, show brand, model, etc. */}
              <p className="text-sm">
                Brand: <span className="font-semibold">{p.brand ?? 'N/A'}</span>
              </p>
              <p className="text-sm">
                Model: <span className="font-semibold">{p.model ?? 'N/A'}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
