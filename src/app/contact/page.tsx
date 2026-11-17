"use client";

import { motion } from "framer-motion";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";

import {
  portfolioYear,
  profile,
  socialLinks as portfolioSocialLinks,
} from "@/data/portfolio";
import { siteEase } from "@/lib/site-motion";

const contactInfo = [
  {
    number: "01",
    icon: FiMail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    number: "02",
    icon: FiPhone,
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
  },
  {
    number: "03",
    icon: FiMapPin,
    label: "Location",
    value: profile.location,
    href: null,
  },
];

const socialLinks = [
  { name: "GitHub", icon: FiGithub, href: portfolioSocialLinks[0].href },
  { name: "LinkedIn", icon: FiLinkedin, href: portfolioSocialLinks[1].href },
];

const fields = [
  { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Project inquiry",
  },
] as const;

const fieldClass =
  "h-14 w-full border-0 border-b border-border bg-transparent px-0 text-sm text-foreground outline-none transition-colors placeholder:text-muted/55 hover:border-muted focus:border-accent";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(formData.subject || "Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="home-tone-dark relative min-h-screen overflow-hidden px-5 pb-8 sm:px-8 lg:px-12">
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1440 680"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] w-full"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.path
          d="M104 0 C110 155 190 228 390 258 C640 296 870 232 1024 342 C1138 424 1054 532 892 492 C760 460 784 382 908 388 C1106 396 1260 520 1340 680"
          stroke="#ff3b1f"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.4, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.4 },
          }}
        />
      </motion.svg>

      <section className="relative z-10 border-b border-border py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <PageTitle
              lines={["LET’S", <span className="text-accent" key="connect">CONNECT.</span>]}
              className="font-display text-[clamp(3rem,11vw,10.5rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.08em] min-[380px]:text-[clamp(3.5rem,11vw,10.5rem)]"
            />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: siteEase }}
            className="max-w-md lg:pb-2"
          >
            <div className="mb-6 h-px w-12 bg-accent" />
            <p className="text-sm leading-7 text-muted sm:text-base">
              Have a project, idea, or opportunity? Tell me what you&apos;re
              working on and let&apos;s make it real.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 grid border-b border-border lg:grid-cols-[0.72fr_1.28fr]">
        <motion.aside
          initial={{ opacity: 0, x: -34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: siteEase }}
          className="border-b border-border py-12 lg:border-b-0 lg:border-r lg:py-16 lg:pr-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Direct lines
          </p>

          <div className="mt-7 border-t border-border">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <>
                  <span className="font-mono text-[9px] text-muted">
                    {info.number}
                  </span>
                  <Icon size={17} className="text-accent" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      {info.label}
                    </span>
                    <span className="mt-1 block break-all text-sm text-foreground">
                      {info.value}
                    </span>
                  </span>
                  {info.href && (
                    <FiArrowUpRight className="ml-auto text-muted" />
                  )}
                </>
              );
              return info.href ? (
                <a
                  key={info.label}
                  href={info.href}
                  className="grid min-h-14 grid-cols-[24px_24px_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-4 transition-colors hover:text-accent sm:grid-cols-[32px_28px_1fr_auto] sm:gap-3 sm:py-5"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={info.label}
                  className="grid min-h-14 grid-cols-[24px_24px_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-4 sm:grid-cols-[32px_28px_1fr_auto] sm:gap-3 sm:py-5"
                >
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-10 border-l-2 border-accent pl-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Available for selected opportunities
              </span>
            </div>
          </div>

          <div className="mt-10 flex gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 min-w-0 flex-1 items-center justify-center gap-2 border border-border px-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted transition-all hover:border-accent hover:text-accent sm:flex-none sm:gap-3 sm:px-4 sm:tracking-[0.14em]"
                >
                  <Icon size={15} />
                  {social.name}
                  <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.32, ease: siteEase }}
          className="py-12 lg:py-16 lg:pl-12"
        >
          <div className="flex items-end justify-between border-b border-border pb-7">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                Message / 001
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.3rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                TELL ME ABOUT
                <br />
                <span className="text-muted">YOUR PROJECT.</span>
              </h2>
            </div>
            <FiMail size={23} className="mb-1 text-accent" />
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {fields.map((field, index) => (
                <label
                  key={field.name}
                  htmlFor={field.name}
                  className={field.name === "subject" ? "sm:col-span-2" : ""}
                >
                  <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {field.label}
                    <span className="text-accent">0{index + 1}</span>
                  </span>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={
                      field.name === "name"
                        ? "name"
                        : field.name === "email"
                          ? "email"
                          : undefined
                    }
                    placeholder={field.placeholder}
                    required
                    value={formData[field.name]}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                    className={fieldClass}
                  />
                </label>
              ))}

              <label htmlFor="message" className="sm:col-span-2">
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Your Message<span className="text-accent">04</span>
                </span>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your idea, project, or opportunity..."
                  required
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  className="mt-3 min-h-40 w-full resize-y border-0 border-b border-border bg-transparent px-0 py-3 text-sm leading-7 text-foreground outline-none transition-colors placeholder:text-muted/55 hover:border-muted focus:border-accent"
                />
              </label>
            </div>

            <div className="mt-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <p className="max-w-xs font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-muted">
                Opens your email application with the message prepared.
              </p>
              <motion.button
                type="submit"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group flex h-14 w-full items-center justify-between gap-5 bg-accent px-6 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:h-16 sm:w-auto sm:min-w-52 sm:gap-10"
              >
                Send Message
                <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      <footer className="relative z-10 flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          {profile.name} © {portfolioYear}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          {profile.location}
        </span>
      </footer>
    </main>
  );
}
