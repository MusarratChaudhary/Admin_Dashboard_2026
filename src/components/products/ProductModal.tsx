'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types';

interface Props {
  product?: Product;
  onClose: () => void;
}

const CATEGORIES = ['Electronics', 'Furniture', 'Accessories', 'Clothing', 'Books'];
const STATUSES: Product['status'][] = ['active', 'draft', 'archived'];

const empty = (): Omit<Product, 'id' | 'createdAt'> => ({
  name: '', category: 'Electronics', price: 0, stock: 0, status: 'active',
  image: 'https://picsum.photos/seed/new/80/80',
});

export default function ProductModal({ product, onClose }: Props) {
  const { addProduct, updateProduct } = useProductStore();
  const [form, setForm] = useState(product ? { ...product } : { ...empty(), id: '', createdAt: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (form.price <= 0) e.price = 'Price must be > 0';
    if (form.stock < 0) e.stock = 'Stock cannot be negative';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (product) {
      updateProduct(product.id, form);
    } else {
      addProduct({ ...form, id: `p${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="p-1 rounded text-muted-foreground hover:text-foreground transition" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Product Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Wireless Headphones"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input">
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price ($)" error={errors.price}>
              <input
                type="number" min="0" step="0.01"
                value={form.price}
                onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                className="input"
              />
            </Field>
            <Field label="Stock" error={errors.stock}>
              <input
                type="number" min="0"
                value={form.stock}
                onChange={(e) => set('stock', parseInt(e.target.value) || 0)}
                className="input"
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
