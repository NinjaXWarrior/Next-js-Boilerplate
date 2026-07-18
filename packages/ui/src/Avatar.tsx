import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { UserIcon } from 'lucide-react';
import { cn } from './utils/cn';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center bg-neutral-100 font-medium text-neutral-600',
  {
    variants: {
      size: {
        xs: 'size-6 text-label-xs',
        sm: 'size-8 text-label-sm',
        md: 'size-10 text-label-md',
        lg: 'size-12 text-label-md',
        xl: 'size-14 text-label-lg',
        xxl: 'size-16 text-label-lg',
        xxxl: 'size-24 text-h5',
      },
      shape: {
        circle: 'rounded-full',
        rounded: 'rounded-lg',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  },
);

const statusClasses = {
  online: 'bg-success-500',
  offline: 'bg-neutral-300',
};

export const Avatar = (props: {
  alt?: string;
  className?: string;
  initials?: string;
  shape?: VariantProps<typeof avatarVariants>['shape'];
  size?: VariantProps<typeof avatarVariants>['size'];
  src?: string;
  status?: 'offline' | 'online';
}) => (
  <span className={cn(avatarVariants({ shape: props.shape, size: props.size }), props.className)}>
    {props.src ? (
      <img
        alt={props.alt ?? ''}
        className="size-full rounded-[inherit] object-cover"
        src={props.src}
      />
    ) : (
      (props.initials ?? <UserIcon className="size-1/2 text-neutral-400" />)
    )}
    {props.status && (
      <span
        className={cn(
          'absolute right-0 bottom-0 size-1/4 rounded-full ring-2 ring-white',
          statusClasses[props.status],
        )}
      />
    )}
  </span>
);

export const AvatarGroup = (props: {
  children: React.ReactNode;
  className?: string;
  moreCount?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
}) => (
  <span className={cn('inline-flex -space-x-2 [&>*]:ring-2 [&>*]:ring-white', props.className)}>
    {props.children}
    {(props.moreCount ?? 0) > 0 && (
      <span className={avatarVariants({ shape: 'circle', size: props.size })}>
        +{props.moreCount}
      </span>
    )}
  </span>
);
