import { cn } from './utils/cn';

export const ButtonGroup = (props: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      'inline-flex -space-x-px [&>button]:rounded-none [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg',
      props.className,
    )}
    role="group"
  >
    {props.children}
  </div>
);
