import { MessageCircle } from "lucide-react";
import { cta, mensagemWhatsapp } from "@/content/landing";

/**
 * Link do WhatsApp com a mensagem pré-preenchida. O número vem de NEXT_PUBLIC_WHATSAPP_NUMBER
 * ({{PENDENTE: número comercial}}); sem ele, o wa.me abre para a pessoa escolher o contato.
 */
export function whatsappHref() {
  const numero = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagemWhatsapp)}`;
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
