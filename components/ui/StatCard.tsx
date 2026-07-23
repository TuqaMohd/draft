export default function StatCard({
  label,
  value,
  delta,
  down,
  icon,
}: {
  label: string;
  value: string | number;
  delta: string;
  down?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-lg border border-border border-t-2 border-t-border-strong/50 bg-s1 p-[16px_18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-md">
      <div className="flex items-center justify-between text-[12px] text-text-3">
        {label}
        <span className="transition-transform duration-300 group-hover:rotate-3 group-hover:text-brand-accent">
          {icon}
        </span>
      </div>
      <div className="mt-2 font-head text-[26px] font-semibold">{value}</div>
      <div className={`mt-1 text-[11.5px] ${down ? "text-coral" : "text-accent"}`}>{delta}</div>
    </div>
  );
}
