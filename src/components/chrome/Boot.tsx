import { useEffect, useState } from "react";

const BARS = 24;
const PER_TICK = 2;
const TICK_MS = 90;
const SEEN_KEY = "kiraryuuki:booted";

const STEPS = [
  "Mounting_Profile",
  "Mounting_Assets",
  "Resolving_Fonts",
  "Rendering_Profile",
  "Linking_Sections",
  "System_Ready",
];

function shouldSkip() {
  try {
    if (sessionStorage.getItem(SEEN_KEY) === "1") return true;
  } catch {
    /* Storage disabled — replay rather than crash. */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Boot() {
  const [skip] = useState(shouldSkip);
  const [lit, setLit] = useState(0);
  const [done, setDone] = useState(skip);
  const [gone, setGone] = useState(skip);

  useEffect(() => {
    if (skip) return;
    const id = window.setInterval(() => {
      setLit((n) => {
        const next = Math.min(BARS, n + PER_TICK);
        if (next >= BARS) window.clearInterval(id);
        return next;
      });
    }, TICK_MS);
    const t = window.setTimeout(
      () => {
        setDone(true);
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* Nothing to do — the veil simply replays next time. */
        }
        window.setTimeout(() => setGone(true), 600);
      },
      (BARS / PER_TICK) * TICK_MS + 240,
    );
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t);
    };
  }, [skip]);

  if (gone) return null;

  const pct = `${String(Math.round((lit / BARS) * 100)).padStart(3, "0")}%`;
  const hint = STEPS[Math.min(STEPS.length - 1, Math.floor((lit / BARS) * STEPS.length))];

  return (
    <div
      className="boot"
      data-done={done ? "true" : undefined}
      role="status"
      aria-live="polite"
    >
      <div className="flex w-[min(320px,74vw)] flex-col gap-4">
        <div className="font-mono text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
          <div className="flex items-center justify-between gap-3">
            <span>{done ? "system_ready" : "system_boot"}</span>
            <span className="text-on-dark-60">
              <span>{pct}</span>
            </span>
          </div>
          <div className="boot__track" aria-hidden="true">
            {Array.from({ length: BARS }, (_, i) => (
              <i key={i} data-on={i < lit ? "true" : undefined} />
            ))}
          </div>
        </div>
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-on-dark-35 uppercase">
          {hint}
        </p>
      </div>
    </div>
  );
}
