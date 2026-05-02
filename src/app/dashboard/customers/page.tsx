'use client';

import { useEffect } from 'react';
import { Search, Mail, Phone } from 'lucide-react';
import { useCustomerStore } from '@/store/customerStore';
import { mockCustomers } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';

export default function CustomersPage() {
  const { customers, setCustomers, search, setSearch } = useCustomerStore();

  useEffect(() => { setCustomers(mockCustomers); }, [setCustomers]);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{customers.length} total customers</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search by name, email or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search customers"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Customer', 'Contact', 'Orders', 'Total Spent', 'Joined', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">No customers found.</td></tr>
              )}
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                        {customer.name[0]}
                      </div>
                      <span className="font-medium text-foreground">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Mail className="w-3 h-3" />{customer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Phone className="w-3 h-3" />{customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{customer.totalOrders}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{formatCurrency(customer.totalSpent)}</td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{formatDate(customer.joinedAt)}</td>
                  <td className="px-5 py-3"><StatusBadge status={customer.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
