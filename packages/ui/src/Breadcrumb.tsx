import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from './utils/cn';

export const Breadcrumb = (props: { children: React.ReactNode; className?: string }) => (
  <nav aria-label="Breadcrumb">
    <ol className={cn('flex items-center gap-1.5 text-label-md text-neutral-500', props.className)}>
      {props.children}
    </ol>
  </nav>
);

export const BreadcrumbItem = (props: { children: React.ReactNode; className?: string }) => (
  <li className={cn('flex items-center gap-1.5', props.className)}>{props.children}</li>
);

export const BreadcrumbLink = (props: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => (
  <a className={cn('transition hover:text-neutral-900', props.className)} href={props.href}>
    {props.children}
  </a>
);

export const BreadcrumbPage = (props: { children: React.ReactNode; className?: string }) => (
  <span aria-current="page" className={cn('font-medium text-neutral-900', props.className)}>
    {props.children}
  </span>
);

export const BreadcrumbSeparator = (props: {
  className?: string;
  indicator?: 'arrow' | 'chevron' | 'dot' | 'slash';
}) => {
  const indicator = props.indicator ?? 'chevron';

  return (
    <li aria-hidden="true" className={cn('text-neutral-400', props.className)}>
      {indicator === 'chevron' && <ChevronRightIcon className="size-3.5" />}
      {indicator === 'arrow' && <ArrowRightIcon className="size-3.5" />}
      {indicator === 'slash' && '/'}
      {indicator === 'dot' && '•'}
    </li>
  );
};
