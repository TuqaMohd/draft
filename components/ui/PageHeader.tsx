import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <div className="mb-2 flex items-center gap-2 font-mono text-xs text-text-3">
            {EyebrowIcon ? <EyebrowIcon size={14} /> : null}
            {eyebrow}
          </div>
        ) : null}
        <h1 className="m-0 mb-1 font-head text-[21px] font-semibold">{title}</h1>
        {description ? <p className="m-0 max-w-[560px] text-[13px] text-text-3">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
