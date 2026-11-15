import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import SiteReveal from "@/components/SiteReveal";
import { projects } from "@/data/portfolio";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Project Details`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const diagram =
    "diagram" in project && typeof project.diagram === "string"
      ? project.diagram
      : null;

  return (
    <main className="home-tone-dark relative min-h-screen overflow-hidden px-5 pb-8 text-foreground sm:px-8 lg:px-12">
      <section className="relative flex min-h-[calc(100svh-80px)] flex-col border-b border-border">
        <SiteReveal>
          <div className="relative z-10 grid min-h-14 grid-cols-2 border-y border-border sm:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/projects"
              className="group col-start-1 row-start-1 flex min-w-0 items-center gap-3 border-r border-border pr-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground sm:col-start-auto sm:row-start-auto sm:pr-5 sm:text-[10px]"
            >
              <span className="flex h-11 w-11 items-center justify-center border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-[#090909]">
                <FiArrowLeft
                  className="transition-transform group-hover:-translate-x-0.5"
                  size={14}
                />
              </span>
              Work index
            </Link>

            <span className="hidden items-center px-8 font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:flex">
              Selected project / Case study
            </span>

            <div className="col-start-2 row-start-1 flex min-w-0 items-center justify-end gap-3 overflow-hidden border-l border-border pl-3 font-mono text-[9px] uppercase tracking-[0.18em] sm:col-start-auto sm:row-start-auto sm:pl-5 sm:text-[10px]">
              <span className="hidden text-muted sm:inline">Archive</span>
              <span className="text-accent">
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </SiteReveal>

        <div className="relative z-10 grid flex-1 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <SiteReveal
            direction="left"
            className="flex min-w-0 flex-col justify-between py-12 pr-0 sm:py-16 lg:py-20 lg:pr-12"
          >
            <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px]">
              <span className="h-2 w-2 bg-accent" />
              {project.category}
              <span className="h-px w-12 bg-accent/70" />
            </div>

            <h1 className="my-12 max-w-[11ch] break-words font-display text-[clamp(3.1rem,12vw,12.5rem)] font-black uppercase leading-[0.72] tracking-[-0.085em] min-[380px]:text-[clamp(3.6rem,12vw,12.5rem)] sm:my-16">
              {project.title}
              <span className="text-accent">.</span>
            </h1>

            <div className="flex flex-col justify-between gap-7 border-t border-border pt-6 sm:flex-row sm:items-end">
              <p className="max-w-lg font-display text-lg font-semibold leading-tight tracking-[-0.03em] sm:text-2xl">
                {project.type}
              </p>
              <a
                href="#case-study"
                className="group inline-flex min-h-11 w-fit items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
              >
                View case study
                <span className="flex h-11 w-11 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-[#090909]">
                  <FiArrowDown size={14} />
                </span>
              </a>
            </div>
          </SiteReveal>

          <SiteReveal
            direction="right"
            delay={0.12}
            className="flex min-w-0 flex-col border-t border-border lg:border-l lg:border-t-0"
          >
            <div className="relative flex min-h-48 flex-1 items-center justify-center overflow-hidden border-b border-border bg-card/30 lg:min-h-0">
              <span className="font-display text-[clamp(8rem,19vw,16rem)] font-black leading-none tracking-[-0.1em] text-transparent [-webkit-text-stroke:1px_var(--accent)]">
                {project.number}
              </span>
              <span className="absolute bottom-5 left-5 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">
                Project number
              </span>
            </div>

            <dl className="grid grid-cols-2 font-mono text-[9px] uppercase tracking-[0.15em] lg:grid-cols-1">
              <div className="border-b border-r border-border p-5 lg:border-r-0">
                <dt className="text-muted">Status / Year</dt>
                <dd className="mt-3 text-accent">{project.year}</dd>
              </div>
              <div className="border-b border-border p-5">
                <dt className="text-muted">Stack size</dt>
                <dd className="mt-3 text-accent">
                  {String(project.tags.length).padStart(2, "0")} tools
                </dd>
              </div>
              <div className="col-span-2 p-5 lg:col-span-1">
                <dt className="text-muted">Discipline</dt>
                <dd className="mt-3 text-foreground">{project.category}</dd>
              </div>
            </dl>
          </SiteReveal>
        </div>
      </section>

      <SiteReveal className="border-b border-border py-5 sm:py-8">
        <figure className="relative overflow-hidden bg-card">
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/8] lg:aspect-[16/7]">
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <figcaption className="absolute left-4 top-4 border border-white/25 bg-black/50 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.17em] text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:text-[9px]">
            Product view / {project.number}
          </figcaption>
        </figure>
      </SiteReveal>

      <div id="case-study" className="scroll-mt-24">
        <section className="home-tone-light -mx-5 grid gap-12 border-b border-border px-5 py-16 sm:-mx-8 sm:px-8 lg:-mx-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-12 lg:py-24">
          <SiteReveal direction="left">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              01 / The build
            </p>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,7vw,7.5rem)] font-black uppercase leading-[0.8] tracking-[-0.07em]">
              Project
              <br />
              scope<span className="text-accent">.</span>
            </h2>
          </SiteReveal>

          <SiteReveal direction="right" delay={0.08}>
            <p className="max-w-4xl font-display text-[clamp(1.65rem,3vw,3.25rem)] font-semibold leading-[1.18] tracking-[-0.045em]">
              {project.description}
            </p>
            <div className="mt-12 grid border-l border-t border-border sm:grid-cols-3">
              {[
                { label: "Type", value: project.type },
                { label: "Discipline", value: project.category },
                { label: "Archive", value: project.year },
              ].map((item, itemIndex) => (
                <div key={item.label} className="min-h-32 border-b border-r border-border p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-accent">
                    0{itemIndex + 1} / {item.label}
                  </p>
                  <p className="mt-5 text-sm font-semibold leading-6">{item.value}</p>
                </div>
              ))}
            </div>
          </SiteReveal>
        </section>

        <section className="home-tone-light -mx-5 border-b border-border px-5 py-16 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 lg:py-24">
          <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <SiteReveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                02 / Outcomes
              </p>
              <h2 className="mt-7 font-display text-[clamp(2.75rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                What was
                <br />
                built<span className="text-accent">.</span>
              </h2>
            </SiteReveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted">
              {String(project.highlights.length).padStart(2, "0")} core outcomes
            </p>
          </div>

          <div className="border-t border-border">
            {project.highlights.map((highlight, highlightIndex) => (
              <SiteReveal
                key={`${highlightIndex}-${highlight}`}
                direction={highlightIndex % 2 === 0 ? "right" : "left"}
                delay={highlightIndex * 0.04}
              >
                <article className="group grid gap-5 border-b border-border py-7 sm:grid-cols-[72px_1fr_auto] sm:items-center lg:py-9">
                  <span className="font-mono text-[10px] text-accent">
                    {String(highlightIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-5xl font-display text-xl font-semibold leading-tight tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl lg:text-3xl">
                    {highlight}
                  </p>
                  <span className="hidden h-3 w-3 rounded-full border-2 border-accent sm:block" />
                </article>
              </SiteReveal>
            ))}
          </div>
        </section>

        <section className="relative border-b border-border py-16 lg:py-24">
          <svg
            aria-hidden="true"
            viewBox="0 0 700 500"
            fill="none"
            className="pointer-events-none absolute -right-36 top-1/2 z-0 hidden h-[95%] w-[55%] -translate-y-1/2 lg:block"
          >
            <path
              d="M742 105C576 95 448 133 430 248C412 363 537 421 626 358C715 295 657 192 569 200C481 208 449 316 519 362C589 408 670 352 654 282C638 212 553 196 510 242"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SiteReveal direction="left">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                03 / Technology
              </p>
              <h2 className="mt-7 font-display text-[clamp(2.75rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                Built
                <br />
                with<span className="text-accent">.</span>
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-7 text-muted">
                The tools and technologies used across the interface, application
                logic and supporting systems.
              </p>
            </SiteReveal>

            <SiteReveal direction="right" delay={0.08}>
              <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3">
                {project.tags.map((tag, tagIndex) => (
                  <div
                    key={`${tag}-${tagIndex}`}
                    className="group flex min-h-36 flex-col justify-between border-b border-r border-border bg-background/90 p-5 transition-colors hover:bg-card lg:min-h-44"
                  >
                    <span className="font-mono text-[9px] text-accent">
                      {String(tagIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="break-words font-display text-base font-bold uppercase tracking-[-0.025em] transition-transform group-hover:-translate-y-1 sm:text-lg">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </SiteReveal>
          </div>
        </section>

        {diagram && (
          <section className="home-tone-light -mx-5 border-b border-border px-5 py-16 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 lg:py-24">
            <SiteReveal>
              <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    04 / Architecture
                  </p>
                  <h2 className="mt-7 font-display text-[clamp(2.75rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                    Under the hood<span className="text-accent">.</span>
                  </h2>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted">
                  Technical diagram
                </span>
              </div>
              <div className="relative aspect-[640/312] overflow-hidden border border-border bg-white">
                <Image
                  src={diagram}
                  alt={`${project.title} architecture diagram`}
                  fill
                  sizes="100vw"
                  className="object-contain p-4 sm:p-8"
                />
              </div>
            </SiteReveal>
          </section>
        )}
      </div>

      <SiteReveal>
        <nav aria-label="Project navigation" className="grid border-b border-border lg:grid-cols-2">
          <div className="border-b border-border lg:border-b-0 lg:border-r">
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="group grid min-h-[210px] grid-cols-[1fr_0.72fr] overflow-hidden sm:min-h-[250px]"
              >
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <span className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.17em] text-muted">
                    <FiArrowLeft className="transition-transform group-hover:-translate-x-1" size={15} />
                    Previous
                  </span>
                  <span className="font-display text-2xl font-bold uppercase leading-none tracking-[-0.05em] transition-colors group-hover:text-accent sm:text-4xl">
                    {previous.title}
                  </span>
                </div>
                <div className="relative min-h-full overflow-hidden bg-card">
                  <Image
                    src={previous.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ) : (
              <div className="flex min-h-[210px] items-end p-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:min-h-[250px] sm:p-8">
                Beginning of archive
              </div>
            )}
          </div>

          <div>
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group grid min-h-[210px] grid-cols-[0.72fr_1fr] overflow-hidden sm:min-h-[250px]"
              >
                <div className="relative min-h-full overflow-hidden bg-card">
                  <Image
                    src={next.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col items-end justify-between p-6 text-right sm:p-8">
                  <span className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.17em] text-muted">
                    Next
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
                  </span>
                  <span className="font-display text-2xl font-bold uppercase leading-none tracking-[-0.05em] transition-colors group-hover:text-accent sm:text-4xl">
                    {next.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex min-h-[210px] items-end justify-end p-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:min-h-[250px] sm:p-8">
                End of archive
              </div>
            )}
          </div>
        </nav>
      </SiteReveal>

      <section className="py-8">
        <div className="relative overflow-hidden bg-accent px-6 py-12 text-[#090909] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -right-8 -top-20 font-display text-[18rem] font-black leading-none text-black/[0.06] sm:text-[24rem]">
            +
          </div>
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
                Next collaboration
              </p>
              <h2 className="mt-7 font-display text-[clamp(2.6rem,7vw,7.2rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                Have something
                <br />
                worth building?
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-14 w-full items-center justify-between gap-5 bg-[#090909] px-6 text-sm font-semibold text-[#f2efe7] transition-transform hover:-translate-y-1 sm:w-fit sm:gap-12"
            >
              Start a conversation
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={19} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
