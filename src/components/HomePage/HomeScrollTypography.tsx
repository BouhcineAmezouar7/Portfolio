"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeScrollTypography() {
  useGSAP(() => {
    const titles = gsap.utils.toArray<HTMLElement>(
      ".home-scribble .home-scroll-title",
    );
    const lines = gsap.utils.toArray<HTMLElement>(
      ".home-scribble .home-title-line",
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
  }, []);

  return null;
}
