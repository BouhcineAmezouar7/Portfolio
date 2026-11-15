"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

import { projects, projectFilters } from "@/data/portfolio";
import { siteEase } from "@/lib/site-motion";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  function changeFilter(filter: string) {
    setActiveFilter(filter);
  }

  return (
    <main className="home-tone-dark relative min-h-screen overflow-hidden px-5 pb-8 text-foreground sm:px-8 lg:px-12">
      <section className="relative min-h-[720px] border-b border-border py-10 sm:py-14 lg:min-h-[800px] lg:py-16">
        {/* ABSTRACT INFINITY RIBBON */}

        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1440 680"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] w-full"
          fill="none"
          animate={{
            y: [0, 8, 0],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.path
            d="
      M 1180 -30
      C 1160 130, 920 150, 780 250
      C 630 360, 830 440, 1050 380
      C 1270 320, 1330 470, 1150 540
      C 970 610, 760 520, 610 610
      C 560 640, 530 670, 500 720
    "
            stroke="#ff3b1f"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              pathLength: {
                duration: 2.6,
                ease: [0.65, 0, 0.35, 1],
              },
              opacity: {
                duration: 0.5,
              },
            }}
          />
        </motion.svg>

        <div className="relative z-10 grid min-h-[620px] w-[calc(100vw-2.5rem)] min-w-0 items-end gap-12 pt-16 sm:w-full lg:grid-cols-[1.35fr_0.65fr] lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: siteEase }}
          >
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-10 bg-accent" />
              Products · systems · experiments
            </p>
            <h1 className="font-display text-[clamp(4.4rem,12vw,11.5rem)] font-black uppercase leading-[0.75] tracking-[-0.08em]">
              Work
              <br />
              index<span className="text-accent">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: siteEase }}
            className="min-w-0 max-w-full border-l border-border pl-6 lg:mb-3 lg:justify-self-end"
          >
            <p className="max-w-md break-words text-sm leading-7 text-muted sm:text-lg sm:leading-8">
              Full-stack products, low-level systems and infrastructure
              work—each built to understand how useful software behaves from
              interface to core.
            </p>
            <div className="mt-7 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">
                {String(projects.length).padStart(2, "0")}
              </span>
              <span>Case studies</span>
              <FiArrowDown className="text-accent" size={15} />
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="border-b border-border py-6"
        aria-label="Project filters"
      >
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Choose a discipline
          </p>
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((filter) => {
              const active = activeFilter === filter;
              const count =
                filter === "All"
                  ? projects.length
                  : projects.filter((project) => project.category === filter)
                      .length;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => changeFilter(filter)}
                  aria-pressed={active}
                  className={`group flex items-center gap-3 border px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors sm:text-[10px] ${
                    active
                      ? "border-accent bg-accent text-[#090909]"
                      : "border-border text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {filter}
                  <span className={active ? "text-black/55" : "text-accent/70"}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects-list" className="scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: siteEase }}
          >
            {filteredProjects.map((project, index) => {
              const imageOnRight = index % 2 === 1;

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: siteEase }}
                  className="relative grid min-h-[640px] overflow-hidden border-b border-border py-10 lg:grid-cols-2 lg:gap-12 lg:py-14 xl:min-h-[720px]"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.title} project`}
                    className={`group/image relative z-10 min-h-[340px] overflow-hidden bg-card lg:min-h-0 ${
                      imageOnRight ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                    <span className="absolute left-5 top-5 border border-white/25 bg-black/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      Project / {project.number}
                    </span>
                    <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-accent text-[#090909] transition-transform duration-300 group-hover/image:-translate-y-1 group-hover/image:translate-x-1">
                      <FiArrowUpRight size={20} />
                    </span>
                  </Link>

                  <div
                    className={`relative z-10 flex flex-col justify-between pt-9 lg:py-8 ${
                      imageOnRight ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-5 border-b border-border pb-5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      <span className="text-accent">{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="py-10 lg:py-0">
                      <span className="font-display text-[clamp(4rem,8vw,8rem)] font-black leading-none tracking-[-0.07em] text-white/[0.055]">
                        {project.number}
                      </span>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/title block"
                      >
                        <h2 className="-mt-7 max-w-2xl font-display text-[clamp(2.8rem,5.8vw,6.3rem)] font-black uppercase leading-[0.84] tracking-[-0.065em] transition-colors duration-300 group-hover/title:text-accent lg:-mt-10">
                          {project.title}
                          <span className="text-accent">.</span>
                        </h2>
                      </Link>
                      <p className="mt-7 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
                          >
                            <span className="mr-2 text-accent">+</span>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/link mt-7 inline-flex items-center gap-8 border-b border-accent pb-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-accent"
                      >
                        Read case study
                        <FiArrowUpRight
                          className="text-accent transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                          size={17}
                        />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="border-b border-border py-24 text-center">
            <p className="text-sm text-muted">
              No projects found in this category.
            </p>
            <button
              type="button"
              onClick={() => changeFilter("All")}
              className="mt-5 border-b border-accent pb-1 text-sm font-medium text-accent"
            >
              View all projects
            </button>
          </div>
        )}
      </section>

      <section className="py-8">
        <div className="relative overflow-hidden bg-[#f2efe7] px-6 py-12 text-[#090909] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -right-4 -top-20 font-display text-[16rem] font-black leading-none text-black/[0.05] sm:text-[23rem]">
            +
          </div>
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff3b1f]">
                New project / New conversation
              </p>
              <h2 className="mt-7 font-display text-[clamp(3.2rem,7vw,7.2rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                Have something
                <br />
                worth building?
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-14 w-fit items-center gap-12 bg-[#ff3b1f] px-6 text-sm font-semibold text-[#090909] transition-transform hover:-translate-y-1"
            >
              Start a conversation
              <FiArrowUpRight
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                size={19}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
