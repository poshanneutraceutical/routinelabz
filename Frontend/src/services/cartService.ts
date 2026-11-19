
const API_URL = import.meta.env.VITE_API_URL || "/api";

export interface AddToCartRequest {
  customerId: string;
  productId: number;
  quantity: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number | null;
  customerId: string;
  totalAmount: number;
  items: CartItem[];
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(
      message || `Cart request failed (${response.status})`
    );
  }

  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  const responseText = await response.text();

  // Spring clear-cart endpoint may return an empty HTTP 200.
  if (!responseText.trim()) {
    return undefined as T;
  }

  try {
    return JSON.parse(responseText) as T;
  } catch {
    throw new Error("The cart API returned an unreadable response.");
  }
}

const cartService = {

  addToCart: (data: AddToCartRequest) =>
    request<Cart>("/cart/add", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getCart: (customerId: string) =>
    request<Cart>(
      `/cart/${encodeURIComponent(customerId)}`
    ),

  updateQuantity: (
    customerId: string,
    productId: number,
    quantity: number
  ) =>
    request<Cart>(
      `/cart/${encodeURIComponent(customerId)}/${productId}?quantity=${quantity}`,
      { method: "PUT" }
    ),

  removeItem: (
    customerId: string,
    productId: number
  ) =>
    request<Cart>(
      `/cart/${encodeURIComponent(customerId)}/${productId}`,
      { method: "DELETE" }
    ),

  clearCart: (customerId: string) =>
    request<void>(
      `/cart/${encodeURIComponent(customerId)}/clear`,
      { method: "DELETE" }
    ),

};

export default cartService;
