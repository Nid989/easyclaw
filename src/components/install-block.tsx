"use client";

import { CopyButton } from "./copy-button";

const INSTALL_CMD = "curl -fsSL https://openclaw.ai/install.sh | bash";

export function InstallBlock({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <div className="relative group w-full max-w-xl mx-auto">
      <div
        className={`relative bg-[var(--color-code-bg)] border border-white/10 font-mono text-[var(--color-code-text)] ${
          size === "lg" ? "px-5 py-4 text-base" : "px-4 py-3 text-sm"
        }`}
      >
        <span className="text-[var(--color-text-tertiary)] select-none">
          ${" "}
        </span>
        <span className="select-all">{INSTALL_CMD}</span>
        <CopyButton text={INSTALL_CMD} />
      </div>
    </div>
  );
}
