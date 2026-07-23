"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, reportingNav } from "@/lib/navigation";

function navItemClasses(active: boolean) {
  return `flex items-center gap-[11px] rounded-md px-2.5 py-[9px] text-[13.5px] font-medium no-underline transition-colors [&_svg]:shrink-0 ${
    active ? "bg-accent-deep text-accent-fg" : "text-text-2 hover:bg-s2 hover:text-text"
  }`;
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sections"
      className="flex w-[230px] shrink-0 flex-col gap-0.5 border-r border-border bg-s1 px-3.5 py-5 max-[860px]:hidden"
    >
      {primaryNav.map(({ href, label, icon: Icon, count }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined} className={navItemClasses(active)}>
            <Icon size={18} />
            {label}
            {count ? (
              <span
                className={`ml-auto rounded-full px-[7px] py-px font-mono text-[11px] ${
                  active ? "bg-accent-ink text-accent" : "bg-s3 text-text-2"
                }`}
              >
                {count}
              </span>
            ) : null}
          </Link>
        );
      })}
      <div className="px-2.5 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-text-3">Reporting</div>
      {reportingNav.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={navItemClasses(pathname === href)}>
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
