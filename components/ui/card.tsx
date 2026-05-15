import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-lg border border-ash bg-panel/80 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
