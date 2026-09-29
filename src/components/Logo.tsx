import Image from "next/image";
import logo from "../../public/brand/logo.png";

/** Logotipo oficial (public/brand/logo.png, recortado de public/logo_sem_fundo_escura.png). A altura vem de `className`. */
export function Logo({ className = "h-9", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Quintino Dental Design"
      priority={priority}
      sizes="(min-width: 768px) 220px, 180px"
      className={`w-auto ${className}`}
    />
  );
}
