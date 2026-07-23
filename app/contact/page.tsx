import PlaceholderPage from "@/components/PlaceholderPage";
import { Wrench } from "lucide-react";

export default function ContactPage() {
  return (
    <PlaceholderPage
      icon={Wrench}
      eyebrow="Support"
      title="Contact IT"
      description="Reach the IT support team directly for anything that doesn't fit a standard fault ticket."
      note="Contact details and live status will appear here."
    />
  );
}
