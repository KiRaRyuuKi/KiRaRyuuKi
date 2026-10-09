import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { sectionVariants } from "../../lib/motion";
import { Navigation } from "../layout/Navigation";
import type { Section } from "../sections";

export function Board({
  section,
  index,
  onSelect,
  status,
  mode,
  onToggleMode,
  sound,
  onToggleSound,
  scan,
  onToggleScan,
}: {
  section: Section;
  index: number;
  onSelect: (next: number) => void;
  status: string;
  mode: "light" | "dark";
  onToggleMode: () => void;
  sound: boolean;
  onToggleSound: () => void;
  scan: boolean;
  onToggleScan: () => void;
}) {
  const [announced, setAnnounced] = useState("");
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setAnnounced(`Bagian ${section.meta.tab} ditampilkan`);
  }, [section.meta.tab]);

  return (
    <main
      id="content"
      tabIndex={-1}
      className="relative min-h-0 flex-1 outline-none"
    >
      <a
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("content")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[var(--z-modal)] focus:rounded-md focus:bg-accent focus:px-3 focus:py-1.5 focus:font-mono focus:text-[11px] focus:font-medium focus:text-accent-ink"
      >
        Lewati ke konten
      </a>

      <div className="sr-only" aria-live="polite">
        {announced}
      </div>

      <div
        className="bg-panel rounded-frame border border-hairline absolute inset-0"
        aria-hidden="true"
      />

      <Navigation
        index={index}
        onSelect={onSelect}
        status={status}
        mode={mode}
        onToggleMode={onToggleMode}
        sound={sound}
        onToggleSound={onToggleSound}
        scan={scan}
        onToggleScan={onToggleScan}
      />

      <div className="strip-hatch bg-panel-deep rounded-4xl relative h-full px-pad-x pt-[68px] pb-pad-y">
        <AnimatePresence mode="wait">
          <m.section
            key={section.id}
            aria-label={section.meta.tab}
            className="h-full min-w-0 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="mx-auto h-full w-full max-w-[var(--content-max)]">
              <section.Panel />
            </div>
          </m.section>
        </AnimatePresence>
      </div>
    </main>
  );
}
