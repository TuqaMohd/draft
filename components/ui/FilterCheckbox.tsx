"use client";

import { Check } from "lucide-react";

export default function FilterCheckbox({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <label className="-mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-[7px] hover:bg-s2">
      <span className="flex items-center gap-2.5">
        <span
          className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-100 ${
            checked ? "border-accent bg-accent" : "border-border-strong bg-s2"
          }`}
        >
          <Check
            size={10}
            strokeWidth={3.5}
            className={`text-accent-ink transition-opacity duration-100 ${checked ? "opacity-100" : "opacity-0"}`}
          />
        </span>
        <span className={`text-[13px] transition-colors ${checked ? "text-text" : "text-text-2"}`}>{label}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {typeof count === "number" ? (
        <span
          className={`min-w-[20px] rounded-full px-[6px] py-px text-center font-mono text-[10.5px] ${
            checked ? "bg-accent-deep text-accent" : "bg-s2 text-text-3"
          }`}
        >
          {count}
        </span>
      ) : null}
    </label>
  );
}
