import '../src/global.css';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/iu,
        date: /Date$/iu,
      },
    },
    docs: {
      toc: true, // Enable table of contents
    },
    a11y: {
      test: 'todo', // Make a11y tests optional
    },
  },
  tags: ['autodocs'],
};

export default preview;
