"use client";

import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { popIn } from "@/lib/motion";

/**
 * Thin, typed wrapper around Radix's DropdownMenu instead of a full
 * shadcn/ui install: we only need Root/Trigger/Content/Item/Label, and
 * hand-rolling those keeps the dependency surface (and bundle size)
 * smaller than pulling in the whole shadcn component set for one menu.
 *
 * Radix supplies what the previous hand-written version in Header.tsx
 * had to reimplement manually: focus trapping, roving tabindex,
 * Escape-to-close, click-outside, and correct ARIA roles.
 */
export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixDropdownMenu.Portal>
    <RadixDropdownMenu.Content ref={ref} sideOffset={sideOffset} asChild {...props}>
      <motion.div
        initial={popIn.initial}
        animate={popIn.animate}
        transition={popIn.transition}
        className={cn(
          "z-20 min-w-[210px] overflow-hidden rounded-md border border-border bg-s1 shadow-lg",
          className
        )}
      >
        {props.children}
      </motion.div>
    </RadixDropdownMenu.Content>
  </RadixDropdownMenu.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Label>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Label
    ref={ref}
    className={cn("px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-text-3", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Item
    ref={ref}
    className={cn(
      "flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-[13px] text-text-2 outline-none transition-colors",
      "hover:bg-s2 hover:text-text focus-visible:bg-s2 focus-visible:text-text data-[highlighted]:bg-s2 data-[highlighted]:text-text",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Separator ref={ref} className={cn("border-t border-border", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
