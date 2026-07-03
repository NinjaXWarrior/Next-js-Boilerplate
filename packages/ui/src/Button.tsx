import { cn } from './utils/cn';

type ButtonVariant = 'ghost' | 'primary' | 'secondary';
type ButtonSize = 'lg' | 'md' | 'sm';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-700',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

export const Button = (props: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
  type?: 'button' | 'reset' | 'submit';
  variant?: ButtonVariant;
}) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
      variantStyles[props.variant ?? 'primary'],
      sizeStyles[props.size ?? 'md'],
      props.className,
    )}
    disabled={props.disabled}
    onClick={props.onClick}
    type={props.type ?? 'button'}
  >
    {props.children}
  </button>
);
