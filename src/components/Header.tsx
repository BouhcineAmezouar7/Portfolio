
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import Nav from "./Nav";
import MobileNav from "./MobileNav";
import BrandLogo from "./MyLogo";

export default function Header() {
  return (
    <header className="site-header relative z-50 w-full pl-7 pr-7 bg-[#070707] text-[#f2efe7]" id="header">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex h-16 w-full items-center justify-between gap-4 px-4 min-[380px]:px-5 sm:h-20 sm:gap-6 sm:px-8 lg:px-12"
      >
        {/* LEFT — LOGO & IDENTITY */}
        <div className="flex min-w-0 items-center gap-5">
          <Link
            href="/"
            aria-label="Home"
            className="group flex shrink-0 items-center"
          >
            <motion.div
              whileHover={{ scale: 1.045 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <BrandLogo size="md" animated />
            </motion.div>
          </Link>

          <div className="hidden h-7 w-px bg-white/15 sm:block" />

          <div className="hidden flex-col justify-center sm:flex">
            <span className="font-mono text-[9px] uppercase leading-[1.7] tracking-[0.13em] text-white/60">
              Software Engineer Student
            </span>
            <span className="font-mono text-[9px] uppercase leading-[1.7] tracking-[0.13em] text-white/35">
              Full-Stack Developer
            </span>
          </div>
        </div>

        {/* RIGHT — NAVIGATION */}
        <div className="flex shrink-0 items-center gap-5 lg:gap-8">
          <div className="hidden items-center xl:flex">
            <Nav />
          </div>
          {/* MOBILE NAVIGATION */}
          <div className="flex items-center xl:hidden">
            <MobileNav />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
