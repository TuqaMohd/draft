"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Monitor, ChevronDown, Upload, Send } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { duration, ease } from "@/lib/motion";
import { fieldClasses } from "@/lib/styles";
import { cn } from "@/lib/cn";

const severities = [
  { key: "low", label: "Low — still usable" },
  { key: "medium", label: "Medium — limited use" },
  { key: "high", label: "High — unusable" },
];

const inputClasses = cn("w-full rounded-md px-3 py-2.5 font-ui text-[13.5px]", fieldClasses);

export default function NewTicketPage() {
  const [severity, setSeverity] = useState("low");

  return (
    <AppShell contentClassName="flex-1 bg-s2 px-8 py-9">
      <div className="mx-auto max-w-[640px]">
        <PageHeader
          eyebrow="IT support · new ticket"
          eyebrowIcon={Wrench}
          title="Report a fault"
          description="Linking a ticket to an asset automatically moves it into maintenance until the ticket is resolved."
        />

        <Card className="px-[30px] py-7">
          <div className="mb-[18px]">
            <label className="mb-[7px] block text-[12.5px] font-medium text-text-2">Asset</label>
            <div className="flex items-center gap-3 rounded-md border border-border bg-s2 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-s3 text-text-2">
                <Monitor size={17} />
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-medium">Dell dock + monitor bundle</div>
                <div className="font-mono text-[11.5px] text-text-3">AST-0089 · currently in your custody</div>
              </div>
              <ChevronDown size={16} className="text-text-3" />
            </div>
          </div>

          <div className="mb-[18px]">
            <label htmlFor="fault-category" className="mb-[7px] block text-[12.5px] font-medium text-text-2">
              Fault category
            </label>
            <select id="fault-category" defaultValue="hardware-off" className={inputClasses}>
              <option value="hardware-off">Hardware — not powering on</option>
              <option value="hardware-damage">Hardware — physical damage</option>
              <option value="peripheral">Peripheral — dock or cable fault</option>
              <option value="software">Software or configuration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <fieldset className="mb-[18px]">
            <legend className="mb-[7px] text-[12.5px] font-medium text-text-2">Severity</legend>
            <div className="flex gap-2">
              {severities.map((s) => {
                const active = severity === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSeverity(s.key)}
                    className={`relative flex-1 rounded-md border py-[9px] text-center font-ui text-[12.5px] transition-colors ${
                      active ? "border-accent text-accent" : "border-border text-text-2 hover:border-border-strong"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="severity-pill"
                        className="absolute inset-0 -z-10 rounded-md bg-accent-deep"
                        transition={{ duration: duration.fast, ease: ease.out }}
                      />
                    ) : null}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mb-[18px]">
            <label htmlFor="fault-description" className="mb-[7px] block text-[12.5px] font-medium text-text-2">
              Describe the issue
            </label>
            <textarea
              id="fault-description"
              placeholder="What happened, and when did you first notice it?"
              className={`${inputClasses} min-h-[84px] resize-y`}
            />
            <div className="mt-1.5 text-[11.5px] text-text-3">
              Include any error messages or recent changes — it speeds up triage.
            </div>
          </div>

          <div className="mb-[18px]">
            <label className="mb-[7px] block text-[12.5px] font-medium text-text-2">Attach a photo (optional)</label>
            <div className="rounded-md border border-dashed border-border-strong p-[18px] text-center text-[12.5px] text-text-3">
              <Upload size={18} className="mx-auto mb-1.5 block" />
              Drop an image or click to upload
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2.5">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary" icon={<Send size={16} />}>
              Submit ticket
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
