"use client";

import { memo, useState, type CSSProperties, type Ref } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiMysql,
  SiCss,
  SiHtml5,
  SiLaravel,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiRabbitmq,
  SiLinux,
  SiSqlite,
  SiSupabase,
  SiBetterauth,
  SiC,
  SiCloudinary,
  SiCplusplus,
  SiFramer,
  SiGithub,
  SiGnu,
  SiJsonwebtokens,
  SiNginx,
  SiReacthookform,
  SiRedis,
  SiResend,
  SiVercel,
  SiZod,
} from "react-icons/si";
import {
  FiArrowUpRight,
  FiCalendar,
  FiDatabase,
  FiServer,
  FiShare2,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import {
  revealUp,
  siteEase as homeEase,
  siteViewport as homeViewport,
} from "@/lib/site-motion";
import { skillFilters, technicalSkills } from "@/data/portfolio";

type Category = (typeof skillFilters)[number];
type SkillDefinition = (typeof technicalSkills)[number];
type SkillName = SkillDefinition["name"];

type Skill = SkillDefinition & {
  icon: IconType;
};

const skillIcons = {
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  PHP: SiPhp,
  "Tailwind CSS": SiTailwindcss,
  HTML5: SiHtml5,
  CSS3: SiCss,
  "Framer Motion": SiFramer,
  NestJS: SiNestjs,
  Laravel: SiLaravel,
  "REST APIs": FiServer,
  Microservices: FiShare2,
  "Better Auth": SiBetterauth,
  JWT: SiJsonwebtokens,
  RabbitMQ: SiRabbitmq,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  SQL: FiDatabase,
  Redis: SiRedis,
  Prisma: SiPrisma,
  Supabase: SiSupabase,
  C: SiC,
  "C++": SiCplusplus,
  Docker: SiDocker,
  Linux: SiLinux,
  NGINX: SiNginx,
  Git: SiGit,
  GitHub: SiGithub,
  Makefile: SiGnu,
  Vercel: SiVercel,
  Resend: SiResend,
  Cloudinary: SiCloudinary,
  Zod: SiZod,
  "React Hook Form": SiReacthookform,
} satisfies Record<SkillName, IconType>;

const skills: Skill[] = technicalSkills.map((skill) => ({
  ...skill,
  icon: skillIcons[skill.name],
}));

const skillColors = {
  "React.js": { light: "#087ea4", dark: "#61dafb" },
  "Next.js": { light: "#111827", dark: "#f8fafc" },
  TypeScript: { light: "#3178c6", dark: "#60a5d8" },
  JavaScript: { light: "#b38f00", dark: "#f7df1e" },
  PHP: { light: "#4f5b93", dark: "#8892bf" },
  "Tailwind CSS": { light: "#0891b2", dark: "#38bdf8" },
  HTML5: { light: "#d94820", dark: "#ff704d" },
  CSS3: { light: "#1565b5", dark: "#58a6e7" },
  "Framer Motion": { light: "#0055ff", dark: "#66a3ff" },
  NestJS: { light: "#d91a4d", dark: "#f0446e" },
  Laravel: { light: "#e6291e", dark: "#ff6b63" },
  "REST APIs": { light: "#087f5b", dark: "#3dd6a2" },
  Microservices: { light: "#6d3fc0", dark: "#a78bfa" },
  "Better Auth": { light: "#111827", dark: "#f8fafc" },
  JWT: { light: "#9c2bc2", dark: "#d875f2" },
  RabbitMQ: { light: "#e85d00", dark: "#ff8a3d" },
  PostgreSQL: { light: "#336791", dark: "#74a6cf" },
  MySQL: { light: "#006f8c", dark: "#4db8d1" },
  SQLite: { light: "#0f80cc", dark: "#58b4e8" },
  SQL: { light: "#336791", dark: "#7fb3d5" },
  Redis: { light: "#b8322a", dark: "#ff6259" },
  Prisma: { light: "#2d3748", dark: "#d7dde5" },
  Supabase: { light: "#168f63", dark: "#3ecf8e" },
  C: { light: "#536879", dark: "#a8b9cc" },
  "C++": { light: "#00599c", dark: "#659ad2" },
  Docker: { light: "#1473e6", dark: "#60aef5" },
  Linux: { light: "#3b4252", dark: "#facc15" },
  NGINX: { light: "#087f32", dark: "#35c766" },
  Git: { light: "#e44d2e", dark: "#ff765b" },
  GitHub: { light: "#181717", dark: "#f0f6fc" },
  Makefile: { light: "#8f2f2b", dark: "#e87971" },
  Vercel: { light: "#111827", dark: "#f8fafc" },
  Resend: { light: "#111827", dark: "#f8fafc" },
  Cloudinary: { light: "#3448c5", dark: "#7c8cff" },
  Zod: { light: "#3e67b1", dark: "#7da6ef" },
  "React Hook Form": { light: "#d63f79", dark: "#ec5990" },
} satisfies Record<SkillName, { light: string; dark: string }>;

const categories: Category[] = [...skillFilters];

const skillsByCategory = Object.fromEntries(
  categories.map((category) => [
    category,
    category === "All" ? skills : skills.filter((skill) => skill.category === category),
  ]),
) as Record<Category, Skill[]>;

/* ----------------------------------
   SKILL CARD
----------------------------------- */

// React 19 passes ref as a prop. popLayout needs the direct child's DOM node.
const SkillCard = memo(function SkillCard({
  skill,
  index,
  ref,
}: {
  skill: Skill;
  index: number;
  ref?: Ref<HTMLDivElement>;
}) {
  const Icon = skill.icon;
  const colors = skillColors[skill.name];
  const colorVariables = {
    "--skill-light": colors.light,
    "--skill-dark": colors.dark,
  } as CSSProperties;

  return (
    <motion.div
      ref={ref}
      layout="position"
      initial={{ opacity: 0, y: 38, scale: 0.94, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={homeViewport}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{
        duration: 0.62,
        delay: Math.min(index * 0.045, 0.32),
        ease: homeEase,
      }}
      style={colorVariables}
      className="skill-card group relative flex min-h-[185px] flex-col justify-between overflow-hidden border border-border bg-background p-4 transition-colors duration-300 min-[380px]:min-h-[205px] min-[380px]:p-5 sm:min-h-[230px] sm:p-6"
    >
      {/* BACKGROUND ICON */}
      <div className="skill-icon-wash pointer-events-none absolute -bottom-7 -right-6 text-[130px] opacity-[0.055] transition-transform duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[-12deg]">
        <Icon />
      </div>

      {/* CARD HEADER */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.15em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="skill-card-arrow flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300">
          <FiArrowUpRight size={14} />
        </div>
      </div>

      {/* MAIN ICON */}
      <div className="relative z-10 flex flex-1 items-center">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.12 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 18,
          }}
          className="skill-icon text-[44px] transition-colors duration-300 sm:text-[52px]"
        >
          <Icon />
        </motion.div>
      </div>

      {/* CARD FOOTER */}
      <div className="relative z-10 border-t border-border pt-4 transition-colors duration-300">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-medium tracking-[-0.03em] text-foreground sm:text-lg">
              {skill.name}
            </h3>

            <p className="mt-1 hidden text-[11px] text-muted min-[380px]:block">{skill.description}</p>
          </div>

          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
            {skill.category}
          </span>
        </div>
      </div>

      {/* HOVER ACCENT LINE */}
      <div className="skill-accent absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
});

/* ----------------------------------
   CATEGORY FILTERS
----------------------------------- */

function CategoryFilters({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}) {
  return (
    <div className="mb-8 border-b border-border">
      {/* FILTER HEADER */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-muted">
          Filter technologies
        </span>

        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          Select category
        </span>
      </div>

      {/* FILTER NAVIGATION */}
      <div
        role="group"
        aria-label="Filter skills by category"
        className="flex items-center gap-6 overflow-x-auto"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              className={`group relative flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap py-2 font-mono text-[11px] transition-colors duration-300 ${isActive
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
                }`}
            >
              {/* CATEGORY NAME */}
              <span>{category}</span>

              {/* CATEGORY COUNT */}
              <span
                className={`text-[9px] transition-colors duration-300 ${isActive
                    ? "text-accent"
                    : "text-muted/50 group-hover:text-foreground/60"
                  }`}
              >
                {String(skillsByCategory[category].length).padStart(2, "0")}
              </span>

              {/* ANIMATED UNDERLINE */}
              {isActive && (
                <motion.span
                  layoutId="active-skill-underline"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------
   MAIN SKILLS SHOWCASE
----------------------------------- */

export default function SkillsShowcase() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="w-full">
        {/* TOP SECTION LABEL */}
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
              Technical toolkit
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            03 / 06
          </span>
        </motion.div>

        {/* FULL-WIDTH HEADER */}
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
                <span className="home-title-line">SKILLS &amp;</span>
                <span className="home-title-line text-accent">
                  TECHNOLOGIES.
                </span>
              </h2>
            </div>
          </div>

          <div className="lg:pb-1">
            <div className="mb-6 h-px w-12 bg-accent" />
            <p className="max-w-md text-sm leading-7 text-muted">
              A focused toolkit for building reliable interfaces, backend
              services, data layers, and production-ready applications.
            </p>
          </div>
        </motion.div>

        <SkillsFilterGrid />
      </div>
    </section>
  );
}

function SkillsFilterGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const filteredSkills = skillsByCategory[activeCategory];

  return (
    <div className="min-w-0 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={homeViewport}
        transition={{ duration: 0.7, ease: homeEase }}
      >
        <CategoryFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </motion.div>

      <div
        className="relative grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:gap-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          Always learning. Always building.
        </span>

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            Showing {filteredSkills.length} of {skills.length}
          </span>
        </div>
      </div>
    </div>
  );
}
