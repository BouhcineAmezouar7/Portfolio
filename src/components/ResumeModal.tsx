"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { createContext, useContext, useMemo, useState } from "react";
import { FiDownload, FiExternalLink, FiFileText, FiX } from "react-icons/fi";

import { profile } from "@/data/portfolio";

type ResumeModalContextValue = {
  openResume: () => void;
};

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function useResumeModal() {
  const context = useContext(ResumeModalContext);

  if (!context) {
    throw new Error("useResumeModal must be used inside ResumeModalProvider");
  }

  return context;
}

export default function ResumeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openResume: () => setOpen(true) }), []);

  return (
    <ResumeModalContext.Provider value={value}>
      {children}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[81] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 border border-[#37332f] bg-[#070707] text-[#f2efe7] shadow-2xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#37332f] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#ff3b1f]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                  Curriculum vitae / PDF
                </span>
              </div>
              <Dialog.Close
                aria-label="Close resume dialog"
                className="flex h-11 w-11 items-center justify-center border border-[#37332f] text-white/60 transition-colors hover:border-[#ff3b1f] hover:text-[#ff3b1f]"
              >
                <FiX size={17} aria-hidden="true" />
              </Dialog.Close>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center border border-[#ff3b1f] text-[#ff3b1f]">
                <FiFileText size={21} aria-hidden="true" />
              </div>

              <Dialog.Title className="mt-7 font-display text-[clamp(2.25rem,8vw,4.8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                My resume<span className="text-[#ff3b1f]">.</span>
              </Dialog.Title>
              <Dialog.Description className="mt-5 max-w-md text-sm leading-7 text-white/50">
                Open the PDF in your browser for a quick preview, or download a
                copy to your device.
              </Dialog.Description>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex min-h-14 items-center justify-between gap-5 border border-[#37332f] px-5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  Open in browser
                  <FiExternalLink
                    className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    size={17}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={profile.resumePath}
                  download="Bouhcine_Amezouar_Resume.pdf"
                  onClick={() => setOpen(false)}
                  className="group flex min-h-14 items-center justify-between gap-5 bg-[#ff3b1f] px-5 text-xs font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-[#f2efe7]"
                >
                  Download PDF
                  <FiDownload
                    className="shrink-0 transition-transform group-hover:translate-y-0.5"
                    size={17}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ResumeModalContext.Provider>
  );
}
