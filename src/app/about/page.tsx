"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiDownload,
  FiArrowDown,
} from "react-icons/fi";

import { profile } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    id: "01",
    title: "Clarity before complexity",
    text: "Understand the real problem before choosing a solution.",
  },
  {
    id: "02",
    title: "Ownership end to end",
    text: "Build thoughtful interfaces backed by reliable systems.",
  },
  {
    id: "03",
    title: "Useful over impressive",
    text: "Prioritize simplicity, performance and maintainability.",
  },
];

const process = [
  {
    id: "01",
    title: "Understand",
    text: "Explore the problem and define the goal.",
  },
  {
    id: "02",
    title: "Shape",
    text: "Design the architecture and user experience.",
  },
  {
    id: "03",
    title: "Build",
    text: "Develop clean and maintainable solutions.",
  },
  {
    id: "04",
    title: "Refine",
    text: "Test, improve and simplify the result.",
  },
];

const facts = [
  { label: "Location", value: profile.location },
  { label: "Education", value: profile.school },
  { label: "Focus", value: "Backend & architecture" },
  { label: "Status", value: "Open to opportunities" },
];

export default function AboutPage() {
  return (
    <main className="home-tone-dark relative min-h-screen overflow-hidden px-5 pb-8 sm:px-8 lg:px-12">
      <section className="relative border-b border-border pb-12 pt-10 sm:pb-16 sm:pt-14 lg:min-h-[760px] lg:pb-20 lg:pt-16">
        {/* ABSTRACT FLOWING THREAD */}
        <div className="pointer-events-none absolute inset-y-0 right-[-7rem] z-0 w-[68%] min-w-[620px] opacity-85 max-lg:right-[-14rem] max-md:hidden">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 1440 680"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] w-full"
            fill="none"
            animate={{
              y: [0, -7, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.path
              d="
      M 180 -40
      C 160 120, 390 150, 550 230
      C 760 335, 500 400, 385 460
      C 250 535, 435 610, 705 550
      C 950 495, 1040 385, 1190 455
      C 1330 520, 1290 620, 1400 730
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
                  duration: 2.7,
                  ease: [0.65, 0, 0.35, 1],
                },
                opacity: {
                  duration: 0.5,
                },
              }}
            />
          </motion.svg>
        </div>

        <div className="relative z-10 grid min-h-[610px] items-end gap-12 pt-16 lg:grid-cols-[1.35fr_0.65fr] lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
          >
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-10 bg-accent" />
              The person behind the work
            </p>
            <h1 className="font-display text-[clamp(4rem,10.5vw,10.5rem)] font-black uppercase leading-[0.77] tracking-[-0.075em]">
              Human
              <br />
              behind
              <br />
              the code<span className="text-accent">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease }}
            className="max-w-md border-l border-border pl-6 lg:mb-4 lg:justify-self-end"
          >
            <p className="text-lg font-medium leading-relaxed sm:text-xl">
              I build digital products where clear thinking, useful design and
              reliable engineering meet.
            </p>
          </motion.div>
        </div>
        {/* BOTTOM CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.85,
            delay: 0.75,
            ease,
          }}
          className="relative z-10 flex flex-col gap-10 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-end"
        >
          {/* RIGHT — SCROLL INDICATOR */}
          <motion.a
            href="#story"
            className="group inline-flex w-fit items-center gap-5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Scroll To Read The Story
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex text-accent"
            >
              <FiArrowDown size={17} />
            </motion.span>
          </motion.a>
        </motion.div>
      </section>

      <section className="relative grid border-b border-border lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="relative min-h-[560px] overflow-hidden bg-[#090909] lg:min-h-[760px]"
        >
          <Image
            src="/my_images/meme.png"
            alt={`${profile.name}, full-stack developer`}
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-contain object-bottom transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 border border-white/20 bg-black/50 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur sm:left-8 sm:top-8">
            Portrait / 001
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/20 pt-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
            <span className="font-display text-2xl font-bold uppercase">
              {profile.name}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
              BA / MA
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="flex flex-col justify-between py-12 lg:py-16 lg:pl-12 xl:pl-20"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              01 / Profile
            </p>
            <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,5vw,5.5rem)] font-black uppercase leading-[0.91] tracking-[-0.055em]">
              Complex ideas.
              <br />
              Simple digital
              <br />
              experiences.
            </h2>

            <div className="mt-10 grid gap-6 border-t border-border pt-8 text-sm leading-7 text-muted-foreground xl:grid-cols-2 xl:text-base xl:leading-8">
              <p>{profile.summary}</p>
              <p>
                After completing Web Full Stack training at OFPPT in{" "}
                {profile.graduationYear}, I continued project-based software
                engineering studies at {profile.school}, part of the 42 Network,
                with a focus on systems, networking, infrastructure and
                collaborative development.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 border-l border-t border-border">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className="min-h-28 border-b border-r border-border p-4 sm:p-5"
                >
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-accent sm:text-[9px]">
                    0{index + 1} / {fact.label}
                  </p>
                  <p className="mt-4 text-sm font-semibold leading-5 sm:text-base">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={profile.resumePath}
              download
              className="group inline-flex h-12 items-center gap-10 bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-accent"
            >
              Download CV
              <FiDownload size={17} />
            </a>
            <Link
              href="/projects"
              className="group inline-flex h-12 items-center gap-10 border border-border px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              View projects
              <FiArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-12 border-b border-border py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-24">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            02 / Principles
          </p>
          <h2 className="mt-7 font-display text-[clamp(3.5rem,7vw,7.5rem)] font-black uppercase leading-[0.8] tracking-[-0.065em]">
            How I
            <br />
            think<span className="text-accent">.</span>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-7 text-muted-foreground">
            Good software starts with good decisions. These ideas guide the way
            I approach every build.
          </p>
        </div>

        <div className="border-t border-border">
          {principles.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease }}
              className="group grid gap-4 border-b border-border py-7 sm:grid-cols-[54px_1fr_1.1fr] sm:items-start lg:py-9"
            >
              <span className="font-mono text-[10px] text-accent">
                {item.id}
              </span>
              <h3 className="font-display text-xl font-bold uppercase tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-16 lg:py-24">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              03 / Process
            </p>
            <h2 className="mt-7 font-display text-[clamp(3.5rem,7vw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
              From idea
              <br />
              to reality<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            A direct process for understanding, building and improving useful
            products.
          </p>
        </div>

        <div className="grid gap-px bg-[#3a3a3a] sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease }}
              className="group flex min-h-[280px] flex-col justify-between bg-[#090909] p-6 text-[#f2efe7] transition-colors duration-300 hover:bg-[#151515] lg:min-h-[340px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent">
                  {item.id}
                </span>
                <FiArrowUpRight className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold uppercase tracking-[-0.04em]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[15rem] text-sm leading-7 text-white/55">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="relative overflow-hidden bg-accent px-6 py-12 text-[#090909] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -right-8 -top-20 font-display text-[15rem] font-black leading-none text-black/[0.06] sm:text-[22rem]">
            ?
          </div>
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
                04 / Next chapter
              </p>
              <h2 className="mt-7 font-display text-[clamp(3.25rem,7vw,7.25rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                Let&apos;s make
                <br />
                something useful.
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-14 w-fit items-center gap-12 bg-[#090909] px-6 text-sm font-semibold text-[#f2efe7] transition-transform hover:-translate-y-1"
            >
              Start a conversation
              <FiArrowRight
                className="transition-transform group-hover:translate-x-1"
                size={19}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
