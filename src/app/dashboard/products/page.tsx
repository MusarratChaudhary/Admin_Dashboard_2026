'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Product } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';
import ProductModal from '@/components/products/ProductModal';

export default function ProductsPage() {
  const { products, setProducts, deleteProduct } = useProductStore();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; product?: Product }>({ open: false });

  useEffect(() => { setProducts(mockProducts); }, [setProducts]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} total products</p>
        </div>
        <button
          onClick={() => setModal({ open: true })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search products"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Product', 'Category', 'Price', 'Stock', 'Status', 'Added', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">No products found.</td></tr>
              )}
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image src={product.image} alt={product.name} width={40} height={40} className="object-cover" />
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{product.category}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{formatCurrency(product.price)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{product.stock}</td>
                  <td className="px-5 py-3"><StatusBadge status={product.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{formatDate(product.createdAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setModal({ open: true, product })}
                        className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal.open && (
        <ProductModal
          product={modal.product}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  );
}
