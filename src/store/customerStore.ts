import { create } from 'zustand';
import { Customer } from '@/types';

interface CustomerStore {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  setCustomers: (customers) => set({ customers }),
  search: '',
  setSearch: (search) => set({ search }),
}));
