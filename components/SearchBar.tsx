"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { fieldContainerClasses, fieldInnerClasses } from "@/lib/styles";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  /** Show the ⌘K hint and bind the global ⌘K/Ctrl+K shortcut to this field. Defaults to false — only the primary/global search bar should set this to true. */
  enableShortcut?: boolean;
};

export default function SearchBar({
  value,
  onChange,
  onFocus,
  onKeyDown,
  onSubmit,
  placeholder = "Search…",
  ariaLabel,
  className,
  enableShortcut = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K jumps straight into the search field from anywhere.
  // Only wired up when explicitly enabled, so secondary search fields
  // (e.g. the catalog's "Filter catalog…" box) don't fight over the shortcut.
  useEffect(() => {
    if (!enableShortcut) return;
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [enableShortcut]);

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-[13.5px] text-text-3",
        fieldContainerClasses,
        className
      )}
    >
      <Search size={16} className="shrink-0 text-text-3" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={cn("w-full text-[13.5px] text-text font-[inherit] placeholder:text-text-3", fieldInnerClasses)}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="flex shrink-0 items-center justify-center rounded-full p-0.5 text-text-3 transition-colors hover:bg-s3 hover:text-text"
        >
          <X size={14} />
        </button>
      ) : enableShortcut ? (
        <kbd
          aria-hidden="true"
          className="hidden shrink-0 select-none items-center rounded border border-border bg-s1 px-1.5 py-0.5 font-mono text-[10.5px] text-text-3 sm:flex"
        >
          ⌘K
        </kbd>
      ) : null}
    </form>
  );
}