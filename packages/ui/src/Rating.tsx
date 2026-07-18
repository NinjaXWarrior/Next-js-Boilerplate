import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { StarIcon } from 'lucide-react';
import { cn } from './utils/cn';

const starVariants = cva('', {
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const filledClasses = {
  yellow: 'fill-warning-400 text-warning-400',
  neutral: 'fill-neutral-600 text-neutral-600',
};

/* Figma "Rate" steps are 0.5 — values render to the nearest half star. */
export const Rating = (props: {
  className?: string;
  color?: 'neutral' | 'yellow';
  max?: number;
  onChange?: (value: number) => void;
  size?: VariantProps<typeof starVariants>['size'];
  value: number;
}) => {
  const max = props.max ?? 5;
  const value = Math.round(props.value * 2) / 2;
  const starClass = starVariants({ size: props.size });
  const filled = filledClasses[props.color ?? 'yellow'];

  const renderStar = (index: number) => {
    if (index + 1 <= value) {
      return <StarIcon className={cn(starClass, filled)} />;
    }
    if (index + 0.5 === value) {
      return (
        <span className="relative inline-flex">
          <StarIcon className={cn(starClass, 'text-neutral-300')} />
          <span className="absolute inset-0 w-1/2 overflow-hidden">
            <StarIcon className={cn(starClass, filled)} />
          </span>
        </span>
      );
    }
    return <StarIcon className={cn(starClass, 'text-neutral-300')} />;
  };

  return (
    <div
      aria-label={props.onChange ? undefined : `${value} out of ${max}`}
      className={cn('flex items-center gap-0.5', props.className)}
      role={props.onChange ? undefined : 'img'}
    >
      {Array.from({ length: max }, (_, index) =>
        props.onChange ? (
          <button
            aria-label={`Rate ${index + 1} out of ${max}`}
            className="transition hover:scale-110"
            key={index}
            onClick={() => props.onChange?.(index + 1)}
            type="button"
          >
            {renderStar(index)}
          </button>
        ) : (
          <span key={index}>{renderStar(index)}</span>
        ),
      )}
    </div>
  );
};
