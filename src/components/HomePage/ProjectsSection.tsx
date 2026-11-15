"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

import FoldImageGallery from "@/components/mfa/FoldImageGallery";
import type { FoldProject } from "@/components/mfa/FoldItem";
import { featuredProjects } from "@/data/portfolio";
import { revealUp, siteViewport as homeViewport } from "@/lib/site-motion";

const foldProjects: FoldProject[] = featuredProjects.map((project) => ({
  title: project.title,
  text: project.description,
  image: project.image,
  alt: `${project.title} project interface`,
  meta: [
    ["Category", project.category],
    ["Year", project.year],
    ["Type", project.type],
  ],
}));

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="w-full">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={homeViewport}
          className="mb-10 flex items-center justify-between border-b border-border pb-5"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Selected Work
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            04 / 06
          </span>
        </motion.div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={homeViewport}
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <div className="home-scroll-title home-thread-target">
              <h2 className="home-section-title">
                <span className="home-title-line">SELECTED</span>
                <span className="home-title-line text-accent">PROJECTS.</span>
              </h2>
            </div>
          </div>

          <div className="lg:pb-1">
            <div className="mb-6 h-px w-12 bg-accent" />
            <p className="max-w-md text-sm leading-7 text-muted">
              A selection of projects where I combine frontend development,
              backend architecture and thoughtful interface design.
            </p>
          </div>
        </motion.div>
      </div>

      <FoldImageGallery
        projects={foldProjects}
        strips={5}
        angle={60}
        smoothScroll={false}
        className="portfolio-fold-gallery w-full"
      />

      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={homeViewport}
        className="flex w-full flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            Want to see more?
          </span>
          <p className="mt-2 text-sm text-muted">
            Explore the complete project archive.
          </p>
        </div>

        <Link
          href="/projects"
          className="group flex h-12 w-full items-center justify-between gap-9 bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 sm:w-auto"
        >
          All Projects
          <FiArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </motion.div>
    </section>
  );
}
