const SPLIT = /(\{\{PENDENTE[^}]*\}\})/;
const IS_PENDENTE = /^\{\{PENDENTE/;

/** Renderiza texto do conteúdo destacando, de forma discreta, os marcadores {{PENDENTE: ...}}. */
export function Texto({ children }: { children: string }) {
  const parts = children.split(SPLIT);
  if (parts.length === 1) return children;
  return (
    <>
      {parts.map((part, i) =>
        IS_PENDENTE.test(part) ? (
          <span key={i} className="pendente" title="Conteúdo a ser fornecido">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
