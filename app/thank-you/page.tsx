// app/thank-you/page.tsx
import React from "react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your order has been placed successfully.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
