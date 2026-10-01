/**
 * Faixa de largura total com o conteúdo centralizado. As seções da página alternam
 * claro/escuro ("xadrez"); o tom é definido aqui, em page.tsx, e não dentro de cada seção.
 */
export function Faixa({ escuro = false, children }: { escuro?: boolean; children: React.ReactNode }) {
  return (
    <div className={escuro ? "sobre-escuro bg-viewport text-white" : ""}>
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">{children}</div>
    </div>
  );
}
