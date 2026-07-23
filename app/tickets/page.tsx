import PlaceholderPage from "@/components/PlaceholderPage";
import { Wrench } from "lucide-react";

export default function TicketsPage() {
  return (
    <PlaceholderPage
      icon={Wrench}
      eyebrow="IT tickets"
      title="IT tickets"
      description="Track open, in-progress and resolved IT support tickets across the group."
      note="Ticket list will appear here — you can submit a new one from Report a fault."
    />
  );
}
