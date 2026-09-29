"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "./CtaButton";

/** CTA fixo no rodapé da tela (celular), exibido quando o botão principal sai da tela. */
export function StickyCta({ targetId }: { targetId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alvo = document.getElementById(targetId);
    if (!alvo) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(alvo);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-200 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mx-auto max-w-[440px]">
        <CtaButton />
      </div>
    </div>
  );
}
