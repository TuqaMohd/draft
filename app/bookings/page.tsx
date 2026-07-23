import PlaceholderPage from "@/components/PlaceholderPage";
import { CalendarDays } from "lucide-react";

export default function BookingsPage() {
  return (
    <PlaceholderPage
      icon={CalendarDays}
      eyebrow="Bookings"
      title="Bookings"
      description="Reserve shared assets and track upcoming and active bookings across Rihal, Transformers Pioneers and Codeline."
      note="Booking calendar and requests will appear here."
    />
  );
}
