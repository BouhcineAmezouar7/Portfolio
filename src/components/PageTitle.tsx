"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useTitleScrollMotion } from "@/components/HomePage/HomeScrollTypography";
import { siteEase } from "@/lib/site-motion";

type PageTitleProps = {
  lines: ReactNode[];
  className?: string;
};

export default function PageTitle({ lines, className }: PageTitleProps) {
  const scope = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useTitleScrollMotion(scope);

  return (
    <div ref={scope}>
      <h1 className={`home-scroll-title ${className ?? ""}`}>
        {lines.map((line, index) => (
          <span
            key={index}
            className="home-title-line overflow-hidden py-[0.055em]"
          >
            <motion.span
              className="block"
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 1.15,
                delay: reduceMotion ? 0 : 0.2 + index * 0.16,
                ease: siteEase,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
    </div>
  );
}
