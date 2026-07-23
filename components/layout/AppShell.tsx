import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import PageTransition from "@/components/motion/PageTransition";

type AppShellProps = {
  children: ReactNode;
  /**
   * - omitted → the default primary Sidebar is shown (most pages)
   * - a node → replaces the sidebar with a custom panel (e.g. catalog's filters)
   * - null → no left panel at all, content spans full width (e.g. forms)
   */
  sidebar?: ReactNode | null;
  /** Overrides the default content padding, e.g. for full-bleed or centered form layouts. */
  contentClassName?: string;
};

export default function AppShell({ children, sidebar, contentClassName }: AppShellProps) {
  const sidebarNode = sidebar === null ? null : sidebar ?? <Sidebar />;

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header />
      <div className="flex flex-1">
        {sidebarNode}
        <main id="main-content" className={contentClassName ?? "flex-1 px-8 py-7"}>
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <BottomNav />
      <Footer />
    </div>
  );
}
