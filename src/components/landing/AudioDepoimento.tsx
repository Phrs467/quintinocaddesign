"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { Texto } from "../Texto";

// Alturas fixas das barras (em %), para o desenho ser igual no servidor e no navegador.
const BARRAS = [
  30, 55, 42, 70, 48, 85, 60, 38, 72, 52, 90, 64, 44, 76, 58, 34, 68, 50, 82, 46, 62, 36, 74, 54, 88, 40, 66, 56, 78, 32, 60,
  48, 70, 42, 84, 52,
];

const tempo = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/**
 * Depoimento em áudio no formato de mensagem de voz: reproduzir/pausar, barras que
 * preenchem conforme toca (clicáveis para avançar) e tempo. Sem `src`, fica desativado.
 */
export function AudioDepoimento({
  src,
  nome,
  papel,
  transcricao,
}: {
  src: string | null;
  nome: string;
  papel?: string;
  transcricao?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tocando, setTocando] = useState(false);
  const [atual, setAtual] = useState(0);
  // A duração é lida do próprio elemento: o evento "loadedmetadata" pode disparar antes de o
  // React assumir a página, e um estado preenchido só pelo evento ficaria em zero.
  const assinarDuracao = useCallback((avisar: () => void) => {
    const a = audioRef.current;
    if (!a) return () => {};
    const eventos = ["loadedmetadata", "durationchange", "canplay"] as const;
    eventos.forEach((e) => a.addEventListener(e, avisar));
    return () => eventos.forEach((e) => a.removeEventListener(e, avisar));
  }, []);
  const duracao = useSyncExternalStore(
    assinarDuracao,
    () => {
      const d = audioRef.current?.duration;
      return d !== undefined && Number.isFinite(d) ? d : 0;
    },
    () => 0,
  );
  const progresso = duracao > 0 ? atual / duracao : 0;

  const alternar = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      // um áudio por vez
      document.querySelectorAll<HTMLAudioElement>("audio[data-depoimento]").forEach((outro) => {
        if (outro !== a) outro.pause();
      });
      void a.play();
    } else {
      a.pause();
    }
  };

  return (
    <figure className="flex flex-col rounded-xl border border-line bg-surface p-5">
      {src && (
        <audio
          ref={audioRef}
          data-depoimento
          src={src}
          preload="metadata"
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onEnded={() => setAtual(0)}
          onTimeUpdate={(e) => setAtual(e.currentTarget.currentTime)}
        />
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={alternar}
          disabled={!src}
          aria-label={tocando ? `Pausar depoimento de ${nome}` : `Ouvir depoimento de ${nome}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-navy-hover disabled:bg-line-strong"
        >
          {tocando ? <Pause aria-hidden className="size-[18px]" /> : <Play aria-hidden className="ml-0.5 size-[18px]" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="relative flex h-9 items-center gap-[3px]">
            {BARRAS.map((h, i) => (
              <span
                key={i}
                aria-hidden
                className={`w-full flex-1 rounded-full ${i / BARRAS.length < progresso ? "bg-navy" : "bg-line-strong"}`}
                style={{ height: `${h}%` }}
              />
            ))}
            {src && (
              <input
                type="range"
                min={0}
                max={duracao || 0}
                step={0.1}
                value={atual}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (audioRef.current) audioRef.current.currentTime = v;
                  setAtual(v);
                }}
                aria-label={`Posição no áudio de ${nome}`}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            )}
          </div>
          <p className="mt-1 text-xs tabular-nums text-muted">
            {src ? `${tempo(atual)} / ${tempo(duracao)}` : <Texto>{"{{PENDENTE: áudio}}"}</Texto>}
          </p>
        </div>
      </div>

      <figcaption className="mt-4 border-t border-line pt-4">
        <span className="block text-[0.9375rem] font-semibold text-navy">
          <Texto>{nome}</Texto>
        </span>
        {papel && (
          <span className="block text-sm text-muted">
            <Texto>{papel}</Texto>
          </span>
        )}
      </figcaption>

      {transcricao && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-blue hover:underline">Ler transcrição</summary>
          <blockquote className="mt-2 leading-6 text-muted">“{transcricao}”</blockquote>
        </details>
      )}
    </figure>
  );
}
