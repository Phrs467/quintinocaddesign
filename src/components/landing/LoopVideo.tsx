"use client";

import { useSyncExternalStore } from "react";

const reduceQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(reduceQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Vídeo curto em loop, mudo; sem autoplay quando o usuário pede redução de movimento. */
export function LoopVideo({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(reduceQuery).matches, () => true);
  return (
    <video
      className={className}
      src={src}
      aria-label={label}
      autoPlay={!reduced}
      controls={reduced}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
