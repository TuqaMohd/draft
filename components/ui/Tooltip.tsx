"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { popIn } from "@/lib/motion";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <RadixTooltip.Provider delayDuration={300}>{children}</RadixTooltip.Provider>;
}

/**
 * Icon-only buttons (notifications, settings, theme toggle) had an
 * aria-label for screen readers but nothing a sighted mouse/keyboard
 * user could see to confirm what the icon does. This wraps a trigger
 * with a small visible label on hover/focus — sourced from the same
 * string as the aria-label, so the two can't drift apart.
 */
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content sideOffset={8} asChild>
          <motion.div
            initial={popIn.initial}
            animate={popIn.animate}
            transition={popIn.transition}
            className="z-30 rounded-md border border-border bg-s1 px-2.5 py-1.5 text-[12px] font-medium text-text shadow-md"
          >
            {label}
          </motion.div>
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
