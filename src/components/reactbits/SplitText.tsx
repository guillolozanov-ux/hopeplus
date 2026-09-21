"use client";

/**
 * SplitText — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: acepta children (para conservar la palabra marcada en <em>), máscara por
 * línea, modo `immediate` para el hero y respeto a prefers-reduced-motion.
 */
import { useRef, useState, useEffect, type ElementType, type ReactNode } from "react";
import { gsap, SplitText as GSAPSplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  splitType?: "words" | "chars" | "lines";
  delay?: number; // segundos antes de empezar
  stagger?: number;
  duration?: number;
  immediate?: boolean; // anima al montar en lugar de al entrar en pantalla
  start?: string;
};

export default function SplitText({
  children,
  as: Tag = "p",
  className,
  splitType = "words",
  delay = 0,
  stagger = 0.06,
  duration = 1.2,
  immediate = false,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsReady) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = GSAPSplitText.create(ref.current!, {
          type: splitType === "lines" ? "lines" : `lines,${splitType}`,
          mask: "lines",
          linesClass: "split-mask",
          autoSplit: true,
          onSplit(self) {
            const targets = splitType === "chars" ? self.chars : splitType === "words" ? self.words : self.lines;
            return gsap.from(targets, {
              yPercent: 110,
              rotate: 3,
              duration,
              stagger,
              delay,
              ease: "expo.out",
              scrollTrigger: immediate ? undefined : { trigger: ref.current, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
      gsap.set(ref.current, { autoAlpha: 1 });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [fontsReady] },
  );

  return (
    <Tag ref={ref} className={`split-pending ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
