import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border border-t-2 border-t-border-strong/50 bg-s1", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action }: { title: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-[18px] py-[15px]">
      <h3 className="m-0 font-head text-sm font-medium">{title}</h3>
      {action}
    </div>
  );
}
