import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from './utils/cn';

const pageVariants = cva(
  'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-label-md font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      paginationStyle: {
        blanked: 'aria-[current=page]:font-semibold aria-[current=page]:text-neutral-900',
        filled: 'aria-[current=page]:bg-primary-500 aria-[current=page]:text-white',
        outline:
          'aria-[current=page]:border aria-[current=page]:border-primary-500 aria-[current=page]:text-primary-600',
      },
    },
    defaultVariants: {
      paginationStyle: 'filled',
    },
  },
);

/* Figma "Overflow" type: window the page list around the current page. */
const pageWindow = (page: number, pageCount: number) => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  const middle = [page - 1, page, page + 1].filter((n) => n > 1 && n < pageCount);
  const items: (number | 'gap-end' | 'gap-start')[] = [1];
  if (middle.length > 0 && middle[0] !== 2) {
    items.push('gap-start');
  }
  items.push(...middle);
  if (middle.length > 0 && middle.at(-1) !== pageCount - 1) {
    items.push('gap-end');
  }
  if (middle.length === 0) {
    items.push('gap-start');
  }
  items.push(pageCount);
  return items;
};

export const Pagination = (props: {
  className?: string;
  onPageChange?: (page: number) => void;
  page: number;
  pageCount: number;
  paginationStyle?: VariantProps<typeof pageVariants>['paginationStyle'];
}) => {
  const pageClasses = pageVariants({ paginationStyle: props.paginationStyle });

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', props.className)}>
      <button
        aria-label="Previous page"
        className={pageClasses}
        disabled={props.page <= 1}
        onClick={() => props.onPageChange?.(props.page - 1)}
        type="button"
      >
        <ChevronLeftIcon className="size-4" />
      </button>
      {pageWindow(props.page, props.pageCount).map((item) =>
        typeof item === 'number' ? (
          <button
            aria-current={item === props.page ? 'page' : undefined}
            className={pageClasses}
            key={item}
            onClick={() => props.onPageChange?.(item)}
            type="button"
          >
            {item}
          </button>
        ) : (
          <span aria-hidden="true" className="px-1 text-neutral-400" key={item}>
            …
          </span>
        ),
      )}
      <button
        aria-label="Next page"
        className={pageClasses}
        disabled={props.page >= props.pageCount}
        onClick={() => props.onPageChange?.(props.page + 1)}
        type="button"
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </nav>
  );
};
