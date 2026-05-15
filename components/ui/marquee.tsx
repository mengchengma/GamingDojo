"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: React.ReactNode;
}

export function Marquee({ items, className, separator }: MarqueeProps) {
  const sep = separator ?? (
    <span className="inline-block size-1.5 rounded-full bg-hachimaki" />
  );

  const content = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-bone/70 whitespace-nowrap">
            {item}
          </span>
          {sep}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "overflow-hidden border-y border-ash bg-shadow py-4",
        className,
      )}
    >
      <div className="flex w-max animate-marquee">
        {content}
        {content}
      </div>
    </div>
  );
}
