'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export const LocalCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.25em] text-sky-600 uppercase">
            Frontend demo
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Local state counter</h2>
          <p className="mt-1 text-sm text-slate-600">
            This counter works entirely in the browser using React state.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-2">
          <button
            className="rounded-full bg-slate-200 px-3 py-2 transition hover:bg-slate-300"
            type="button"
            onClick={() => {
              setCount((current) => current - 1);
            }}
            aria-label="Decrease count"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center text-xl font-bold text-slate-950">{count}</span>
          <button
            className="rounded-full bg-slate-200 px-3 py-2 transition hover:bg-slate-300"
            type="button"
            onClick={() => {
              setCount((current) => current + 1);
            }}
            aria-label="Increase count"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
