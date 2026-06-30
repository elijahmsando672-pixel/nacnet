import type { User } from "@/types/auth";
import type { Product } from "@/types/product";
import type { Order, DashboardStats } from "@/types/order";

export const MOCK_USERS: (User & { password: string })[] = [
  { id: "user-1", email: "customer@nacnet.com", name: "Jane Customer", role: "customer", password: "password123", createdAt: "2025-01-15T08:00:00Z" },
  { id: "user-2", email: "merchant@nacnet.com", name: "John Merchant", role: "merchant", password: "password123", createdAt: "2025-01-10T08:00:00Z" },
  { id: "user-3", email: "admin@nacnet.com", name: "Alice Admin", role: "admin", password: "password123", createdAt: "2024-12-01T08:00:00Z" },
];

export const MOCK_MERCHANTS = [
  { id: "merchant-1", name: "Tech Store", email: "merchant@nacnet.com", status: "active" as const, totalProducts: 3, totalOrders: 2, totalRevenue: 259.98, createdAt: "2025-01-10T08:00:00Z" },
  { id: "merchant-2", name: "Accessory World", email: "accessories@nacnet.com", status: "active" as const, totalProducts: 4, totalOrders: 0, totalRevenue: 0, createdAt: "2025-02-01T08:00:00Z" },
  { id: "merchant-3", name: "Gadget Pro", email: "gadgets@nacnet.com", status: "pending" as const, totalProducts: 1, totalOrders: 0, totalRevenue: 0, createdAt: "2025-03-01T08:00:00Z" },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: "prod-1", name: "iPhone 16 Pro", slug: "iphone-16-pro", description: "Latest flagship smartphone with A18 Pro chip, 48MP camera system, and stunning titanium design.", price: 1199.99, compareAtPrice: 1299.99, imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", category: "Phones", stock: 20, status: "active", merchantId: "merchant-1", createdAt: "2025-06-01T08:00:00Z", updatedAt: "2025-06-01T08:00:00Z" },
  { id: "prod-2", name: "Samsung Galaxy S25", slug: "samsung-galaxy-s25", description: "Powerful Android flagship with cutting-edge AI features, incredible camera, and all-day battery.", price: 999.99, compareAtPrice: 1099.99, imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", category: "Phones", stock: 15, status: "active", merchantId: "merchant-1", createdAt: "2025-06-05T08:00:00Z", updatedAt: "2025-06-05T08:00:00Z" },
  { id: "prod-3", name: "AirPods Pro 2", slug: "airpods-pro-2", description: "Premium wireless earbuds with adaptive noise cancellation, spatial audio, and USB-C charging.", price: 249.99, compareAtPrice: 279.99, imageUrl: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=400", category: "Audio", stock: 30, status: "active", merchantId: "merchant-1", createdAt: "2025-06-10T08:00:00Z", updatedAt: "2025-06-10T08:00:00Z" },
  { id: "prod-4", name: "Wireless Earbuds", slug: "wireless-earbuds", description: "Affordable true wireless earbuds with rich bass, comfortable fit, and 24-hour battery life.", price: 79.99, compareAtPrice: null, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400", category: "Audio", stock: 50, status: "active", merchantId: "merchant-2", createdAt: "2025-06-12T08:00:00Z", updatedAt: "2025-06-12T08:00:00Z" },
  { id: "prod-5", name: "Silicone Phone Case", slug: "silicone-phone-case", description: "Shockproof silicone case with precise cutouts and a comfortable grip. Available for all major models.", price: 29.99, compareAtPrice: 39.99, imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400", category: "Cases", stock: 100, status: "active", merchantId: "merchant-2", createdAt: "2025-06-15T08:00:00Z", updatedAt: "2025-06-15T08:00:00Z" },
  { id: "prod-6", name: "Tempered Glass Screen Protector", slug: "tempered-glass-screen-protector", description: "Ultra-clear 9H hardness tempered glass with oleophobic coating. Easy bubble-free installation.", price: 14.99, compareAtPrice: null, imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400", category: "Cases", stock: 200, status: "active", merchantId: "merchant-2", createdAt: "2025-06-18T08:00:00Z", updatedAt: "2025-06-18T08:00:00Z" },
  { id: "prod-7", name: "65W Fast Charger", slug: "fast-charger-65w", description: "GaN fast charger compatible with iPhone, Samsung, and USB-C devices. Compact and powerful.", price: 45.99, compareAtPrice: 59.99, imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400", category: "Accessories", stock: 40, status: "active", merchantId: "merchant-1", createdAt: "2025-06-20T08:00:00Z", updatedAt: "2025-06-20T08:00:00Z" },
  { id: "prod-8", name: "Power Bank 20000mAh", slug: "power-bank-20000mah", description: "High-capacity portable charger with dual USB ports and fast charging support for all devices.", price: 59.99, compareAtPrice: null, imageUrl: "https://images.unsplash.com/photo-1609592424913-21d6a68ad8e0?w=400", category: "Accessories", stock: 35, status: "draft", merchantId: "merchant-3", createdAt: "2025-06-22T08:00:00Z", updatedAt: "2025-06-22T08:00:00Z" },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-1", customerId: "user-1", customerName: "Jane Customer", customerEmail: "customer@nacnet.com", merchantId: "merchant-1",
    items: [
      { productId: "prod-1", name: "Wireless Headphones", price: 79.99, quantity: 1, imageUrl: "" },
      { productId: "prod-3", name: "Leather Backpack", price: 89.99, quantity: 1, imageUrl: "" },
    ],
    total: 169.98, status: "shipped",
    shippingAddress: { line1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "US" },
    createdAt: "2025-03-05T10:00:00Z", updatedAt: "2025-03-07T15:00:00Z",
  },
  {
    id: "order-2", customerId: "user-1", customerName: "Jane Customer", customerEmail: "customer@nacnet.com", merchantId: "merchant-1",
    items: [{ productId: "prod-2", name: "Smart Watch", price: 199.99, quantity: 1, imageUrl: "" }],
    total: 199.99, status: "pending",
    shippingAddress: { line1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "US" },
    createdAt: "2025-03-10T14:00:00Z", updatedAt: "2025-03-10T14:00:00Z" },
];

export const MOCK_MERCHANT_STATS: DashboardStats = {
  totalRevenue: 259.98, totalOrders: 2, totalProducts: 3, revenueChange: 12.5, ordersChange: 8.3, productsChange: 0,
};

export const MOCK_ADMIN_STATS: DashboardStats = {
  totalRevenue: 259.98, totalOrders: 2, totalProducts: 6, totalCustomers: 1, totalMerchants: 3,
  revenueChange: 15.2, ordersChange: 10.1, productsChange: 5.3,
};
