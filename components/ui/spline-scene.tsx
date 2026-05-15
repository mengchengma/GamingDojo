"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  title?: string;
  /** When true and the URL isn't a `scene.splinecode`, render the public webp preview from spline community-filepreview. */
  preferStaticPreview?: boolean;
  /** Optional explicit static preview override (image URL). */
  staticPreview?: string;
}

const COMMUNITY_RE = /community\/file\/([a-f0-9-]{36})/i;

export function SplineScene({
  scene,
  className,
  title = "3D scene",
  preferStaticPreview = true,
  staticPreview,
}: SplineSceneProps) {
  // 1. If it's a real Spline runtime URL, use the React component.
  if (scene.includes("scene.splinecode")) {
    return (
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader" />
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    );
  }

  // 2. Community URL → use the public webp preview as a still image.
  //    Community/file/<id> requires auth in iframe, so a still avoids login chrome.
  const m = scene.match(COMMUNITY_RE);
  if (preferStaticPreview && m) {
    const id = m[1];
    const src =
      staticPreview ??
      `https://community-filepreview.spline.design/webp-90/${id}.webp`;
    return (
      <img
        src={src}
        alt={title}
        loading="lazy"
        className={className}
        style={{ objectFit: "cover" }}
      />
    );
  }

  // 3. Fallback — embed iframe directly.
  return (
    <iframe
      src={scene}
      title={title}
      className={className}
      loading="lazy"
      allow="autoplay; fullscreen"
      style={{ border: 0 }}
    />
  );
}
