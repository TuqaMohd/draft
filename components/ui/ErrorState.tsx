import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

export default function ErrorState({
  title = "Something went wrong",
  description = "That request failed. Try again, and contact IT if it keeps happening.",
  action,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-coral/40 bg-coral-deep/30 p-8 text-center ${className}`}
    >
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-coral-deep text-coral-fg">
        <AlertTriangle size={20} />
      </div>
      <p className="m-0 text-sm font-medium text-text">{title}</p>
      <p className="m-0 mt-1.5 max-w-[320px] text-[12.5px] text-text-3">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
