import AppShell from "@/components/layout/AppShell";
import Hero from "@/components/ui/Hero";
import { Card, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import {
  Fingerprint,
  ListChecks,
  AlertTriangle,
  Wrench,
  Laptop,
  Camera,
  Router,
  Monitor,
  Plus,
} from "lucide-react";
export const dynamic = "force-dynamic";

function todayLabel(){
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

type ActivityRow = {
  icon: React.ReactNode;
  title: string;
  meta: string;
  status: { label: string; variant: "available" | "reserved" | "borrowed" | "maintenance" };
};

const recentBookings: ActivityRow[] = [
  {
    icon: <Laptop size={17} />,
    title: "MacBook Pro 14″ — for client demo",
    meta: "AST-0231 · Tuqa Al Hosni · 22–24 Jul",
    status: { label: "Pending", variant: "reserved" },
  },
  {
    icon: <Camera size={17} />,
    title: "Sony A7 IV kit — site shoot",
    meta: "AST-0117 · IT Team · 21–22 Jul",
    status: { label: "Approved", variant: "available" },
  },
  {
    icon: <Router size={17} />,
    title: "Cisco access point — Codeline office",
    meta: "AST-0342 · Sara Bakr · 20–27 Jul",
    status: { label: "Active", variant: "borrowed" },
  },
  {
    icon: <Monitor size={17} />,
    title: "Dell dock + monitor bundle",
    meta: "AST-0089 · Yousef Rashid · 18–19 Jul",
    status: { label: "Overdue", variant: "maintenance" },
  },
];

const custodyAlerts = [
  { icon: <AlertTriangle size={17} />, title: "Overdue — 2 days", meta: "AST-0089 · Dell dock bundle" },
  { icon: <AlertTriangle size={17} />, title: "Overdue — 1 day", meta: "AST-0204 · Projector" },
  { icon: <Wrench size={17} />, title: "Ticket escalated", meta: "TCK-0042 · Keyboard fault" },
];

export default function HomePage() {
  return (
    <AppShell>
      <Hero
        title="Good morning, Tuqa"
        description={`Rihal · ${todayLabel()} — 4 bookings today, 3 approvals waiting.`}
        actions={
          <>
            <Button href="/tickets/new" variant="secondary" icon={<Wrench size={16} />}>
              Report a fault
            </Button>
            <Button href="/bookings" variant="primary" icon={<Plus size={16} />}>
              New booking
            </Button>
          </>
        }
      />

      <StaggerContainer className="mb-[26px] grid grid-cols-4 gap-[14px] max-[900px]:grid-cols-2">
        <StaggerItem>
          <StatCard label="Assets in custody" value={142} delta="+6 this week" icon={<Fingerprint size={16} />} />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Pending approvals" value={3} delta="2 overdue >24h" down icon={<ListChecks size={16} />} />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Overdue returns" value={5} delta="across 3 companies" down icon={<AlertTriangle size={16} />} />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Open IT tickets" value={9} delta="4 in progress" icon={<Wrench size={16} />} />
        </StaggerItem>
      </StaggerContainer>

      <div className="grid grid-cols-[1.5fr_1fr] gap-4 max-[900px]:grid-cols-1">
        <Card>
          <CardHeader
            title="Recent bookings"
            action={
              <a href="/bookings" className="text-[12.5px] text-text-2 transition-colors hover:text-text">
                View all →
              </a>
            }
          />
          <StaggerContainer>
            {recentBookings.map((row, i) => (
              <StaggerItem key={row.title}>
                <div
                  className={`flex items-center gap-3 px-[18px] py-3 ${
                    i !== recentBookings.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md bg-s3 text-text-2">
                    {row.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-medium">{row.title}</div>
                    <div className="mt-0.5 font-mono text-xs text-text-3">{row.meta}</div>
                  </div>
                  <Badge variant={row.status.variant}>{row.status.label}</Badge>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Card>

        <Card>
          <CardHeader
            title="Custody alerts"
            action={
              <a href="/custody" className="text-[12.5px] text-text-2 transition-colors hover:text-text">
                Resolve
              </a>
            }
          />
          <StaggerContainer>
            {custodyAlerts.map((row, i) => (
              <StaggerItem key={row.title}>
                <div
                  className={`flex items-center gap-3 px-[18px] py-3 ${
                    i !== custodyAlerts.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md bg-s3 text-text-2">
                    {row.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-medium">{row.title}</div>
                    <div className="mt-0.5 font-mono text-xs text-text-3">{row.meta}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Card>
      </div>
    </AppShell>
  );
}
