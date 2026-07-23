"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "@/lib/motion";

/**
 * Wraps <main> so navigating between pages gets a short fade + rise
 * instead of an abrupt content swap. Keyed by pathname so
 * AnimatePresence treats each route as a distinct element.
 *
 * Framer Motion's useReducedMotion already flips this to an instant,
 * non-animated swap for anyone with prefers-reduced-motion enabled —
 * on top of the global CSS rule in globals.css that shortens all
 * transition/animation durations for the same users.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
