import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={`flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-s1 p-8 text-center ${className}`}
    >
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-s3 text-text-2">
        <Icon size={20} />
      </div>
      <p className="m-0 text-sm font-medium text-text">{title}</p>
      {description ? <p className="m-0 mt-1.5 max-w-[320px] text-[12.5px] text-text-3">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
