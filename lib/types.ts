export interface Product {
    id: string;
    name: string;
    shortDescription: string;
    description?: string;
    price: number;
    image?: string;
    stock?: number;
    category?: string;
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  export interface Order {
    id: string;
    status: OrderStatus;
    items: CartItem[];
    total: number;
    shippingAddress: string;
    trackingNumber?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // Note: In a real application, never store plain text passwords
  }
  
  export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }