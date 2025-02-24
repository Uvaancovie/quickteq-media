

import { Metadata } from "next";
import { db } from "@/db/db"; // your Drizzle db client
import { products } from "@/db/schema"; // your Drizzle schema
import { revalidatePath } from "next/cache";

// shadcn/ui components (adjust imports to match your setup)
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// We can export some page metadata (optional)
export const metadata: Metadata = {
  title: "Admin - Add Product",
  description: "Add new products to the store.",
};

// Define a server action to handle form submissions
// This function runs on the server
export async function createProduct(formData: FormData) {
  "use server";

  // Extract fields from FormData
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const imageUrl = formData.get("imageUrl") as string;

  // Insert into Drizzle
  await db.insert(products).values({
    name,
    description,
    price: price.toString(), // if your column is numeric, you can pass string or numeric
    stock,
    brand,
    model,
    imageUrl,  // <--- new field
  });

  // Revalidate this route so the list of products is up-to-date
  revalidatePath("/admin/products");
}

export default function AdminProductsPage() {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form action={createProduct}>
        <div className="space-y-4">
          {/* NAME */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              required
            />
          </div>
          {/* DESCRIPTION */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Short description"
            />
          </div>
          {/* PRICE */}
          <div>
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              type="number"
              step="0.01"
              name="price"
              id="price"
              placeholder="0.00"
              required
            />
          </div>
          {/* STOCK */}
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              type="number"
              name="stock"
              id="stock"
              placeholder="0"
              required
            />
          </div>
          {/* BRAND */}
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              type="text"
              name="brand"
              id="brand"
              placeholder="e.g. Dell, HP"
            />
          </div>
          {/* MODEL */}
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              type="text"
              name="model"
              id="model"
              placeholder="e.g. Inspiron 15"
            />
          </div>
          {/* IMAGE URL */}
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder="https://example.com/product.jpg"
            />
          </div>
        </div>

        <Button type="submit" className="mt-6">
          Add Product
        </Button>
      </form>
    </div>
  );
}
