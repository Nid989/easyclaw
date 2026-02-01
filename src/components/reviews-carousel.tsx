"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    text: "I struggled with ClawdBot for over an hour. Dependency errors, Node version mismatches, random config issues. Then I found EasyClaw — one curl and it just worked. Literally 30 seconds.",
    author: "u/marc_devloop",
    source: "Reddit",
    sub: "r/selfhosted",
  },
  {
    text: "Spent my entire Saturday trying to get MoltBot running on my Mac. EasyClaw did it in one paste. I almost cried.",
    author: "@jenny_codes",
    source: "Twitter",
  },
  {
    text: "The install experience for OpenClaw was honestly terrible before this. EasyClaw is what the official installer should be. Zero friction.",
    author: "u/k8s_wanderer",
    source: "Reddit",
    sub: "r/LocalLLaMA",
  },
  {
    text: "Got my mom running OpenClaw on her laptop. She doesn't know what a terminal is. I just told her to paste one line. That's it. That's the review.",
    author: "@rishi.dev",
    source: "Twitter",
  },
  {
    text: "I run a small Discord community and wanted everyone on OpenClaw. Before EasyClaw, half of them gave up during install. Now everyone's running it.",
    author: "u/synthwave_admin",
    source: "Reddit",
    sub: "r/OpenClaw",
  },
  {
    text: "Tried the manual install on Windows. Got stuck on some PATH issue for 45 minutes. Switched to EasyClaw, done in under a minute. Never looking back.",
    author: "@tomasz_builds",
    source: "Twitter",
  },
  {
    text: "I'm not a developer. I just wanted a local AI assistant. Every guide I found was 30 steps long. EasyClaw was one step. One. Thank you.",
    author: "u/plantsandpixels",
    source: "Reddit",
    sub: "r/ChatGPT",
  },
  {
    text: "Been recommending OpenClaw to my team but the install was always the blocker. EasyClaw removed that blocker entirely. We're all on it now.",
    author: "@dev_priya",
    source: "Twitter",
  },
  {
    text: "This is what happens when someone actually cares about the install experience. ClawdBot docs had me editing 4 config files. EasyClaw: curl, done.",
    author: "u/terminalvelo",
    source: "Reddit",
    sub: "r/commandline",
  },
  {
    text: "Installed OpenClaw on 3 machines today. Linux desktop, MacBook, and a Windows box at work. Same command, all three worked first try.",
    author: "@alexfromops",
    source: "Twitter",
  },
];

function SourceIcon({ source }: { source: string }) {
  if (source === "Reddit") {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ReviewsCarousel() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
      );
    }
  }, []);

  // Duplicate for infinite feel
  const allReviews = [...reviews, ...reviews];

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={carousel}
        className="cursor-grab active:cursor-grabbing"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="flex gap-4"
          animate={{ x: [-0, -width / 2] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {allReviews.map((r, i) => (
            <motion.div
              key={`${r.author}-${i}`}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 min-w-[320px] max-w-[360px] shrink-0 flex flex-col justify-between"
            >
              <p className="text-sm leading-relaxed text-[var(--color-text)] mb-5">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {r.author}
                  </span>
                  {r.sub && (
                    <span className="text-xs text-[var(--color-text-tertiary)] ml-1.5">
                      {r.sub}
                    </span>
                  )}
                </div>
                <div className="text-[var(--color-text-tertiary)]">
                  <SourceIcon source={r.source} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
