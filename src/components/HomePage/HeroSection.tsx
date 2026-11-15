"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";
import { siteEase as homeEase } from "@/lib/site-motion";

const titleLines = ["I BUILD", "DIGITAL", "EXPERIENCES."];
const socialIcons = {
  github: <FiGithub />,
  linkedin: <FiLinkedin />,
  email: <FiMail />,
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[calc(100svh-64px)] w-full overflow-hidden bg-[#070707] text-[#f2efe7] sm:min-h-[calc(100svh-80px)]"
    >
      <div className="relative mx-auto flex min-h-[calc(100svh-64px)] w-full max-w-[1800px] flex-col px-4 pb-6 pt-5 min-[380px]:px-5 sm:min-h-[calc(100svh-80px)] sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10 lg:pt-12">
        {/* MAIN HEADLINE */}
        <div className="relative z-20 flex flex-1 flex-col justify-center py-10 sm:py-16 lg:py-12">
          <h1 className="home-scroll-title home-thread-target relative w-full font-display font-black uppercase leading-[0.79] tracking-[-0.085em]">
            {titleLines.map((line, index) => (
              <span
                key={line}
                className="home-title-line block overflow-hidden py-[0.055em]"
              >
                <motion.span
                  initial={{
                    y: "110%",
                    opacity: 0,
                  }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.15,
                    delay: 0.2 + index * 0.16,
                    ease: homeEase,
                  }}
                  className="block whitespace-nowrap text-[clamp(2.55rem,10.45vw,11.5rem)] min-[380px]:text-[clamp(3rem,10.45vw,11.5rem)]"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* BOTTOM DETAILS */}
        <div className="relative z-20 flex flex-col justify-between gap-7 sm:flex-row sm:items-end sm:gap-10">
          {/* LEFT DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: homeEase,
            }}
            className="max-w-[400px]"
          >
            <p className="font-mono text-[12px] leading-[1.8] text-white/75 sm:text-[13px]">
              Full-Stack Developer &amp; 1337 Coding School student.
            </p>

            <p className="mt-2 font-mono text-[11px] leading-[1.7] text-white/40">
              Building modern digital products and scalable web experiences.
            </p>
            <div className="mt-2 flex justify-end gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center text-lg text-white/50 transition-colors duration-300 hover:text-[#ff3b1f]"
                >
                  {socialIcons[social.id]}
                </a>
              ))}
            </div>

            <Link
              href="/projects"
              className="group mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-[#ff3b1f] transition-colors hover:text-white sm:mt-6"
            >
              Explore my work
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>

          {/* RIGHT SCROLL INDICATOR */}
          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: homeEase,
            }}
            className="group inline-flex min-h-11 items-center gap-3 self-start font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white sm:self-auto"
          >
            <span>Scroll to follow the thread</span>

            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#ff3b1f]"
            >
              <FiArrowDown size={17} />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
