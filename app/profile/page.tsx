import PlaceholderPage from "@/components/PlaceholderPage";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <PlaceholderPage
      icon={User}
      eyebrow="Profile"
      title="Your profile"
      description="Manage your account details, notification preferences and assets currently in your custody."
      note="Profile settings will appear here."
    />
  );
}
