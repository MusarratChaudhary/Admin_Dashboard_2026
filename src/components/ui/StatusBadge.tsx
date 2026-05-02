import { cn } from '@/lib/utils';

type Status =
  | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  | 'active' | 'draft' | 'archived'
  | 'inactive';

const MAP: Record<Status, { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
  processing: { label: 'Processing', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  shipped:    { label: 'Shipped',    className: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  delivered:  { label: 'Delivered',  className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  cancelled:  { label: 'Cancelled',  className: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  active:     { label: 'Active',     className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  draft:      { label: 'Draft',      className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
  archived:   { label: 'Archived',   className: 'bg-muted text-muted-foreground' },
  inactive:   { label: 'Inactive',   className: 'bg-muted text-muted-foreground' },
};

export default function StatusBadge({ status }: { status: Status }) {
  const { label, className } = MAP[status] ?? { label: status, className: 'bg-muted text-muted-foreground' };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', className)}>
      {label}
    </span>
  );
}
