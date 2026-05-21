import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Optional — only set on sections that have a matching nav link. */
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-4 font-mono text-xs text-muted">
        {index && <span className="text-hachimaki">{index}</span>}
        <span className="h-px flex-1 max-w-12 bg-ash" />
        <span className="uppercase tracking-[0.32em]">{eyebrow}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
        {title}
      </h2>
    </div>
  );
}
