/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from 'react';
import { CartContext, CartItem } from './cartContextUtils';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    setItems(prev => {
      const existing = prev.find(cartItem => cartItem.productId === item.productId);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.productId !== productId));
      return;
    }
    setItems(prev =>
      prev.map(item => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * (1 - (item.discount || 0)) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
