import { Product, Order, Customer, SalesDataPoint } from '@/types';

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Wireless Headphones Pro', category: 'Electronics', price: 149.99, stock: 42, status: 'active', image: 'https://picsum.photos/seed/p1/80/80', createdAt: '2026-01-10' },
  { id: 'p2', name: 'Ergonomic Office Chair', category: 'Furniture', price: 399.00, stock: 15, status: 'active', image: 'https://picsum.photos/seed/p2/80/80', createdAt: '2026-01-15' },
  { id: 'p3', name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 89.99, stock: 78, status: 'active', image: 'https://picsum.photos/seed/p3/80/80', createdAt: '2026-01-20' },
  { id: 'p4', name: 'Standing Desk 160cm', category: 'Furniture', price: 599.00, stock: 8, status: 'active', image: 'https://picsum.photos/seed/p4/80/80', createdAt: '2026-02-01' },
  { id: 'p5', name: '4K Webcam Ultra', category: 'Electronics', price: 129.99, stock: 0, status: 'draft', image: 'https://picsum.photos/seed/p5/80/80', createdAt: '2026-02-10' },
  { id: 'p6', name: 'Noise Cancelling Earbuds', category: 'Electronics', price: 79.99, stock: 120, status: 'active', image: 'https://picsum.photos/seed/p6/80/80', createdAt: '2026-02-15' },
  { id: 'p7', name: 'USB-C Hub 10-in-1', category: 'Accessories', price: 49.99, stock: 200, status: 'active', image: 'https://picsum.photos/seed/p7/80/80', createdAt: '2026-02-20' },
  { id: 'p8', name: 'Monitor 27" 4K IPS', category: 'Electronics', price: 699.00, stock: 5, status: 'active', image: 'https://picsum.photos/seed/p8/80/80', createdAt: '2026-03-01' },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', customerId: 'c1', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', products: [{ productId: 'p1', name: 'Wireless Headphones Pro', qty: 1, price: 149.99 }], total: 149.99, status: 'delivered', createdAt: '2026-04-01' },
  { id: 'ORD-002', customerId: 'c2', customerName: 'Bob Smith', customerEmail: 'bob@example.com', products: [{ productId: 'p2', name: 'Ergonomic Office Chair', qty: 1, price: 399.00 }], total: 399.00, status: 'shipped', createdAt: '2026-04-05' },
  { id: 'ORD-003', customerId: 'c3', customerName: 'Carol White', customerEmail: 'carol@example.com', products: [{ productId: 'p3', name: 'Mechanical Keyboard RGB', qty: 2, price: 89.99 }], total: 179.98, status: 'processing', createdAt: '2026-04-10' },
  { id: 'ORD-004', customerId: 'c4', customerName: 'David Lee', customerEmail: 'david@example.com', products: [{ productId: 'p4', name: 'Standing Desk 160cm', qty: 1, price: 599.00 }], total: 599.00, status: 'pending', createdAt: '2026-04-15' },
  { id: 'ORD-005', customerId: 'c1', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', products: [{ productId: 'p6', name: 'Noise Cancelling Earbuds', qty: 1, price: 79.99 }], total: 79.99, status: 'delivered', createdAt: '2026-04-18' },
  { id: 'ORD-006', customerId: 'c5', customerName: 'Emma Davis', customerEmail: 'emma@example.com', products: [{ productId: 'p7', name: 'USB-C Hub 10-in-1', qty: 3, price: 49.99 }], total: 149.97, status: 'cancelled', createdAt: '2026-04-20' },
  { id: 'ORD-007', customerId: 'c6', customerName: 'Frank Miller', customerEmail: 'frank@example.com', products: [{ productId: 'p8', name: 'Monitor 27" 4K IPS', qty: 1, price: 699.00 }], total: 699.00, status: 'shipped', createdAt: '2026-04-25' },
  { id: 'ORD-008', customerId: 'c2', customerName: 'Bob Smith', customerEmail: 'bob@example.com', products: [{ productId: 'p5', name: '4K Webcam Ultra', qty: 1, price: 129.99 }], total: 129.99, status: 'pending', createdAt: '2026-04-28' },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 555-0101', totalOrders: 2, totalSpent: 229.98, status: 'active', joinedAt: '2025-11-01' },
  { id: 'c2', name: 'Bob Smith', email: 'bob@example.com', phone: '+1 555-0102', totalOrders: 2, totalSpent: 528.99, status: 'active', joinedAt: '2025-11-15' },
  { id: 'c3', name: 'Carol White', email: 'carol@example.com', phone: '+1 555-0103', totalOrders: 1, totalSpent: 179.98, status: 'active', joinedAt: '2025-12-01' },
  { id: 'c4', name: 'David Lee', email: 'david@example.com', phone: '+1 555-0104', totalOrders: 1, totalSpent: 599.00, status: 'active', joinedAt: '2025-12-10' },
  { id: 'c5', name: 'Emma Davis', email: 'emma@example.com', phone: '+1 555-0105', totalOrders: 1, totalSpent: 149.97, status: 'inactive', joinedAt: '2026-01-05' },
  { id: 'c6', name: 'Frank Miller', email: 'frank@example.com', phone: '+1 555-0106', totalOrders: 1, totalSpent: 699.00, status: 'active', joinedAt: '2026-01-20' },
  { id: 'c7', name: 'Grace Wilson', email: 'grace@example.com', phone: '+1 555-0107', totalOrders: 0, totalSpent: 0, status: 'active', joinedAt: '2026-02-14' },
  { id: 'c8', name: 'Henry Brown', email: 'henry@example.com', phone: '+1 555-0108', totalOrders: 0, totalSpent: 0, status: 'inactive', joinedAt: '2026-03-01' },
];

export const mockSalesData: SalesDataPoint[] = [
  { month: 'Nov', revenue: 12400, orders: 48 },
  { month: 'Dec', revenue: 18900, orders: 72 },
  { month: 'Jan', revenue: 15200, orders: 61 },
  { month: 'Feb', revenue: 21300, orders: 89 },
  { month: 'Mar', revenue: 19800, orders: 76 },
  { month: 'Apr', revenue: 24600, orders: 98 },
];
