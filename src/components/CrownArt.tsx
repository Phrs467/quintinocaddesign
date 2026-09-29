/**
 * Desenho técnico de uma coroa de molar (vista lateral) em traço fino.
 * Cada `stage` ilustra um passo do processo; "completo" é a capa do vídeo.
 */
export type CrownStage = "envio" | "desenho" | "aprovacao" | "producao" | "completo";

const COROA =
  "M62 168 C52 148 44 122 47 100 C49 84 55 70 66 64 C74 60 84 62 90 70 C94 74 98 76 100 76 C102 76 106 74 110 70 C116 62 126 60 134 64 C145 70 151 84 153 100 C156 122 148 148 138 168 C120 176 80 176 62 168 Z";

// Pontos sobre a silhueta, como a nuvem de um escaneamento
const PONTOS: [number, number][] = [
  [62, 168], [53, 150], [47, 128], [47, 104], [52, 84], [62, 68], [76, 61], [88, 68], [100, 76], [112, 68],
  [124, 61], [138, 68], [148, 84], [153, 104], [153, 128], [147, 150], [138, 168], [118, 173], [100, 174], [82, 173],
];

const curva = (s: number, o: number, w = 0.7) => (
  <use href="#coroa" transform={`translate(100 118) scale(${s}) translate(-100 -118)`} strokeWidth={w} opacity={o} />
);

export function CrownArt({ stage = "completo", className = "" }: { stage?: CrownStage; className?: string }) {
  return (
    <svg viewBox="0 0 200 210" fill="none" aria-hidden className={className}>
      <defs>
        <path id="coroa" d={COROA} />
      </defs>
      <g stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
        {stage === "envio" && (
          <>
            <use href="#coroa" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.5" />
            <g fill="currentColor" stroke="none">
              {PONTOS.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
              ))}
            </g>
            {/* linha de varredura */}
            <path d="M34 112 H166" strokeWidth="0.8" opacity="0.55" />
            <path d="M34 108 V116 M166 108 V116" strokeWidth="0.8" opacity="0.55" />
          </>
        )}

        {(stage === "desenho" || stage === "completo") && (
          <>
            {curva(0.78, 0.45)}
            {curva(0.56, 0.32)}
            {curva(0.34, 0.22)}
            <use href="#coroa" strokeWidth="1.4" />
            <path d="M66 160 C86 168 114 168 134 160" strokeWidth="0.9" strokeDasharray="2.5 3" opacity="0.7" />
            <path d="M100 50 V186" strokeWidth="0.6" strokeDasharray="6 3 1 3" opacity="0.35" />
            <path d="M47 100 V196 M153 100 V196" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />
            <path d="M47 192 H153 M47 188 V196 M153 188 V196" strokeWidth="0.8" opacity="0.6" />
            <path d="M53 189 L47 192 L53 195 M147 189 L153 192 L147 195" strokeWidth="0.8" opacity="0.6" />
          </>
        )}

        {stage === "aprovacao" && (
          <>
            {curva(0.78, 0.3)}
            {curva(0.56, 0.2)}
            <use href="#coroa" strokeWidth="1.4" />
            {/* marcações de revisão */}
            <circle cx="66" cy="64" r="9" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
            <path d="M58 56 L44 42 H30" strokeWidth="0.7" opacity="0.6" />
            <circle cx="150" cy="128" r="8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
            <path d="M157 134 L168 146 H180" strokeWidth="0.7" opacity="0.6" />
            {/* selo de aprovado */}
            <circle cx="160" cy="40" r="14" strokeWidth="1.2" />
            <path d="M153 40 L158 45 L168 35" strokeWidth="1.6" />
          </>
        )}

        {stage === "producao" && (
          <>
            <use href="#coroa" strokeWidth="1.4" fill="currentColor" fillOpacity="0.07" />
            {curva(0.78, 0.25)}
            <path d="M66 160 C86 168 114 168 134 160" strokeWidth="0.9" strokeDasharray="2.5 3" opacity="0.7" />
            {/* arquivo final */}
            <path d="M100 180 V192" strokeWidth="0.8" opacity="0.6" />
            <rect x="66" y="192" width="68" height="16" rx="3" strokeWidth="1" />
            <text
              x="100"
              y="203.5"
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
              stroke="none"
              fontFamily="var(--font-inter), Arial, sans-serif"
            >
              arquivo final
            </text>
          </>
        )}
      </g>
    </svg>
  );
}
