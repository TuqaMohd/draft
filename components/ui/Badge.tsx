import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-[9px] py-[3px] font-ui text-[11.5px] font-medium",
  {
    variants: {
      variant: {
        available: "bg-accent-deep text-accent-fg",
        reserved: "bg-amber-deep text-amber-fg",
        borrowed: "border border-border-strong bg-s3 text-text-2",
        maintenance: "bg-coral-deep text-coral-fg",
      },
    },
    defaultVariants: { variant: "available" },
  }
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ variant, children, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
