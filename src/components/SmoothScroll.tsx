"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;

    const syncScrollPreference = () => {
      lenis?.destroy();
      lenis = null;

      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        duration: 1.15,
        easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        anchors: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
    };

    syncScrollPreference();
    reducedMotion.addEventListener("change", syncScrollPreference);

    return () => {
      reducedMotion.removeEventListener("change", syncScrollPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
