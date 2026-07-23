"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

/**
 * Reveals children with a small stagger instead of everything popping
 * in at once. Intended for card grids and activity lists — anywhere a
 * fixed set of items renders together on mount or on filter change.
 *
 * Not used for anything that streams in over time or repeats on every
 * keystroke (e.g. live search results) — staggering those would make
 * the UI feel laggy rather than polished.
 */
export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={staggerContainer.initial}
      animate={staggerContainer.animate}
      variants={staggerContainer.variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem.variants}>
      {children}
    </motion.div>
  );
}
