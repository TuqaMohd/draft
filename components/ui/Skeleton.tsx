export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-s3 ${className}`} aria-hidden="true" />;
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-s1 p-[16px_18px]">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="mt-3 h-6 w-1/3" />
      <Skeleton className="mt-2 h-3 w-1/2" />
    </div>
  );
}

export function CardListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-border bg-s1">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-[18px] py-3 ${i !== rows - 1 ? "border-b border-border" : ""}`}
        >
          <Skeleton className="h-[34px] w-[34px] shrink-0 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="mt-2 h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
