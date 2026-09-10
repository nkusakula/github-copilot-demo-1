import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const normalizedQuantity = Math.floor(quantity);
    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.product.productId === product.productId);
      if (existing) {
        return prev.map(item =>
          item.product.productId === product.productId
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item
        );
      }
      return [...prev, { product, quantity: normalizedQuantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.product.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const normalizedQuantity = Math.floor(quantity);

    setItems(prev => {
      // A non-positive quantity removes the line rather than leaving an
      // invalid/zero-quantity item in the cart.
      if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
        return prev.filter(item => item.product.productId !== productId);
      }
      return prev.map(item =>
        item.product.productId === productId
          ? { ...item, quantity: normalizedQuantity }
          : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, itemCount, addToCart, removeFromCart, updateQuantity, clearCart }),
    [items, itemCount, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
