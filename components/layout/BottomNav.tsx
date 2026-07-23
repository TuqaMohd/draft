"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNav } from "@/lib/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary, compact"
      className="hidden border-t border-border bg-s1 max-[860px]:sticky max-[860px]:bottom-0 max-[860px]:z-10 max-[860px]:flex"
    >
      {bottomNav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] no-underline transition-colors ${
              active ? "text-accent" : "text-text-3 hover:text-text-2"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
