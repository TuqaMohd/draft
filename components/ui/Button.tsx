"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * cva() replaces the old `Record<Variant, string>` lookup objects.
 * Functionally similar, but it's the pattern the rest of the industry
 * (shadcn/ui, Vercel's own component libraries) standardizes on, which
 * means variants are typed, composable, and get autocomplete — and
 * adding a new variant later is one line here instead of a matching
 * edit in every place a lookup object like that existed.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[7px] rounded-md font-ui font-medium no-underline transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-accent bg-accent text-accent-ink hover:bg-accent/90",
        secondary: "border border-border-strong bg-transparent text-text hover:bg-s2",
        ghost: "border border-transparent text-text-2 hover:bg-s2 hover:text-text",
        danger: "border border-coral bg-coral text-canvas hover:bg-coral/90",
      },
      size: {
        sm: "px-3 py-[7px] text-[12.5px]",
        md: "px-4 py-[9px] text-[13.5px]",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  }
);

const MotionLink = motion.create(Link);

type CommonProps = VariantProps<typeof buttonVariants> & {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
  > & { href?: undefined };

type ButtonAsLink = CommonProps & { href: string; target?: string };

/**
 * The `whileTap` scale is the one animation every button gets — a
 * 150ms 3% shrink that confirms the click registered. It's deliberately
 * the same across every variant/size so pressing any button in the app
 * feels identical, rather than each screen inventing its own feedback.
 */
export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant, size, icon, children, className } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    return (
      <MotionLink href={props.href} target={props.target} className={classes} whileTap={{ scale: 0.97 }}>
        {icon}
        {children}
      </MotionLink>
    );
  }

  const { href: _href, variant: _v, size: _s, icon: _icon, className: _c, ...buttonProps } = props as ButtonAsButton;
  return (
    <motion.button type="button" whileTap={{ scale: 0.97 }} className={classes} {...buttonProps}>
      {icon}
      {children}
    </motion.button>
  );
}
