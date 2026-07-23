import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export default function Hero({
  title,
  description,
  actions,
}: {
  badge?: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="relative mb-[26px] overflow-hidden rounded-xl border border-border bg-s1 px-8 py-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-[hero-blob-drift_11s_ease-in-out_infinite] rounded-full bg-brand-accent/25 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 animate-[hero-blob-drift_13s_ease-in-out_infinite] rounded-full bg-brand-primary/20 blur-[90px]"
      />

      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <h1 className="m-0 mb-2 bg-gradient-to-r from-brand-primary via-brand-accent to-sky-400 bg-clip-text font-head text-[28px] font-semibold leading-tight text-transparent">
            {title}
          </h1>
          {description ? <p className="m-0 text-[13.5px] text-text-3">{description}</p> : null}
        </div>
        {actions ? <div className="relative flex flex-wrap gap-2.5">{actions}</div> : null}
      </div>
    </div>
  );
}
