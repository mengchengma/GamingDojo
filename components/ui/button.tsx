"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 font-display font-medium transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hachimaki focus-visible:ring-offset-2 focus-visible:ring-offset-sumi disabled:pointer-events-none disabled:opacity-50 rounded-full",
  {
    variants: {
      variant: {
        primary:
          "bg-hachimaki text-sumi hover:bg-paper shadow-[0_0_0_1px_rgba(232,152,88,0.35),0_8px_32px_-8px_rgba(232,152,88,0.45)] hover:shadow-[0_0_0_1px_rgba(250,243,230,0.5),0_12px_48px_-8px_rgba(232,152,88,0.6)]",
        outline:
          "border border-bone/25 bg-transparent text-bone hover:border-hachimaki hover:text-hachimaki",
        ghost:
          "text-bone/85 hover:text-bone hover:bg-bone/5",
        sensei:
          "bg-bone text-sumi hover:bg-paper shadow-[0_0_0_1px_rgba(245,236,220,0.2),0_8px_32px_-8px_rgba(245,236,220,0.3)]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
