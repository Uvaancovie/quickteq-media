// app/components/OrderForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the props for the order form
interface OrderFormProps {
  productId: number;
  productName: string;
}

export default function OrderForm({ productId, productName }: OrderFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build your order object
    const order = { productId, productName, quantity, name, email };
    console.log("Order submitted:", order);

    // Simulate an API call (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to a thank-you page (you can create a dedicated page for orders)
    router.push("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="quantity" className="block mb-1 font-semibold">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">
          Your Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Place Order
      </button>
    </form>
  );
}
