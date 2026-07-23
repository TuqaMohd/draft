"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Laptop,
  Camera,
  Router,
  Monitor,
  Presentation,
  Mic,
  SlidersHorizontal,
  X,
  PackageSearch,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import FilterCheckbox from "@/components/ui/FilterCheckbox";
import AssetCard from "@/components/domain/AssetCard";
import SearchBar from "@/components/SearchBar";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { COMPANIES, COMPANY_SHORT_LABEL } from "@/lib/constants";

type Status = "available" | "reserved" | "borrowed" | "maintenance";

type Asset = {
  name: string;
  code: string;
  company: string;
  category: string;
  qty: number;
  status: Status;
  icon: React.ReactNode;
};

const assets: Asset[] = [
  { name: "MacBook Pro 14″ M3", code: "AST-0231", company: "Rihal", category: "Laptops", qty: 1, status: "available", icon: <Laptop size={18} /> },
  { name: "Sony A7 IV kit", code: "AST-0117", company: "Rihal", category: "Cameras", qty: 1, status: "reserved", icon: <Camera size={18} /> },
  { name: "Cisco access point", code: "AST-0342", company: "Codeline", category: "Networking", qty: 4, status: "borrowed", icon: <Router size={18} /> },
  { name: "Dell dock + monitor", code: "AST-0089", company: "Transformers Pioneers", category: "Peripherals", qty: 2, status: "maintenance", icon: <Monitor size={18} /> },
  { name: "Epson projector", code: "AST-0204", company: "Rihal", category: "Peripherals", qty: 1, status: "available", icon: <Presentation size={18} /> },
  { name: "Shure wireless mic set", code: "AST-0155", company: "Codeline", category: "Peripherals", qty: 3, status: "available", icon: <Mic size={18} /> },
];

const categories = ["Laptops", "Cameras", "Networking", "Peripherals"];
const statuses: { key: Status; label: string }[] = [
  { key: "available", label: "Available" },
  { key: "reserved", label: "Reserved" },
  { key: "borrowed", label: "Borrowed" },
  { key: "maintenance", label: "Maintenance" },
];

