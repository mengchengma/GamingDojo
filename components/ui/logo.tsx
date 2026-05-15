/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "wordmark" | "shield" | "stacked";
  /** Force the SVG fallback even when image files exist. */
  forceSvg?: boolean;
}

/**
 * Logo component.
 *
 * Drop your transparent files at:
 *   /public/logo-shield.png    — GD shield mark (transparent)
 *   /public/logo-wordmark.png  — "GAMING DOJO" wordmark (transparent)
 *
 * If those files don't exist, a stylized SVG (lightning-bolt GD mark) renders
 * in `currentColor` so it inherits the active theme's brand color (cream on
 * navy dark mode, navy on cream light mode).
 */
export function Logo({ className, variant = "wordmark", forceSvg }: LogoProps) {
  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-3", className)}>
        <Logo variant="shield" className="h-16 w-16" forceSvg={forceSvg} />
        <Logo variant="wordmark" forceSvg={forceSvg} />
      </div>
    );
  }

  if (variant === "shield") {
    return <ShieldLogo className={className} forceSvg={forceSvg} />;
  }

  return <WordmarkLogo className={className} forceSvg={forceSvg} />;
}

function ShieldLogo({
  className,
  forceSvg,
}: {
  className?: string;
  forceSvg?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showSvg = forceSvg || imgFailed;

  return (
    <span
      className={cn("inline-flex items-center justify-center text-brand", className)}
      aria-label="Gaming Dojo"
    >
      {!showSvg && (
        <img
          src="/logo-shield.png"
          alt=""
          className="h-full w-full object-contain"
          onError={() => setImgFailed(true)}
        />
      )}
      {showSvg && <ShieldSvg className="h-full w-full" />}
    </span>
  );
}

function WordmarkLogo({
  className,
  forceSvg,
}: {
  className?: string;
  forceSvg?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showSvg = forceSvg || imgFailed;

  if (!showSvg) {
    return (
      <span
        className={cn(
          "inline-block leading-none h-12 md:h-14 lg:h-16",
          className,
        )}
      >
        {/* Light mode — dark navy logo on cream bg */}
        <img
          src="/logo-wordmark.png"
          alt="Gaming Dojo"
          className="block h-full w-auto dark:hidden"
          onError={() => setImgFailed(true)}
        />
        {/* Dark mode — light/cream logo on navy bg */}
        <img
          src="/logolight.png"
          alt=""
          aria-hidden
          className="hidden h-full w-auto ml-[8px] dark:block"
          onError={() => setImgFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 leading-none text-brand",
        className,
      )}
    >
      <span className="font-display font-bold text-3xl md:text-4xl tracking-tight">
        Gaming
      </span>
      <span className="font-display font-bold italic text-3xl md:text-4xl text-hachimaki tracking-tight">
        Dojo
      </span>
    </span>
  );
}

/**
 * Stylized "GD" shield. Uses `currentColor` so it adopts whichever brand
 * color is active (cream in dark mode, navy in light mode).
 */
function ShieldSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      {/* outer circle in four arcs — leaves gaps at top-right & bottom-left like the real mark */}
      <path
        d="M32 4 A28 28 0 0 1 60 32"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M4 32 A28 28 0 0 1 32 4"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M60 32 A28 28 0 0 1 50 53"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M14 53 A28 28 0 0 1 4 32"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />

      {/* G */}
      <path
        d="M27 18 L19 18 Q13 18 13 26 L13 38 Q13 46 19 46 L27 46 L27 34 L21 34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* D */}
      <path
        d="M37 18 L43 18 Q51 18 51 32 Q51 46 43 46 L37 46 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* lightning bolt through center */}
      <path
        d="M38 14 L29 30 L36 30 L26 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
