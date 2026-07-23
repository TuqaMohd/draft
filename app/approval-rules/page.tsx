import PlaceholderPage from "@/components/PlaceholderPage";
import { ListChecks } from "lucide-react";

export default function ApprovalRulesPage() {
  return (
    <PlaceholderPage
      icon={ListChecks}
      eyebrow="Support"
      title="Approval rules"
      description="Configure which bookings need approval, and who is responsible for approving them by company or category."
      note="Approval rule configuration will appear here."
    />
  );
}
