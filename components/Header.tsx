import Link from 'next/link';
import { ShoppingCart, User, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">LaptopStore</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/products" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Products
            </Link>
            <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <div className="flex items-center">
            <Link href="/cart" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Cart</span>
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/account" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Account</span>
              <User className="h-6 w-6" />
            </Link>
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}