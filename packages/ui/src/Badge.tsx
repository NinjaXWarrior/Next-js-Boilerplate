import { cn } from './utils/cn';

type BadgeVariant = 'danger' | 'default' | 'success' | 'warning';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
};

export const Badge = (props: {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
      variantStyles[props.variant ?? 'default'],
      props.className,
    )}
  >
    {props.children}
  </span>
);
