"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Settings, Search, ChevronDown, Check } from "lucide-react";
import { headerNav, searchIndex } from "@/lib/navigation";
import { COMPANIES } from "@/lib/constants";
import { popIn } from "@/lib/motion";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [tenant, setTenant] = useState<string>(COMPANIES[0]);

  // `Header` is re-mounted on every page navigation (AppShell is rendered
  // per-page, not as a persistent layout), so plain useState alone would
  // reset back to the default each time. Restore the last selection from
  // the URL (if this is a deep link) or localStorage on mount instead.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("company");
    const stored = window.localStorage.getItem("amanah-tenant");
    const initial = fromUrl ?? stored;
    if (initial && (COMPANIES as readonly string[]).includes(initial)) {
      setTenant(initial);
    }
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((p) => p.label.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  // The search box is a live-filtered combobox, not a menu of fixed
  // actions, so it isn't a natural fit for Radix's DropdownMenu (built
  // for a button that reveals a static action list). It keeps its own
  // open/close handling below; the tenant switcher next to it *is* a
  // fixed action list, so that one uses DropdownMenu.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function goTo(href: string) {
    setSearchOpen(false);
    setQuery("");
    router.push(href);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return router.push("/catalog");
    const exact = searchIndex.find((p) => p.label.toLowerCase() === q.toLowerCase());
    const partial = matches[0];
    if (exact) return goTo(exact.href);
    if (partial) return goTo(partial.href);
    goTo(`/catalog?q=${encodeURIComponent(q)}`);
  }

  function selectTenant(value: string) {
    setTenant(value);
    window.localStorage.setItem("amanah-tenant", value);
    router.push(`/catalog?company=${encodeURIComponent(value)}`);
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-5 border-b border-border bg-s1 px-7 max-[860px]:px-5 max-[480px]:px-4">
      <div className="flex min-w-0 items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-text no-underline" aria-label="Amanah — go to homepage">
          <Image src="/amanah.jpg" alt="" width={22} height={26} className="rounded-[5px]" />
          <span className="font-head text-[15px] font-semibold tracking-[0.01em]">Amanah</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 max-[1080px]:hidden">
          {headerNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-[13.5px] font-medium no-underline transition-colors hover:bg-s2 hover:text-text ${
                  active ? "bg-s2 text-text" : "text-text-2"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="group flex items-center gap-1.5 rounded-full border border-border bg-s2 py-1.5 pl-2 pr-3 text-[13px] text-text-2 outline-none transition-colors hover:border-border-strong hover:text-text data-[state=open]:border-border-strong data-[state=open]:text-text"
            >
              <span className="h-[7px] w-[7px] rounded-full bg-accent" aria-hidden="true" />
              {tenant}
              <ChevronDown size={14} className="transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[210px]">
            <DropdownMenuLabel>Switch company</DropdownMenuLabel>
            {COMPANIES.map((c) => (
              <DropdownMenuItem key={c} onSelect={() => selectTenant(c)}>
                <span className="flex items-center gap-2">
                  <span className="h-[7px] w-[7px] rounded-full bg-accent" aria-hidden="true" />
                  {c}
                </span>
                {c === tenant ? <Check size={14} className="text-accent" /> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-[280px] shrink max-[720px]:hidden" ref={searchRef}>
        <SearchBar
          value={query}
          onChange={setQuery}
          onFocus={() => setSearchOpen(true)}
          onSubmit={handleSearch}
          placeholder="Type to search..."
          ariaLabel="Type to search..."
          enableShortcut
        />

        {searchOpen && query.trim() && (
          <motion.div
            initial={popIn.initial}
            animate={popIn.animate}
            transition={popIn.transition}
            className="absolute left-0 top-[calc(100%+6px)] z-20 w-full overflow-hidden rounded-md border border-border bg-s1 shadow-lg"
          >
            {matches.length > 0 ? (
              <>
                <div className="px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-text-3">Pages</div>
                {matches.map((m) => (
                  <button
                    key={m.href}
                    onClick={() => goTo(m.href)}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-text-2 transition-colors hover:bg-s2 hover:text-text"
                  >
                    {m.label}
                  </button>
                ))}
                <div className="border-t border-border" />
              </>
            ) : null}
            <button
              onClick={() => goTo(`/catalog?q=${encodeURIComponent(query.trim())}`)}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-text-2 transition-colors hover:bg-s2 hover:text-text"
            >
              <Search size={13} className="text-text-3" />
              Search catalog for &ldquo;{query.trim()}&rdquo;
            </button>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Tooltip label="Toggle theme">
          <span>
            <ThemeToggle />
          </span>
        </Tooltip>
        <Tooltip label="Notifications">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-transparent text-text-2 transition-colors hover:border-border hover:text-text"
          >
            <Bell size={18} />
          </button>
        </Tooltip>
        <Tooltip label="Settings">
          <button
            type="button"
            aria-label="Settings"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-transparent text-text-2 transition-colors hover:border-border hover:text-text"
          >
            <Settings size={18} />
          </button>
        </Tooltip>
        <div
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-deep font-head text-[12px] font-semibold text-violet-fg"
          aria-label="Signed in user"
        >
          TM
        </div>
      </div>
    </header>
  );
}
