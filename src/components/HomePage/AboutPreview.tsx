"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "@/data/portfolio";
import {
  revealLeft,
  revealRight,
  siteViewport as homeViewport,
} from "@/lib/site-motion";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="w-full">
        {/* SECTION HEADER */}
        <div className="mb-10 flex items-center justify-between border-b border-border pb-5 lg:mb-14">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-foreground">
              About Me
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            02 / 06
          </span>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* LEFT — BIG TYPOGRAPHY */}
          <motion.div
            variants={revealLeft}
            initial="hidden"
            whileInView="visible"
            viewport={homeViewport}
            className="relative min-w-0"
          >
            {/* EDITORIAL HEADING */}
            <div className="home-scroll-title home-thread-target">
              <h2 className="font-display text-[clamp(3.1rem,6.8vw,8rem)] font-extrabold uppercase leading-[0.87] tracking-[-0.075em] text-foreground">
                <span className="home-title-line">I BUILD</span>
                <span className="home-title-line">PRODUCTS</span>
                <span className="home-title-line text-accent">END TO END.</span>
              </h2>
            </div>

            {/* SHORT DESCRIPTION */}
            <div className="mt-8 max-w-md border-l-2 border-accent pl-5">
              <p className="text-sm leading-7 text-muted sm:text-base">
                From the first idea to the final implementation, I enjoy turning
                complex problems into clean, functional digital products.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — BIOGRAPHY */}
          <motion.div
            variants={revealRight}
            initial="hidden"
            whileInView="visible"
            viewport={homeViewport}
            className="flex min-w-0 flex-col"
          >
            {/* TOP LABEL */}
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                The Developer Behind The Code
              </span>
            </div>

            {/* INTRODUCTION */}
            <h3 className="max-w-[650px] font-display text-[clamp(1.9rem,2.8vw,3.6rem)] font-medium leading-[1.18] tracking-[-0.055em] text-foreground">
              Hey, I&apos;m{" "}
              <span className="text-accent">{profile.firstName}.</span>
              <span className="text-muted">
                {" "}
                A full-stack developer who turns complex requirements into
                focused, dependable products.
              </span>
            </h3>

            {/* DIVIDER */}
            <div className="my-8 h-px w-full bg-border lg:my-10" />

            {/* BIO TEXT */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <p className="font-mono text-[12px] leading-[1.95] tracking-[-0.02em] text-muted">
                I like owning the full path from product decisions and interface
                structure to the systems that make an application reliable
                behind the scenes.
              </p>

              <p className="font-mono text-[12px] leading-[1.95] tracking-[-0.02em] text-muted">
                My approach is practical: understand the problem, keep the
                architecture clear, and deliver an experience that feels
                considered at every screen size.
              </p>
            </div>
            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex min-h-12 items-center gap-6 border-b border-foreground pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                More About Me
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
