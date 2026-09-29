import { MessageCircle } from "lucide-react";
import { cta, whatsapp } from "@/content/landing";

/** Link do WhatsApp com a mensagem pré-preenchida (número e texto em src/content/landing.ts). */
export function whatsappHref() {
  const numero = whatsapp.numero.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(whatsapp.mensagem)}`;
}

/** Ação principal da landing: abre a conversa no WhatsApp. */
export function CtaButton({ id, className = "" }: { id?: string; className?: string }) {
  return (
    <a
      id={id}
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={`group btn-primary w-full ${className}`}
    >
      {/* lucide-react não tem ícones de marca; MessageCircle representa o WhatsApp */}
      <MessageCircle aria-hidden className="size-[18px] shrink-0" strokeWidth={2} />
      {cta}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
