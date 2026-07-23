import { Compass, LayoutDashboard, Boxes } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <AppShell contentClassName="flex flex-1 items-center justify-center px-8 py-7">
      <div className="max-w-[420px] text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-s3 text-text-2">
          <Compass size={26} />
        </div>
        <div className="mb-2 font-mono text-xs text-text-3">Error 404</div>
        <h1 className="m-0 mb-2 font-head text-[21px] font-semibold">Page not found</h1>
        <p className="m-0 mb-6 text-[13px] text-text-3">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Check the URL, or head back to
          somewhere useful below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button href="/" variant="primary" icon={<LayoutDashboard size={16} />}>
            Go to dashboard
          </Button>
          <Button href="/catalog" variant="secondary" icon={<Boxes size={16} />}>
            Browse catalog
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
