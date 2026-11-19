
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getCustomerId } from "../utils/customer";
import cartService from "../services/cartService";
import type { Cart } from "../services/cartService";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  cartCount: number;

  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "An unexpected cart error occurred.";
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [customerId] = useState(() => getCustomerId());

  // Fetch existing customer cart
  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedCart = await cartService.getCart(customerId);
      setCart(updatedCart);
    } catch (requestError) {
      setCart(null);
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  // Add product
  const addToCart = useCallback(
    async (productId: number, quantity = 1) => {
      setLoading(true);
      setError(null);

      try {
        const updatedCart = await cartService.addToCart({
          customerId,
          productId,
          quantity,
        });

        setCart(updatedCart);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
        throw requestError;
      } finally {
        setLoading(false);
      }
    },
    [customerId]
  );

  // Remove product
  const removeItem = useCallback(
    async (productId: number) => {
      setLoading(true);
      setError(null);

      try {
        const updatedCart = await cartService.removeItem(
          customerId,
          productId
        );

        setCart(updatedCart);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
        throw requestError;
      } finally {
        setLoading(false);
      }
    },
    [customerId]
  );

  // Update product quantity
  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const updatedCart = await cartService.updateQuantity(
          customerId,
          productId,
          quantity
        );

        setCart(updatedCart);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
        throw requestError;
      } finally {
        setLoading(false);
      }
    },
    [customerId, removeItem]
  );

  // Clear complete cart
  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await cartService.clearCart(customerId);

      setCart({
        id: cart?.id ?? null,
        customerId,
        totalAmount: 0,
        items: [],
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [cart?.id, customerId]);

  // Total quantity across all cart items
  const cartCount = useMemo(
    () =>
      cart?.items?.reduce(
        (total, item) => total + item.quantity,
        0
      ) ?? 0,
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      cartCount,
      addToCart,
      removeItem,
      updateQuantity,
      refreshCart,
      clearCart,
    }),
    [
      cart,
      loading,
      error,
      cartCount,
      addToCart,
      removeItem,
      updateQuantity,
      refreshCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
