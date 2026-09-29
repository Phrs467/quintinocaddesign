"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { CrownArt, type CrownStage } from "../CrownArt";
import { Texto } from "../Texto";

const reduceQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(reduceQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Player vertical (formato Reels). Com `src`: vídeo em loop, mudo, com controles de
 * reproduzir e som. Sem `src`: capa com o desenho técnico e a legenda de pendência.
 */
export function VideoCard({
  src,
  poster,
  titulo,
  legenda,
  stage = "completo",
  className = "",
}: {
  src: string | null;
  poster?: string | null;
  titulo: string;
  legenda?: string;
  stage?: CrownStage;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(reduceQuery).matches, () => true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const controle =
    "flex size-10 items-center justify-center rounded-full border border-white/25 bg-viewport/60 text-white transition-colors hover:bg-viewport/80";

  return (
    <figure
      className={`sobre-escuro relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-viewport shadow-[0_40px_80px_-40px_rgba(17,26,46,0.55)] ${className}`}
    >
      {src ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster ?? undefined}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : (
        <div aria-hidden className="grid-cad-dark absolute inset-0 flex items-center justify-center">
          <CrownArt stage={stage} className="h-[62%] text-white/85" />
        </div>
      )}

      {/* degradê inferior para a legenda */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-viewport via-viewport/70 to-transparent" />

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-viewport/50 px-3 py-1 text-xs text-white/85">
        <span aria-hidden className={`size-1.5 rounded-full ${src ? "bg-emerald-400" : "bg-white/40"}`} />
        Vídeo
      </div>

      {src ? (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button type="button" onClick={togglePlay} className={controle} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}>
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
          <button type="button" onClick={toggleMute} className={controle} aria-label={muted ? "Ativar som" : "Desativar som"}>
            {muted ? <VolumeX aria-hidden className="size-4" /> : <Volume2 aria-hidden className="size-4" />}
          </button>
        </div>
      ) : (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
        >
          <Play className="ml-0.5 size-6" strokeWidth={1.5} />
        </span>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 p-5 pr-28 text-white">
        <span className="block font-serif text-xl leading-snug">{titulo}</span>
        {legenda && (
          <span className="mt-1 block text-sm text-white/70">
            <Texto>{legenda}</Texto>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
