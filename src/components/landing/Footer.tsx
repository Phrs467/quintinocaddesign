export function Footer() {
  return (
    <footer className="pb-28 pt-10 text-center text-sm text-muted lg:pb-10">
      Made with{" "}
      <a
        href="https://devolex.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-navy underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-navy"
      >
        Devolex
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </footer>
  );
}
