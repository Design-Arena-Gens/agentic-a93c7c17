"use client";

import { useState, useTransition } from "react";
import type { HorrorIntel } from "@/lib/horrorData";
import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type IntelBoardProps = {
  initialData: HorrorIntel;
};

export function IntelBoard({ initialData }: IntelBoardProps) {
  const [intel, setIntel] = useState(initialData);
  const [dayOffset, setDayOffset] = useState(0);
  const [isPending, startTransition] = useTransition();

  const refresh = (nextOffset: number) => {
    startTransition(async () => {
      const response = await fetch(`/api/refresh?dayOffset=${nextOffset}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        return;
      }
      const json = await response.json();
      setIntel(json.data as HorrorIntel);
      setDayOffset(nextOffset);
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.6em] text-neutral-400">USA HORROR TREND SIGNALS</p>
          <h1 className="font-display text-4xl md:text-5xl text-white drop-shadow-sm">{intel.topic}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            onClick={() => refresh(dayOffset - 1)}
            disabled={isPending}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Prev Day
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            onClick={() => refresh(0)}
            disabled={isPending}
          >
            <ArrowPathIcon className={`h-5 w-5 ${isPending ? "animate-spin" : ""}`} />
            Today
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            onClick={() => refresh(dayOffset + 1)}
            disabled={isPending}
          >
            Next Day
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <section className="glass rounded-3xl p-6 shadow-card">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl text-white">Keyword Arsenal</h2>
            <span className="text-xs uppercase tracking-[0.5em] text-ember">10 Viral Picks</span>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2">
            {intel.keywords.map((keyword) => (
              <li
                key={keyword}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 shadow-inner"
              >
                {keyword}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass rounded-3xl p-6 shadow-card">
          <header className="mb-4">
            <h2 className="font-display text-3xl text-white">Trending Hashtags</h2>
            <p className="text-sm text-neutral-300">Designed for Shorts, Longform, and Community tabs.</p>
          </header>
          <ul className="flex flex-wrap gap-3">
            {intel.hashtags.map((tag) => (
              <li key={tag} className="rounded-full border border-ember/40 bg-ember/20 px-4 py-2 text-sm font-semibold text-ember">
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="card-grid">
        <section className="glass rounded-3xl p-6 shadow-card">
          <header className="mb-4">
            <h2 className="font-display text-3xl text-white">Click-Worthy Titles</h2>
            <p className="text-sm text-neutral-300">Crafted for high CTR from Search, Suggested, and Browse.</p>
          </header>
          <ol className="space-y-4">
            {intel.titles.map((title, index) => (
              <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-xs uppercase tracking-[0.6em] text-neutral-400">Title {index + 1}</span>
                <p className="mt-2 text-lg font-semibold text-white">{title}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="glass rounded-3xl p-6 shadow-card">
          <header className="mb-4">
            <h2 className="font-display text-3xl text-white">SEO Tag Vault</h2>
            <p className="text-sm text-neutral-300">Blend across YouTube search intent layers.</p>
          </header>
          <ul className="flex flex-wrap gap-2">
            {intel.tags.map((tag) => (
              <li key={tag} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200">
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass rounded-3xl p-6 shadow-card">
        <header className="mb-4">
          <h2 className="font-display text-3xl text-white">Description Blueprint</h2>
          <p className="text-sm text-neutral-300">150-200 words tuned for watch time + CTR.</p>
        </header>
        <pre className="whitespace-pre-wrap break-words text-neutral-100 text-base leading-relaxed">
          {intel.description}
        </pre>
      </section>
    </div>
  );
}
