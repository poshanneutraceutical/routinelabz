
const API_URL = import.meta.env.VITE_API_URL || "/api";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  category: string | null;
  badge: string | null;
  featured: boolean;
  inStock: boolean;
  // Product images are served from Frontend/public/products.
  images?: string[];
};

export type DistributorInquiry = {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  city?: string;
  state?: string;
  message?: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

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
    throw new Error(message || `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  getProducts: () => request<Product[]>("/products"),

  getProduct: (id: number) =>
    request<Product>(`/products/${id}`),

  submitDistributor: (data: DistributorInquiry) =>
    request<DistributorInquiry>("/distributor", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitContact: (data: ContactMessage) =>
    request<ContactMessage>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