const tabs = ["Grid", "List", "By company"] as const;

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Grid");
  const [query, setQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep the catalog filters in sync with the URL — this is what makes the
  // header's search box and company switcher actually affect this page,
  // instead of just landing here with the filters untouched.
  useEffect(() => {
    const company = searchParams.get("company");
    if (company && (COMPANIES as readonly string[]).includes(company)) {
      setSelectedCompanies([company]);
    }
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const counts = useMemo(() => {
    const byCompany: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    for (const a of assets) {
      byCompany[a.company] = (byCompany[a.company] ?? 0) + 1;
      byCategory[a.category] = (byCategory[a.category] ?? 0) + 1;
      byStatus[a.status] = (byStatus[a.status] ?? 0) + 1;
    }
    return { byCompany, byCategory, byStatus };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      if (q && !`${a.name} ${a.code}`.toLowerCase().includes(q)) return false;
      if (selectedCompanies.length && !selectedCompanies.includes(a.company)) return false;
      if (selectedCategories.length && !selectedCategories.includes(a.category)) return false;
      if (selectedStatuses.length && !selectedStatuses.includes(a.status)) return false;
      return true;
    });
  }, [query, selectedCompanies, selectedCategories, selectedStatuses]);

  // Keys the stagger reveal below — changes only when the visible set of
  // assets actually changes, so switching Grid/List/By company or
  // adjusting a filter replays the reveal as confirmation, but re-renders
  // that don't change the result set don't needlessly restart it.
  const resultKey = useMemo(() => filtered.map((a) => a.code).join(","), [filtered]);

  const activeChips = [
    ...selectedCompanies.map((v) => ({ group: "company" as const, value: v, label: v })),
    ...selectedCategories.map((v) => ({ group: "category" as const, value: v, label: v })),
    ...selectedStatuses.map((v) => ({
      group: "status" as const,
      value: v,
      label: statuses.find((s) => s.key === v)?.label ?? v,
    })),
  ];

  const hasActiveFilters = activeChips.length > 0 || query.trim().length > 0;

  function removeChip(group: "company" | "category" | "status", value: string) {
    if (group === "company") setSelectedCompanies((prev) => prev.filter((v) => v !== value));
    if (group === "category") setSelectedCategories((prev) => prev.filter((v) => v !== value));
    if (group === "status") setSelectedStatuses((prev) => prev.filter((v) => v !== (value as Status)));
  }

  function clearAll() {
    setSelectedCompanies([]);
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setQuery("");
  }

  const filterPanel = (
    <div className="w-[240px] shrink-0 border-r border-border">
      <div className="flex items-center justify-between border-b border-border px-[18px] py-[15px]">
        <div className="flex items-center gap-2 font-head text-[13.5px] font-semibold">
          <SlidersHorizontal size={14} className="text-text-3" />
          Filters
        </div>
        {hasActiveFilters ? (
          <button onClick={clearAll} className="font-ui text-[12px] font-medium text-accent hover:underline">
            Clear all
          </button>
        ) : null}
      </div>

      <div className="px-[18px] py-[18px]">
        <h4 className="mb-1.5 mt-0 font-mono text-[11px] uppercase tracking-[0.07em] text-text-3">Company</h4>
        <div className="mb-5">
          {COMPANIES.map((c) => (
            <FilterCheckbox
              key={c}
              label={c}
              count={counts.byCompany[c] ?? 0}
              checked={selectedCompanies.includes(c)}
              onChange={() => setSelectedCompanies((prev) => toggle(prev, c))}
            />
          ))}
        </div>

        <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.07em] text-text-3">Category</h4>
        <div className="mb-5">
          {categories.map((c) => (
            <FilterCheckbox
              key={c}
              label={c}
              count={counts.byCategory[c] ?? 0}
              checked={selectedCategories.includes(c)}
              onChange={() => setSelectedCategories((prev) => toggle(prev, c))}
            />
          ))}
        </div>

        <h4 className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.07em] text-text-3">Status</h4>
        <div>
          {statuses.map((s) => (
            <FilterCheckbox
              key={s.key}
              label={s.label}
              count={counts.byStatus[s.key] ?? 0}
              checked={selectedStatuses.includes(s.key)}
              onChange={() => setSelectedStatuses((prev) => toggle(prev, s.key))}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AppShell
      sidebar={<div className="shrink-0 max-[860px]:hidden">{filterPanel}</div>}
      contentClassName="flex-1 px-[1.625rem] py-[1.375rem] max-[860px]:px-4 max-[860px]:py-4"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="m-0 font-head text-[19px] font-semibold">Asset catalog</h1>
          <p className="m-0 mt-0.5 text-[12.5px] text-text-3">
            {filtered.length} of {assets.length} assets
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex gap-1 rounded-[7px] border border-border bg-s1 p-[3px]">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`rounded-[5px] px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  tab === t ? "bg-s3 text-text" : "text-text-3 hover:text-text-2"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFiltersOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-border bg-s1 px-3 py-2 text-[13px] text-text-2 transition-colors hover:bg-s2 max-[860px]:flex"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeChips.length ? (
              <span className="rounded-full bg-accent-deep px-[6px] py-px font-mono text-[10.5px] text-accent">
                {activeChips.length}
              </span>
            ) : null}
          </button>

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Filter catalog…"
            ariaLabel="Filter catalog"
            className="w-[240px]"
          />
          <Button variant="primary" icon={<Plus size={16} />}>
            Add asset
          </Button>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <button
              key={`${chip.group}-${chip.value}`}
              onClick={() => removeChip(chip.group, chip.value)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-s1 px-3 py-1 text-[12px] text-text-2 transition-colors hover:border-border-strong hover:text-text"
            >
              {chip.label}
              <X size={12} />
            </button>
          ))}
          <button onClick={clearAll} className="text-[12px] font-medium text-accent hover:underline">
            Clear all
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No assets match your filters"
          description="Try removing a filter or clearing your search."
          action={
            <button onClick={clearAll} className="text-[13px] font-medium text-accent hover:underline">
              Clear all filters
            </button>
          }
        />
      ) : tab === "Grid" ? (
        <StaggerContainer
          key={`grid-${resultKey}`}
          className="grid grid-cols-3 gap-[14px] max-[900px]:grid-cols-1"
        >
          {filtered.map((a) => (
            <StaggerItem key={a.code}>
              <AssetCard {...a} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : tab === "List" ? (
        <StaggerContainer key={`list-${resultKey}`} className="overflow-hidden rounded-lg border border-border bg-s1">
          {filtered.map((a, i) => (
            <StaggerItem key={a.code}>
              <div
                className={`flex items-center gap-3 px-[18px] py-3 ${i !== filtered.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-s3 text-text-2">{a.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-medium">{a.name}</div>
                  <div className="mt-0.5 font-mono text-[11.5px] text-text-3">
                    {a.code} · {COMPANY_SHORT_LABEL[a.company as keyof typeof COMPANY_SHORT_LABEL] ?? a.company}
                  </div>
                </div>
                <span className="w-[110px] shrink-0 text-[12.5px] text-text-2 max-[700px]:hidden">{a.category}</span>
                <span className="w-[60px] shrink-0 text-[12.5px] text-text-2 max-[700px]:hidden">Qty {a.qty}</span>
                <Badge variant={a.status}>{a.status[0].toUpperCase() + a.status.slice(1)}</Badge>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="space-y-6">
          {COMPANIES.filter((c) => filtered.some((a) => a.company === c)).map((c) => (
            <div key={c}>
              <div className="mb-2.5 flex items-center gap-2">
                <h3 className="m-0 font-head text-[14px] font-semibold">{c}</h3>
                <span className="font-mono text-[11px] text-text-3">
                  {filtered.filter((a) => a.company === c).length} assets
                </span>
              </div>
              <StaggerContainer
                key={`company-${c}-${resultKey}`}
                className="grid grid-cols-3 gap-[14px] max-[900px]:grid-cols-1"
              >
                {filtered
                  .filter((a) => a.company === c)
                  .map((a) => (
                    <StaggerItem key={a.code}>
                      <AssetCard {...a} />
                    </StaggerItem>
                  ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      )}

      {filtersOpen && (
        <div className="fixed inset-0 z-50 hidden max-[860px]:flex">
          <div className="absolute inset-0 bg-overlay" onClick={() => setFiltersOpen(false)} />
          <div className="relative ml-auto h-full w-[280px] overflow-y-auto bg-canvas">
            <div className="flex items-center justify-between border-b border-border bg-s1 px-[18px] py-[15px]">
              <span className="font-head text-[13.5px] font-semibold">Filters</span>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="text-text-2">
                <X size={18} />
              </button>
            </div>
            {filterPanel}
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogContent />
    </Suspense>
  );
}
