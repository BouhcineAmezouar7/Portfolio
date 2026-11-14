"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { profile, socialLinks } from "@/data/portfolio";
import { siteEase as homeEase } from "@/lib/site-motion";

const socialIcons = {
  github: <FiGithub />,
  linkedin: <FiLinkedin />,
  email: <FiMail />,
};

const titleLines = ["I BUILD", "DIGITAL", "EXPERIENCES."];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[calc(100svh-80px)] w-full overflow-hidden bg-[#070707] text-[#f2efe7]"
    >
      <div className="relative flex min-h-[calc(100svh-80px)] w-full flex-col px-5 pb-8 sm:px-8 lg:px-12">
        {/* MAIN HERO */}
        <div className="relative grid flex-1 items-center gap-5 py-14 lg:grid-cols-[37%_63%] lg:gap-5 lg:py-10">
          {/* LEFT — PORTRAIT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: homeEase,
            }}
            className="relative order-2 flex h-full items-end justify-center lg:order-1"
          >
            <div className="relative w-full max-w-[460px] lg:max-w-none">
              {/* subtle background glow */}
              <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-[#ff3b1f]/[0.06] blur-[90px]" />

              <div className="relative aspect-[4/2.8] w-full overflow-hidden lg:aspect-[4/3.6]">
                <Image
                  src="/my_images/mee.png"
                  alt={profile.name}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 90vw, 37vw"
                  className="object-contain object-bottom transition-transform duration-1000"
                />

                {/* blend image into dark background */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070707] to-transparent" />
              </div>

              {/* IMAGE CAPTION */}
              <div className="absolute bottom-3 left-0 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                <span className="h-px w-8 bg-[#ff3b1f]" />
                <span>{profile.name}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — TYPOGRAPHY */}
          <div className="relative z-10 order-1 flex min-w-0 flex-col justify-center lg:order-2 lg:-ml-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: homeEase,
              }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff3b1f]">
                Hello, I&apos;m Bouhcine
              </span>
              <span className="h-px w-12 bg-[#ff3b1f]" />
            </motion.div>

            {/* HUGE EDITORIAL TITLE */}
            <h1 className="home-scroll-title relative font-sans font-black uppercase leading-[0.84] tracking-[-0.085em]">
              {titleLines.map((line, index) => (
                <span key={line} className="home-title-line overflow-hidden py-[0.045em]">
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
                      duration: 1.05,
                      delay: 0.3 + index * 0.13,
                      ease: homeEase,
                    }}
                    className="block text-[clamp(3.3rem,8.1vw,9.5rem)]"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* RED ACCENT + DESCRIPTION */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.85,
                ease: homeEase,
              }}
              className="mt-10 grid gap-6 border-t border-white/15 pt-7 sm:grid-cols-[1fr_1.4fr]"
            >
              <div>
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff3b1f]">
                  01 / Who I Am
                </span>

                <p className="max-w-[220px] text-sm font-medium uppercase leading-[1.5] tracking-[0.02em]">
                  {profile.role} &amp; 1337 Coding School student.
                </p>
              </div>

              <div>
                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff3b1f]">
                  02 / What I Do
                </span>

                <p className="max-w-md text-sm leading-7 text-white/50">
                  Building modern digital products, scalable backends, and
                  thoughtful web experiences using Next.js, NestJS, TypeScript,
                  PostgreSQL, and Docker.
                </p>
              </div>
            </motion.div>

            {/* CTA LINKS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: homeEase,
              }}
              className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-5"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.09em] transition-colors hover:text-[#ff3b1f]"
              >
                Explore Projects
                <FiArrowUpRight
                  className="text-[#ff3b1f] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={19}
                />
              </Link>

              <Link
                href="/resume"
                className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.09em] text-white/45 transition-colors hover:text-white"
              >
                My Resume
                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="relative z-10 flex flex-col gap-6 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                aria-label={social.name}
                className="text-lg text-white/50 transition-colors duration-300 hover:text-[#ff3b1f]"
              >
                {socialIcons[social.id]}
              </a>
            ))}

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.15em] text-white/35 sm:block">
              Open to opportunities
            </span>
          </div>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 1.2,
              ease: homeEase,
            }}
            whileHover="hover"
            className="group inline-flex items-center gap-4 self-start font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
          >
            <motion.span
              variants={{
                hover: { x: -3 },
              }}
              transition={{ duration: 0.3 }}
            >
              Scroll to explore
            </motion.span>

            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center"
            >
              <FiArrowDown size={17} className="text-[#ff3b1f]" />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
