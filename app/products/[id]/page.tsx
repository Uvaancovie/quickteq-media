// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Convert id to a number and check if it is valid
  const productId = Number(params.id);
  if (isNaN(productId)) {
    notFound();
  }

  // Query the product from the DB
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl mb-2">${product.price.toString()}</p>
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={600}
          className="w-full h-auto mb-4"
        />
      )}
      {/* Include your OrderForm or additional product details here */}
    </div>
  );
}
