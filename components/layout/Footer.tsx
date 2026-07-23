import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-s1 px-10 pb-[26px] pt-7">
      <div className="grid gap-8 pb-[26px] [grid-template-columns:1.4fr_repeat(3,1fr)] max-[700px]:[grid-template-columns:1fr_1fr]">
        <div>
          <Link
            href="/"
            className="mb-2.5 flex items-center gap-2.5 text-text no-underline"
            aria-label="Amanah — go to homepage"
          >
            <Image src="/amanah.jpg" alt="Amanah" width={22} height={26} className="rounded-[5px]" />
            <span className="font-head text-[15px] font-semibold tracking-[0.01em]">Amanah</span>
          </Link>
          <p className="m-0 max-w-[220px] text-[12.5px] leading-[1.7] text-text-2">
            The Group Operations Platform for shared assets across Rihal, Transformers Pioneers and Codeline.
          </p>
        </div>
        <div>
          <h5 className="mb-1.5 font-mono font-extrabold text-xs uppercase tracking-[0.06em] text-text-2">Platform</h5>
          <a href="/" className="mb-2.5 block text-[13px] text-text no-underline">Dashboard</a>
          <a href="/catalog" className="mb-2.5 block text-[13px] text-text no-underline">Catalog</a>
          <a href="/bookings" className="mb-2.5 block text-[13px] text-text no-underline">Bookings</a>
          <a href="/custody" className="mb-2.5 block text-[13px] text-text no-underline">Custody log</a>
        </div>
        <div>
          <h5 className="mb-1.5 font-mono font-extrabold text-xs uppercase tracking-[0.06em] text-text-2">Support</h5>
          <a href="/tickets/new" className="mb-2.5 block text-[13px] text-text no-underline">Submit a ticket</a>
          <a href="/approval-rules" className="mb-2.5 block text-[13px] text-text no-underline">Approval rules</a>
          <a href="/tickets/new" className="mb-2.5 block text-[13px] text-text no-underline">Report an asset issue</a>
          <a href="/contact" className="mb-2.5 block text-[13px] text-text no-underline">Contact IT Support</a>
        </div>
        <div>
          <h5 className="mb-1.5 font-mono font-extrabold text-xs uppercase tracking-[0.06em] text-text-2">Group</h5>
          <a href="#" className="mb-2.5 block text-[13px] text-text no-underline">Rihal</a>
          <a href="#" className="mb-2.5 block text-[13px] text-text no-underline">Transformers Pioneers</a>
          <a href="#" className="mb-2.5 block text-[13px] text-text no-underline">Codeline</a>
          <a href="/group" className="mb-2.5 block text-[13px] text-text no-underline">Group dashboard</a>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between border-t border-border text-xs text-text-2 p-1.5">
        <span>© Rihal Group · Amanah v1.0 </span>
      </div>
    </footer>
  );
}
