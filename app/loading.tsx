import AppShell from "@/components/layout/AppShell";
import { Skeleton, StatCardSkeleton, CardListSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <AppShell>
      <div className="mb-[22px] flex items-end justify-between gap-4">
        <div>
          <Skeleton className="h-5 w-52" />
          <Skeleton className="mt-2 h-3 w-72" />
        </div>
        <div className="flex gap-2.5">
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>

      <div className="mb-[26px] grid grid-cols-4 gap-[14px] max-[900px]:grid-cols-2">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-4 max-[900px]:grid-cols-1">
        <CardListSkeleton rows={4} />
        <CardListSkeleton rows={3} />
      </div>
    </AppShell>
  );
}
