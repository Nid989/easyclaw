"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

const RELEASE_BASE =
  "https://owxlbqepqhmqsrdixthk.supabase.co/storage/v1/object/public/releases";

const platforms = [
  {
    name: "macOS",
    versions: "Apple Silicon & Intel",
    icon: "apple",
    href: `${RELEASE_BASE}/EasyClaw_latest_aarch64.dmg`,
    label: "Download .dmg",
  },
  {
    name: "Windows",
    versions: "10 & 11",
    icon: "windows",
    href: null as string | null,
    label: "Coming soon",
  },
  {
    name: "Linux",
    versions: "Ubuntu, Debian, Fedora, Arch",
    icon: "linux",
    href: `${RELEASE_BASE}/EasyClaw_latest_amd64.AppImage`,
    label: "Download .AppImage",
  },
];

export default function DownloadPage() {
  const [version, setVersion] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${RELEASE_BASE}/latest.json`)
      .then((r) => r.json())
      .then((data) => {
        if (data.version) setVersion(data.version);
        if (data.notes) setNotes(data.notes);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Nav />

      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fade}
            className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-tertiary)] mb-4"
          >
            Download
          </motion.p>
          <motion.h1
            variants={fade}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
          >
            Get OpenClaw running
          </motion.h1>
          <motion.p
            variants={fade}
            className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto mb-10"
          >
            Download EasyClaw for your platform. Native app built with Tauri —
            no terminal required.
          </motion.p>
        </motion.div>
      </section>

      {/* Platform download cards */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {platforms.map((p, i) => {
              const inner = (
                <>
                  <div className="mb-4">
                    {p.icon === "apple" && (
                      <svg className="w-10 h-10 mx-auto text-[var(--color-text)]" viewBox="0 0 814 1000" fill="currentColor">
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.4-105.6-207.5-105.6-327.4 0-192.8 125.5-295 248.8-295 65.5 0 120.1 43.1 161.2 43.1 39.2 0 100.2-45.7 174.5-45.7 28.2 0 129.6 2.6 196.7 99.4zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.2 32.4-55.2 83.6-55.2 135.6 0 7.8.7 15.6 1.3 18.2 2.6.5 6.4.6 10.2.6 45.8 0 103.7-30.4 139.6-70.7z" />
                      </svg>
                    )}
                    {p.icon === "windows" && (
                      <svg className="w-10 h-10 mx-auto text-[var(--color-text)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                      </svg>
                    )}
                    {p.icon === "linux" && (
                      <svg className="w-10 h-10 mx-auto text-[var(--color-text)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 16c0 1.72-.63 3.3-1.66 4.5c.41.39.66.91.66 1.5H6c0-.59.25-1.11.66-1.5C5.63 19.3 5 17.72 5 16H3c0-1.95.57-3.74 1.56-5.23A12.07 12.07 0 0 1 8.5 7.37c0-.12 0-.25 0-.37a3.5 3.5 0 1 1 7 0c0 .12 0 .25 0 .37a12.07 12.07 0 0 1 3.94 3.4A10.04 10.04 0 0 1 21 16h-2m-9.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0-9 0m7 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M10 9a1 1 0 1 0 0 2a1 1 0 0 0 0-2m4 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <p className="text-sm text-[var(--color-text-tertiary)] mt-1 mb-4">
                    {p.versions}
                  </p>
                  <span
                    className={`inline-block text-xs font-medium px-3 py-1.5 ${
                      p.href
                        ? "bg-[var(--color-accent)] text-white"
                        : "border border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                    }`}
                  >
                    {p.label}
                  </span>
                </>
              );

              return p.href ? (
                <motion.a
                  key={p.name}
                  href={p.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-[var(--color-surface)] border border-[var(--color-accent)] p-8 text-center hover:bg-[var(--color-bg-alt)] transition-colors block"
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] p-8 text-center opacity-60"
                >
                  {inner}
                </motion.div>
              );
            })}
          </div>

          {/* Version + alt Linux formats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center justify-end gap-3 mb-8"
          >
            {version && (
              <span className="text-[10px] font-mono font-medium text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5 mr-auto">
                v{version}
              </span>
            )}
            <span className="text-xs text-[var(--color-text-tertiary)]">
              Linux also available as
            </span>
            <a
              href={`${RELEASE_BASE}/EasyClaw_latest_amd64.deb`}
              className="text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] px-2 py-1 transition-colors"
            >
              .deb
            </a>
            <a
              href={`${RELEASE_BASE}/EasyClaw_latest_amd64.rpm`}
              className="text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] px-2 py-1 transition-colors"
            >
              .rpm
            </a>
          </motion.div>

          {notes && (
            <p className="text-xs text-[var(--color-text-tertiary)] mb-8">
              {notes}
            </p>
          )}

          {/* Cloud hosted - coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.58 }}
            className="border p-6 bg-[var(--color-bg-alt)] border-[var(--color-border)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold">Cloud hosted</h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  Hosted on Supabase with S3 storage. Zero installation — sign
                  in and start using OpenClaw.
                </p>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5 shrink-0">
                Coming soon
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-tertiary)]">
            easyclaw
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              OpenClaw
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
