"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useSoftReveal<T extends HTMLElement>() {
  const scopeRef = useRef<T | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from("[data-reveal]", {
            autoAlpha: 0,
            y: 16,
            duration: 0.45,
            ease: "expo.out",
            stagger: 0.045,
            clearProps: "visibility,transform,opacity",
          });
        },
        scopeRef
      );

      return () => mm.revert();
    },
    { scope: scopeRef }
  );

  return scopeRef;
}
