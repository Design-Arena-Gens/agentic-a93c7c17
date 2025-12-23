import { PropsWithChildren } from "react";

type SectionCardProps = PropsWithChildren<{
  title: string;
  eyebrow?: string;
}>;

export function SectionCard({ title, eyebrow, children }: SectionCardProps) {
  return (
    <section className="glass rounded-3xl p-6 shadow-card transition hover:shadow-[0_25px_55px_-25px_rgba(255,79,100,0.7)]">
      <header className="mb-4">
        {eyebrow ? <p className="text-ember text-sm uppercase tracking-[0.4em] font-semibold mb-1">{eyebrow}</p> : null}
        <h2 className="font-display text-2xl tracking-wide text-white">{title}</h2>
      </header>
      <div className="space-y-3 text-base text-neutral-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
