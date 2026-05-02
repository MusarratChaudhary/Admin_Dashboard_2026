'use client';

import { useEffect, useState } from 'react';
import { useOrderStore } from '@/store/orderStore';
import { mockOrders } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Order } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';

const STATUSES: Array<Order['status'] | 'all'> = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrdersPage() {
  const { orders, setOrders, updateOrderStatus } = useOrderStore();
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');

  useEffect(() => { setOrders(mockOrders); }, [setOrders]);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
              filter === s
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Order ID', 'Customer', 'Items', 'Total', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">No orders found.</td></tr>
              )}
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{order.id}</td>
                  <td className="px-5 py-3">
                    <div>
                      <div className="font-medium text-foreground">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{order.products.length} item{order.products.length !== 1 ? 's' : ''}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{formatCurrency(order.total)}</td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="text-xs border border-input rounded-md px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      aria-label={`Change status for ${order.id}`}
                    >
                      {STATUSES.filter((s) => s !== 'all').map((s) => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
