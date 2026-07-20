import { cn } from './utils/cn';

export const Card = (props: { children: React.ReactNode; className?: string; title?: string }) => (
  <div
    className={cn('rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm', props.className)}
  >
    {props.title && <h3 className="mb-3 text-lg font-semibold text-neutral-900">{props.title}</h3>}
    {props.children}
  </div>
);
