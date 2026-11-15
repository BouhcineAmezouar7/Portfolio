"use client";

import { motion } from "framer-motion";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiMail,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import Link from "next/link";
import { socialLinks } from "@/data/portfolio";
import {
  siteEase as homeEase,
  siteViewport as homeViewport,
} from "@/lib/site-motion";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="w-full">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Contact
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            06 / 06
          </span>
        </div>

        {/* MAIN CTA */}
        <div className="border-b border-border py-10 sm:py-14 lg:py-16">
          {/* HUGE TITLE */}
          <div className="home-scroll-title home-thread-target">
            <motion.h2
              initial={{ opacity: 0, y: 72, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={homeViewport}
              transition={{
                duration: 1,
                ease: homeEase,
              }}
              className="home-section-title"
            >
              <span className="home-title-line">LET&apos;S BUILD</span>
              <span className="home-title-line text-accent">SOMETHING</span>
              <span className="home-title-line">TOGETHER.</span>
            </motion.h2>
          </div>

          {/* CTA ROW */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 36, filter: "blur(7px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={homeViewport}
              transition={{ duration: 0.75, delay: 0.18, ease: homeEase }}
              className="max-w-xl text-sm leading-7 text-muted sm:text-base"
            >
              I&apos;m interested in new projects, collaborations and
              opportunities. If you have an idea, a project or simply want to
              talk about development, feel free to get in touch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={homeViewport}
              transition={{ duration: 0.72, delay: 0.28, ease: homeEase }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    group flex h-14 w-full
                    sm:h-16 sm:min-w-[200px]
                    items-center justify-between
                    gap-5 sm:gap-10
                    bg-foreground
                    px-6
                    text-sm font-semibold
                    text-background
                    transition-colors
                    hover:bg-foreground/90
                  "
                >
                  Start a Project
                  <FiArrowUpRight
                    size={18}
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="border-b border-border">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={{ duration: 0.65, delay: 0.42, ease: homeEase }}
            className="flex items-center justify-between py-5"
          >
            <span className="mr-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Connect
            </span>

            <div className="flex gap-2">
              <a
                href={socialLinks[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  border border-border
                  text-muted
                  transition-all duration-300
                  hover:border-foreground
                  hover:bg-foreground
                  hover:text-background
                "
              >
                <FiGithub size={15} />
              </a>

              <a
                href={socialLinks[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  border border-border
                  text-muted
                  transition-all duration-300
                  hover:border-foreground
                  hover:bg-foreground
                  hover:text-background
                "
              >
                <FiLinkedin size={15} />
              </a>

              <a
                href={socialLinks[2].href}
                aria-label="Email"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  border border-border
                  text-muted
                  transition-all duration-300
                  hover:border-foreground
                  hover:bg-foreground
                  hover:text-background
                "
              >
                <FiMail size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-end">
          <motion.a
            href="#header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={{ duration: 0.65, delay: 0.48, ease: homeEase }}
            className="group flex items-center justify-between py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-11 w-11 items-center justify-center text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
            >
              <FiArrowUp
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
