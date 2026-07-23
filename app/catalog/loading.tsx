import AppShell from "@/components/layout/AppShell";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <AppShell contentClassName="flex-1 px-[26px] py-[22px]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-2 h-3 w-24" />
        </div>
        <Skeleton className="h-9 w-64 rounded-md" />
      </div>
      <div className="grid grid-cols-3 gap-[14px] max-[900px]:grid-cols-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-s1 p-4">
            <div className="mb-3.5 flex items-start justify-between">
              <Skeleton className="h-[38px] w-[38px] rounded-[7px]" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
