import { CheckIcon } from 'lucide-react';
import { cn } from './utils/cn';

type StepState = 'complete' | 'current' | 'upcoming';

const circleSizes = {
  sm: 'size-7 text-label-xs',
  md: 'size-8 text-label-sm',
  lg: 'size-9 text-label-sm',
};

const circleClasses = (state: StepState) => {
  if (state === 'complete') {
    return 'bg-primary-500 text-white';
  }
  if (state === 'current') {
    return 'border-2 border-primary-500 bg-white text-primary-600';
  }
  return 'border-2 border-neutral-300 bg-white text-neutral-500';
};

const dotClasses = (state: StepState) =>
  state === 'upcoming' ? 'bg-neutral-300' : 'bg-primary-500';

export const ProgressStep = (props: {
  className?: string;
  current: number;
  direction?: 'horizontal' | 'vertical';
  indicator?: 'dot' | 'number';
  size?: 'lg' | 'md' | 'sm';
  steps: string[];
}) => {
  const vertical = props.direction === 'vertical';
  const size = props.size ?? 'md';

  const stepState = (index: number): StepState => {
    if (index < props.current) {
      return 'complete';
    }
    return index === props.current ? 'current' : 'upcoming';
  };

  return (
    <ol className={cn(vertical ? 'flex flex-col' : 'flex items-center gap-2', props.className)}>
      {props.steps.map((step, index) => {
        const state = stepState(index);
        const connector = index < props.steps.length - 1 && (
          <span
            aria-hidden="true"
            className={cn(
              state === 'complete' ? 'bg-primary-500' : 'bg-neutral-200',
              vertical ? 'my-1 ml-4 h-6 w-px' : 'h-px flex-1',
            )}
          />
        );

        return (
          <li
            className={cn(
              vertical ? 'flex flex-col' : 'flex flex-1 items-center gap-2 last:flex-none',
            )}
            key={step}
          >
            <span
              aria-current={state === 'current' ? 'step' : undefined}
              className="flex items-center gap-2"
            >
              {props.indicator === 'dot' ? (
                <span className={cn('mx-2.5 size-3 shrink-0 rounded-full', dotClasses(state))} />
              ) : (
                <span
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-full font-semibold',
                    circleSizes[size],
                    circleClasses(state),
                  )}
                >
                  {state === 'complete' ? <CheckIcon className="size-4" /> : index + 1}
                </span>
              )}
              <span
                className={cn(
                  'text-label-md font-medium',
                  state === 'upcoming' ? 'text-neutral-500' : 'text-neutral-900',
                )}
              >
                {step}
              </span>
            </span>
            {connector}
          </li>
        );
      })}
    </ol>
  );
};
