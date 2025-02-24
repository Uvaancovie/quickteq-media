// pages/api/orders/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/db";
import { orders, orderItems } from "@/db/schema";
// We no longer need InferModel if we aren't using it in this file

// Define the order data type (only include fields that are used)
type OrderData = {
  productId: number;
  quantity: number;
  // productName, name, email are not used in the insertion
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { productId, quantity }: OrderData = req.body;

      // Insert order into orders table.
      // Note: totalAmount is a numeric column, so we pass its value as a string.
      const [newOrder] = await db
        .insert(orders)
        .values({
          userId: 1, // Dummy user; replace with authenticated user ID if available.
          totalAmount: "0", // Pass as string
          paymentStatus: "pending",
          deliveryStatus: "not_shipped",
        })
        .returning();

      // Insert order item into order_items table.
      await db.insert(orderItems).values({
        orderId: newOrder.id,
        productId: productId,
        quantity,
        price: "0", // Pass as string; replace with actual product price if available.
      });

      res.status(201).json({ message: "Order placed successfully" });
    } catch (error: unknown) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
