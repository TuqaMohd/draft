/**
 * Shared focus/hover treatment for text inputs and textareas.
 *
 * No hard default outline, no static border color jump — the border and
 * ring animate in together over 300ms using the brand accent color.
 * Apply directly to a standalone <input>/<textarea>. For an input that's
 * wrapped in a pill (icon + input, like search), use
 * `fieldContainerClasses` on the wrapper and `fieldInnerClasses` on the
 * input itself instead.
 */
export const fieldClasses =
  "border border-border bg-s2 text-text outline-none ring-0 transition-all duration-300 " +
  "hover:border-brand-accent/60 " +
  "focus:outline-none focus:ring-0 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15";

/** Wrapper (pill) for an input preceded/followed by icons or buttons. */
export const fieldContainerClasses =
  "border border-border bg-s2 outline-none ring-0 transition-all duration-300 " +
  "hover:border-brand-accent/60 " +
  "focus-within:border-brand-accent focus-within:ring-4 focus-within:ring-brand-accent/15";

/** The <input> inside a fieldContainerClasses wrapper — no border/ring of its own. */
export const fieldInnerClasses = "border-none bg-transparent outline-none ring-0 focus:outline-none focus:ring-0";
