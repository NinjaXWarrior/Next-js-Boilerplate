import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Register the theme.css font-size tokens so twMerge treats text-label-*/text-h*
// as font sizes, not text colors (otherwise they wrongly override text-white etc.).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['label-xs', 'label-sm', 'label-md', 'label-lg', 'h1', 'h2', 'h3', 'h4', 'h5'] },
      ],
    },
  },
});

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
