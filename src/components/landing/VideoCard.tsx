"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { CrownArt, type CrownStage } from "../CrownArt";
import { Texto } from "../Texto";

const reduceQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(reduceQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// vertical = 4:5 (post) · reels = 9:16 (vídeo de celular em pé) · horizontal = 16:9
const FORMATO = { vertical: "aspect-[4/5]", reels: "aspect-[9/16]", horizontal: "aspect-video" } as const;
export type FormatoVideo = keyof typeof FORMATO;

/**
 * Player de vídeo do hero. Com `src`: vídeo em loop, mudo, sem nada por cima da imagem além
 * dos controles; a legenda fica abaixo da moldura. Sem `src`: capa com o desenho técnico e a
 * legenda de pendência. Não inicia sozinho quando o usuário pede redução de movimento.
 */
export function VideoCard({
  src,
  poster,
  titulo,
  legenda,
  formato = "vertical",
  temSom = false,
  stage = "completo",
  className = "",
}: {
  src: string | null;
  poster?: string | null;
  titulo: string;
  legenda?: string;
  formato?: FormatoVideo;
  /** Mostra o botão de som. Deixe false para vídeos sem faixa de áudio. */
  temSom?: boolean;
  stage?: CrownStage;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(reduceQuery).matches, () => true);
  const [muted, setMuted] = useState(true);

  // Tocando/pausado é lido do próprio elemento: os eventos podem disparar antes de o React assumir a página.
  const assinarPlay = useCallback((avisar: () => void) => {
    const v = videoRef.current;
    if (!v) return () => {};
    const eventos = ["play", "playing", "pause", "ended"] as const;
    eventos.forEach((e) => v.addEventListener(e, avisar));
    return () => eventos.forEach((e) => v.removeEventListener(e, avisar));
  }, []);
  const playing = useSyncExternalStore(assinarPlay, () => !(videoRef.current?.paused ?? true), () => false);

  // O que o usuário quer: tocar ou não. Só o botão (ou a redução de movimento) muda isso.
  const deveTocar = useRef(false);

  // Início automático (mudo), exceto com redução de movimento. Se o navegador pausar o vídeo por
  // conta própria (economia de energia, aba que volta do segundo plano), ele é retomado — com
  // limite de tentativas, para nunca brigar em laço com o navegador.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    deveTocar.current = !reduced;
    const tocar = () => v.play().catch(() => {}); // pode ser bloqueado; o botão continua disponível
    if (reduced) v.pause();
    else void tocar();

    let tentativas: number[] = [];
    const aoPausar = () => {
      if (!deveTocar.current || document.hidden) return;
      const agora = Date.now();
      tentativas = tentativas.filter((t) => agora - t < 10_000);
      if (tentativas.length >= 5) return;
      tentativas.push(agora);
      window.setTimeout(() => {
        if (deveTocar.current && v.paused) void tocar();
      }, 200);
    };
    const aoVoltar = () => {
      if (!document.hidden && deveTocar.current && v.paused) void tocar();
    };
    v.addEventListener("pause", aoPausar);
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      v.removeEventListener("pause", aoPausar);
      document.removeEventListener("visibilitychange", aoVoltar);
    };
  }, [reduced, src]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    deveTocar.current = v.paused;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const controle =
    "flex size-10 items-center justify-center rounded-full border border-white/25 bg-viewport/60 text-white transition-colors hover:bg-viewport/85";
  const moldura = `sobre-escuro relative isolate overflow-hidden rounded-2xl bg-viewport shadow-[0_40px_80px_-40px_rgba(17,26,46,0.55)] ${FORMATO[formato]}`;

  if (src) {
    return (
      <figure className={className}>
        <div className={moldura}>
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            src={src}
            poster={poster ?? undefined}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={titulo}
          />
          <div className="absolute right-3 top-3 flex gap-2">
            <button type="button" onClick={togglePlay} className={controle} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}>
              {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="ml-0.5 size-4" />}
            </button>
            {temSom && (
              <button type="button" onClick={toggleMute} className={controle} aria-label={muted ? "Ativar som" : "Desativar som"}>
                {muted ? <VolumeX aria-hidden className="size-4" /> : <Volume2 aria-hidden className="size-4" />}
              </button>
            )}
          </div>
        </div>
        <figcaption className="mt-3 text-sm text-muted">{titulo}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`${moldura} ${className}`}>
      <div aria-hidden className="grid-cad-dark absolute inset-0 flex items-center justify-center">
        <CrownArt stage={stage} className="h-[62%] text-white/85" />
      </div>
      {/* degradê inferior para a legenda */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-viewport via-viewport/70 to-transparent" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-viewport/50 px-3 py-1 text-xs text-white/85">
        <span aria-hidden className="size-1.5 rounded-full bg-white/40" />
        Vídeo
      </div>
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
      >
        <Play className="ml-0.5 size-6" strokeWidth={1.5} />
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
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
