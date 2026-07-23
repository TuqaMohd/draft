"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { duration, ease } from "@/lib/motion";

type Status = "available" | "reserved" | "borrowed" | "maintenance";

const statusLabel: Record<Status, string> = {
  available: "Available",
  reserved: "Reserved",
  borrowed: "Borrowed",
  maintenance: "Maintenance",
};

export default function AssetCard({
  name,
  code,
  company,
  category,
  qty,
  status,
  icon,
}: {
  name: string;
  code: string;
  company: string;
  category: string;
  qty: number;
  status: Status;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: duration.fast, ease: ease.out }}
      className="group relative rounded-lg border border-border border-t-2 border-t-border-strong/50 bg-s1 p-4 transition-colors duration-150
      hover:border-border-strong hover:shadow-md
      after:absolute after:right-0 after:top-4 after:h-3 after:w-3 after:translate-x-1/2
      after:rounded-full after:border after:border-border after:bg-canvas after:content-['']
      after:transition-colors after:duration-150 group-hover:after:border-border-strong"
    >
      <div className="mb-3.5 flex items-start justify-between">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[7px] bg-s3 text-text-2 transition-transform duration-300 group-hover:rotate-3">
          {icon}
        </div>
        <Badge variant={status}>{statusLabel[status]}</Badge>
      </div>
      <div className="mb-[3px] text-sm font-medium">{name}</div>
      <div className="font-mono text-[11.5px] text-text-3">
        {code} · {company}
      </div>
      <div className="mt-3.5 flex items-center justify-between border-t border-dashed border-border-strong pt-3 text-xs text-text-2">
        <span>{category}</span>
        <span>Qty {qty}</span>
      </div>
    </motion.div>
  );
}
