import PlaceholderPage from "@/components/PlaceholderPage";
import { ListChecks } from "lucide-react";

export default function ApprovalsPage() {
  return (
    <PlaceholderPage
      icon={ListChecks}
      eyebrow="Approvals"
      title="Approvals"
      description="Review and approve pending booking requests before assets are released to a custodian."
      note="Pending approval requests will appear here."
    />
  );
}
