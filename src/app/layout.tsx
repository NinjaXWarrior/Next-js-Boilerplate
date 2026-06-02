import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Frontend Boilerplate',
  description: 'A clean frontend starter with Tailwind CSS, Next.js, and Storybook.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
