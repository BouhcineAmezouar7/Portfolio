"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  mainNavigationLinks,
  resumeNavigationLink,
} from "@/data/portfolio";
import { FiArrowUpRight } from "react-icons/fi";
import { useResumeModal } from "@/components/ResumeModal";

export default function Nav() {
  const pathname = usePathname();
  const { openResume } = useResumeModal();

  return (
    <nav className="flex items-center gap-7">
      {mainNavigationLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className="group relative flex items-center gap-2 py-2"
          >
            {/* Link */}
            <span
              className={`
                text-[12px] font-medium uppercase tracking-[0.12em]
                transition-colors duration-300
                ${
                  isActive
                    ? "text-accent"
                    : "text-muted group-hover:text-accent"
                }
              `}
            >
              {link.name}
            </span>

            {/* Active indicator */}
            {isActive && (
              <motion.span
                layoutId="active-nav"
                className="absolute -bottom-[1px] left-0 h-px w-full bg-gradient-to-r from-accent via-accent to-accent"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            {/* Hover indicator */}
            {!isActive && (
              <span className="absolute -bottom-[1px] left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            )}
          </Link>
        );
      })}

      {/* Separator */}
      <div className="h-5 w-px bg-foreground/10" />

      {/* Resume */}
      <button
        type="button"
        onClick={openResume}
        className="group inline-flex items-center gap-2 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#ff3b1f] transition-colors duration-300 hover:text-white"
      >
        {resumeNavigationLink.name}

        <FiArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </nav>
  );
}
