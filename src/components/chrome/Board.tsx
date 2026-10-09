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
  return (
    <main className="relative min-h-0 flex-1">
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
            <section.Panel />
          </m.section>
        </AnimatePresence>
      </div>
    </main>
  );
}
