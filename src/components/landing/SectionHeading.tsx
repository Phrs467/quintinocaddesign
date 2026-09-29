/** Título de seção em serifada, com texto de apoio opcional. */
export function SectionHeading({
  id,
  titulo,
  texto,
  claro = false,
}: {
  id: string;
  titulo: string;
  texto?: React.ReactNode;
  claro?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <h2
        id={id}
        className={`font-serif text-[1.75rem] font-medium leading-[1.15] tracking-[-0.015em] md:text-[2.125rem] ${claro ? "text-white" : ""}`}
      >
        {titulo}
      </h2>
      {texto && <p className={`mt-2 text-base leading-7 ${claro ? "text-white/70" : "text-muted"}`}>{texto}</p>}
    </div>
  );
}
