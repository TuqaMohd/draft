import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import PageTransition from "@/components/motion/PageTransition";

type AppShellProps = {
  children: ReactNode;

  sidebar?: ReactNode | null;
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
        <main id="main-content" className={contentClassName ?? "flex-1 px-8 py-7 max-[860px]:px-5 max-[480px]:px-4 max-[480px]:py-4"}>
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <BottomNav />
      <Footer />
    </div>
  );
}
