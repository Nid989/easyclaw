"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Real data points from GitHub API — day offset from Nov 24
const starData = [
  { day: 0, stars: 1 },
  { day: 7, stars: 200 },
  { day: 14, stars: 580 },
  { day: 21, stars: 900 },
  { day: 28, stars: 1000 },
  { day: 38, stars: 1000 },
  { day: 48, stars: 2500 },
  { day: 55, stars: 5000 },
  { day: 62, stars: 10000 },
  { day: 63, stars: 40000 },
  { day: 65, stars: 90000 },
  { day: 68, stars: 131979 },
];

const TOTAL_STARS = "131,979";
const DAYS = 68;

export function StarChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const maxStars = Math.max(...starData.map((d) => d.stars));

  // Chart dimensions
  const W = 600;
  const H = 240;
  const padL = 0;
  const padR = 0;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Build points — x position based on actual day offset for true time scale
  const maxDay = starData[starData.length - 1].day;
  const points = starData.map((d) => {
    const x = padL + (d.day / maxDay) * chartW;
    const y = padT + chartH - (d.stars / maxStars) * chartH;
    return { x, y, ...d };
  });

  // SVG path
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Area fill path
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;

  // Y-axis labels
  const yLabels = [0, 25000, 50000, 75000, 100000, 131979];

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto">
      {/* Stats row */}
      <div className="flex items-baseline justify-center gap-8 mb-6">
        <div className="text-center">
          <motion.span
            className="text-4xl sm:text-5xl italic tracking-tight block"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {TOTAL_STARS}
          </motion.span>
          <span className="text-sm text-[var(--color-text-tertiary)] mt-1 block">
            GitHub stars
          </span>
        </div>
        <div className="text-center">
          <motion.span
            className="text-4xl sm:text-5xl italic tracking-tight block"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {DAYS}
          </motion.span>
          <span className="text-sm text-[var(--color-text-tertiary)] mt-1 block">
            days
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
        <div className="flex">
          {/* Y-axis */}
          <div className="flex flex-col justify-between pr-3 text-right shrink-0" style={{ height: H }}>
            {[...yLabels].reverse().map((v) => (
              <span
                key={v}
                className="text-[10px] font-mono text-[var(--color-text-tertiary)] leading-none"
              >
                {v >= 1000 ? `${Math.round(v / 1000)}k` : v}
              </span>
            ))}
          </div>

          {/* SVG */}
          <div className="flex-1 overflow-hidden">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ height: H }}
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {yLabels.map((v) => {
                const y = padT + chartH - (v / maxStars) * chartH;
                return (
                  <line
                    key={v}
                    x1={padL}
                    y1={y}
                    x2={W - padR}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeWidth={0.5}
                  />
                );
              })}

              {/* Area fill */}
              <motion.path
                d={areaPath}
                fill="var(--color-accent)"
                fillOpacity={0.05}
                initial={{ opacity: 0 }}
                animate={animated ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              />

              {/* Line */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={animated ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* End dot */}
              <motion.circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r={4}
                fill="var(--color-accent)"
                initial={{ opacity: 0, scale: 0 }}
                animate={animated ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.4 }}
              />
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-0">
              {["Nov 24", "Dec", "Jan", "Jan 31"].map((label) => (
                <span
                  key={label}
                  className="text-[10px] font-mono text-[var(--color-text-tertiary)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
