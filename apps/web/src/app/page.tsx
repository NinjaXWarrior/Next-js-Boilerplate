import { Badge } from '@repo/ui';
import { ArrowRight, Code2, LayoutGrid, Sparkles } from 'lucide-react';
import { LocalCounter } from '@/components/LocalCounter';

const features = [
  {
    title: 'Static content with constants',
    description:
      'Define page content in JavaScript constants and render it from reusable sections.',
    icon: Code2,
  },
  {
    title: 'Fast frontend experience',
    description: 'Build with Next.js and Tailwind CSS for responsive layouts and modern styling.',
    icon: Sparkles,
  },
  {
    title: 'Component-driven UI',
    description: 'Use Storybook to develop and preview UI components independently.',
    icon: LayoutGrid,
  },
];

const projects = [
  {
    title: 'Launch page',
    description: 'A clean marketing page for a new product, built with plain React and Tailwind.',
  },
  {
    title: 'Portfolio grid',
    description: 'Showcase images and case studies using data stored in constants.',
  },
  {
    title: 'Product dashboard',
    description: 'Create lightweight pages that feel dynamic without a backend.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <p className="text-sm tracking-[0.35em] text-sky-600 uppercase">
              Frontend-only starter
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
              Build a dynamic website with Tailwind, Lucide, and Storybook.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              All page content can come from constants and local state. No backend API is required
              for the first version.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                href="#features"
              >
                See features
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                href="#projects"
              >
                View projects
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm tracking-[0.35em] text-slate-500 uppercase">Local demo</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Interactive UI without a server
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This counter component works entirely in the browser and is perfect for prototyping
              client-side interactions.
            </p>
            <div className="mt-8">
              <LocalCounter />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-sky-600 uppercase">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Everything is built from the UI layer.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Use simple React components, local state, and constant data to iterate quickly and
              stay focused on the design.
            </p>
          </div>

          <div id="features" className="mt-10 grid gap-6 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-sky-300"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm tracking-[0.35em] text-sky-600 uppercase">Portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Example pages you can build.
            </h2>
          </div>
          <Badge variant="success">No API needed</Badge>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
