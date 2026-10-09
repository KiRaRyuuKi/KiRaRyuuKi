import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { EASE_OUT } from "../../lib/motion";

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
  const [ready, setReady] = useState(skip);
  const [done, setDone] = useState(skip);

  useEffect(() => {
    if (skip) return;
    const id = window.setInterval(() => {
      setLit((n) => {
        const next = Math.min(BARS, n + PER_TICK);
        if (next >= BARS) window.clearInterval(id);
        return next;
      });
    }, TICK_MS);
    const readyAt = window.setTimeout(() => {
      setReady(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* Nothing to do — the veil simply replays next time. */
      }
    }, (BARS / PER_TICK) * TICK_MS);
    const hideAt = window.setTimeout(
      () => setDone(true),
      (BARS / PER_TICK) * TICK_MS + 320,
    );
    return () => {
      window.clearInterval(id);
      window.clearTimeout(readyAt);
      window.clearTimeout(hideAt);
    };
  }, [skip]);

  const pct = `${String(Math.round((lit / BARS) * 100)).padStart(3, "0")}%`;
  const hint = STEPS[Math.min(STEPS.length - 1, Math.floor((lit / BARS) * STEPS.length))];

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          key="boot"
          className="boot"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <div className="flex w-[min(320px,74vw)] flex-col gap-4">
            <div className="font-mono text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
              <div className="flex items-center justify-between gap-3">
                <span>{ready ? "system_ready" : "system_boot"}</span>
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
        </m.div>
      )}
    </AnimatePresence>
  );
}
