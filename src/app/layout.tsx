import { useCallback, useEffect, useState } from "react";
import { sectionAt, sectionIds, sections } from "../components/sections";
import { Board } from "../components/chrome/Board";
import { Boot } from "../components/chrome/Boot";
import { Hud } from "../components/chrome/Hud";
import { Footer } from "../components/layout/Footer";
import { useHashSection } from "../hooks/useHashSection";
import { useKeyboard } from "../hooks/useKeyboard";
import { useCursor } from "../hooks/usePointer";
import { useSound } from "../hooks/useSound";
import { useThemeMode } from "../hooks/useThemeMode";

export default function Layout() {
  const [index, setIndex] = useHashSection(sectionIds);
  const { mode, toggleMode } = useThemeMode();
  const [scan, setScan] = useState(mode === "dark");

  useEffect(() => {
    setScan(mode === "dark");
  }, [mode]);

  const { enabled, setEnabled, play } = useSound();
  const { dotRef, ringRef, state: cursorState } = useCursor();

  const section = sectionAt(index);

  const go = useCallback(
    (next: number) => {
      setIndex((current) => {
        const clamped = Math.max(0, Math.min(sections.length - 1, next));
        if (clamped !== current) play("tick");
        return clamped;
      });
    },
    [play, setIndex],
  );

  useKeyboard({ index, count: sections.length, onSelect: go });

  return (
    <>
      <Boot />
      {scan && <div className="scanlines" aria-hidden="true" />}

      <Hud />

      <div className="bg-page flex h-[100dvh] w-full flex-col p-frame-inset">
        <div className="flex min-h-0 flex-1 flex-col">
          <Board
            section={section}
            index={index}
            onSelect={go}
            status={`status`}
            mode={mode}
            onToggleMode={toggleMode}
            sound={enabled}
            onToggleSound={() => setEnabled(!enabled)}
            scan={scan}
            onToggleScan={() => setScan(!scan)}
          />

          <Footer />
        </div>
      </div>

      <div
        ref={dotRef}
        className="cursor-dot"
        data-state={cursorState}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        data-state={cursorState}
        aria-hidden="true"
      />
    </>
  );
}
