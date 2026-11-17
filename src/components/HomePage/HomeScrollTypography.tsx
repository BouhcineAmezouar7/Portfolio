"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useTitleScrollMotion(scope?: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = scope?.current ?? document;
    const titles = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(scope ? ".home-scroll-title" : ".home-scribble .home-scroll-title"),
    );
    const lines = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(scope ? ".home-title-line" : ".home-scribble .home-title-line"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([...titles, ...lines], { clearProps: "transform" });
      return;
    }

    const distance = window.matchMedia("(max-width: 767px)").matches ? 3.5 : 7;

    titles.forEach((title) => {
      const titleLines = gsap.utils.toArray<HTMLElement>(
        title.querySelectorAll(".home-title-line"),
      );

      titleLines.forEach((line, lineIndex) => {
        // Outer lines move left; alternating inner lines move right.
        // 2 lines: left / right. 3 lines: left / right / left.
        const from = lineIndex % 2 === 0 ? distance : -distance;

        gsap.fromTo(
          line,
          { xPercent: from },
          {
            xPercent: -from,
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
  }, { scope, dependencies: [] });
}

export default function HomeScrollTypography() {
  useTitleScrollMotion();
  return null;
}
