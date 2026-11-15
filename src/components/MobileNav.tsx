"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  mainNavigationLinks,
  resumeNavigationLink,
  socialLinks,
} from "@/data/portfolio";
import { useResumeModal } from "@/components/ResumeModal";
import BrandLogo from "@/components/MyLogo";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiArrowUpRight,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

const socialIcons = {
  github: <FiGithub aria-hidden="true" />,
  linkedin: <FiLinkedin aria-hidden="true" />,
  email: <FiMail aria-hidden="true" />,
};

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openResume } = useResumeModal();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label="Open navigation menu"
          className="flex h-11 w-11 items-center justify-center border border-border bg-transparent text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <FiMenu size={18} aria-hidden="true" />
        </motion.button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="site-mobile-nav w-screen max-w-none gap-0 overflow-y-auto border-l border-border bg-background p-0 text-foreground sm:max-w-none"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to a portfolio page.
        </SheetDescription>

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 min-[380px]:px-5 sm:h-20 sm:px-7">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Go to homepage"
          >
            <BrandLogo size="sm" animated={false} tone="dark" />
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted min-[380px]:block">
              Close menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <FiX size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted min-[380px]:px-5 sm:px-7 sm:py-4 sm:tracking-[0.2em]">
          <span>Navigation index</span>
          <span className="text-accent">01 — 04</span>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex w-full flex-1 flex-col"
        >
          {mainNavigationLinks.map((link, index) => {
            const isActive = pathname === link.href;

            return (
              <motion.div
                key={link.href}
                className="w-full"
                initial={{ opacity: 0, x: 28 }}
                animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group grid min-h-[78px] py-7 w-full grid-cols-[1.8rem_1fr_auto] items-center gap-2 border-b border-border px-4 transition-colors min-[380px]:min-h-[88px] min-[380px]:grid-cols-[2.25rem_1fr_auto] min-[380px]:gap-3 min-[380px]:px-5 sm:min-h-[104px] sm:grid-cols-[2.75rem_1fr_auto] sm:px-7 ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <span
                    className={`self-start pt-5 font-mono text-[11px] tracking-[0.16em] min-[380px]:pt-6 sm:pt-7 ${
                      isActive ? "text-black/60" : "text-muted"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.9rem,10.5vw,3.5rem)] font-black uppercase leading-none tracking-[-0.065em] min-[380px]:text-[clamp(2.2rem,11vw,3.5rem)]">
                    {link.name}
                  </span>
                  <FiArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className={`transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                      isActive ? "text-black" : "text-accent"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border p-4 min-[380px]:p-5 sm:p-7">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openResume();
            }}
            className="group flex min-h-14 w-full items-center justify-between bg-accent px-5 text-left text-sm font-semibold uppercase tracking-[0.1em] text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="flex items-center gap-3">
              <FiFileText size={17} aria-hidden="true" />
              {resumeNavigationLink.name}
            </span>
            <FiArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

          <div className="mt-5 flex items-center justify-between gap-5 border-t border-border pt-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
              Connect
            </span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  {socialIcons[social.id]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
