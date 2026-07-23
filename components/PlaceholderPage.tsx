import type { LucideIcon } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

export default function PlaceholderPage({
  icon: Icon,
  eyebrow,
  title,
  description,
  note,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
}) {
  return (
    <AppShell>
      <PageHeader eyebrow={eyebrow} eyebrowIcon={Icon} title={title} description={description} />
      <EmptyState icon={Icon} title="This section is on the way" description={note} />
    </AppShell>
  );
}
