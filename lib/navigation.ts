import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Boxes,
  CalendarDays,
  ListChecks,
  Fingerprint,
  Wrench,
  BarChart3,
  Building2,
  User,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Shown as a numeric badge in the sidebar. Wire to real data later. */
  count?: number;
  /** Included in the compact bottom tab bar on small screens. */
  inBottomNav?: boolean;
  /** Included in the top utility nav inside the header. */
  inHeaderNav?: boolean;
  /** Included in the footer "Platform" / "Support" columns. */
  inFooter?: "platform" | "support" | false;
};

/**
 * Single source of truth for the app's primary navigation.
 * Header, Sidebar, BottomNav, Footer and the header search index
 * all derive from this instead of maintaining their own copies.
 */
export const primaryNav: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, inHeaderNav: true, inBottomNav: true, inFooter: "platform" },
  { href: "/catalog", label: "Catalog", icon: Boxes, inHeaderNav: true, inBottomNav: true, inFooter: "platform" },
  { href: "/bookings", label: "Bookings", icon: CalendarDays, count: 6, inHeaderNav: true, inBottomNav: true, inFooter: "platform" },
  { href: "/approvals", label: "Approvals", icon: ListChecks, count: 3 },
  { href: "/custody", label: "Custody", icon: Fingerprint, inFooter: "platform" },
  { href: "/tickets", label: "IT tickets", icon: Wrench, count: 2, inBottomNav: true },
];

export const reportingNav: NavItem[] = [
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/group", label: "Group overview", icon: Building2 },
];

export const supportNav: NavItem[] = [
  { href: "/tickets/new", label: "Report a fault", icon: Wrench, inHeaderNav: true, inFooter: "support" },
  { href: "/approval-rules", label: "Approval rules", icon: ListChecks, inFooter: "support" },
  { href: "/contact", label: "Contact IT", icon: Wrench, inFooter: "support" },
];

export const accountNav: NavItem[] = [
  { href: "/profile", label: "Profile", icon: User, inBottomNav: true },
];

export const allNav: NavItem[] = [...primaryNav, ...reportingNav, ...supportNav, ...accountNav];

export const headerNav = allNav.filter((item) => item.inHeaderNav);
export const bottomNav = allNav.filter((item) => item.inBottomNav);
export const footerPlatformLinks = allNav.filter((item) => item.inFooter === "platform");
export const footerSupportLinks = allNav.filter((item) => item.inFooter === "support");

/** Flat, searchable index for the header command/search box. */
export const searchIndex = allNav.map(({ href, label }) => ({ href, label }));
