/**
 * One motion language for the whole app. Every animated component pulls
 * from here instead of inventing its own duration/easing, the same way
 * every color pulls from the CSS variables in globals.css.
 *
 * Durations are deliberately short (120–200ms) and easing is a gentle
 * "ease-out" curve, not a bouncy spring — this is an internal ops tool,
 * not a marketing site. Motion should confirm what just happened, then
 * get out of the way.
 */
export const duration = {
  fast: 0.12,
  base: 0.18,
  slow: 0.28,
} as const;

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

/** Small popovers, dropdown menus, tooltips. */
export const popIn = {
  initial: { opacity: 0, scale: 0.97, y: -4 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: duration.fast, ease: ease.out },
};

/** Page-level content swap on route change. */
export const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: duration.base, ease: ease.out },
};

/** Container for staggered list/grid reveals. */
export const staggerContainer = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.035 },
    },
  },
};

/** Individual item inside a staggerContainer. */
export const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
  },
};
