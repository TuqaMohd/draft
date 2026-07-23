import PlaceholderPage from "@/components/PlaceholderPage";
import { Fingerprint } from "lucide-react";

export default function CustodyPage() {
  return (
    <PlaceholderPage
      icon={Fingerprint}
      eyebrow="Custody"
      title="Custody log"
      description="See who currently holds each asset, overdue returns, and the full custody history."
      note="Custody records and overdue alerts will appear here."
    />
  );
}
