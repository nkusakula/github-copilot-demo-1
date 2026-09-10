import { createContext } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  imgName: string;
  price: number;
  discount?: number;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
