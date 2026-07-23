import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        canvas: "var(--canvas)",
        s1: "var(--s1)",
        s2: "var(--s2)",
        s3: "var(--s3)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        accent: "var(--accent)",
        "accent-deep": "var(--accent-deep)",
        "accent-ink": "var(--accent-ink)",
        "accent-fg": "var(--accent-fg)",
        amber: "var(--amber)",
        "amber-deep": "var(--amber-deep)",
        "amber-fg": "var(--amber-fg)",
        coral: "var(--coral)",
        "coral-deep": "var(--coral-deep)",
        "coral-fg": "var(--coral-fg)",
        violet: "var(--violet)",
        "violet-deep": "var(--violet-deep)",
        "violet-fg": "var(--violet-fg)",
        overlay: "var(--overlay)",
        "brand-primary": "var(--brand-primary)",
        "brand-accent": "var(--brand-accent)",
      },
      fontFamily: {
        sans: ["var(--font-ui)", "sans-serif"],
        ui: ["var(--font-ui)", "sans-serif"],
        head: ["var(--font-head)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "10px",
        xl: "14px",
      },
      boxShadow: {
        sm: "0 1px 2px hsl(var(--shadow-color) / 0.06)",
        md: "0 4px 16px -6px hsl(var(--shadow-color) / 0.35)",
        lg: "0 12px 32px -8px hsl(var(--shadow-color) / 0.4)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
