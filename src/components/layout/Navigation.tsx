import { IconButton } from "../ui/IconButton";
import { Micro } from "../chrome/Micro";
import {
  IconMoon,
  IconScan,
  IconSoundOff,
  IconSoundOn,
  IconSun,
} from "../ui/icons";
import { sections } from "../sections";

export function Navigation({
  index,
  onSelect,
  mode,
  onToggleMode,
  sound,
  onToggleSound,
  scan,
  onToggleScan,
  status,
}: {
  index: number;
  onSelect: (next: number) => void;
  mode: "light" | "dark";
  onToggleMode: () => void;
  sound: boolean;
  onToggleSound: () => void;
  scan: boolean;
  onToggleScan: () => void;
  status: string;
}) {
  return (
    <nav
      className="pointer-events-none absolute inset-x-0 top-0 z-[var(--z-ui)] flex items-center gap-4 px-pad-x pt-7.5 pb-3"
      aria-label="Section"
    >
      <button
        type="button"
        onClick={() => onSelect(0)}
        className="nav-link pointer-events-auto flex flex-none items-center gap-2 text-ink-80"
        aria-label="Kembali ke slide pertama"
      >
        <i className="animate-blink size-[5px] rounded-[1.5px] bg-accent" />
        <span className="text-[15px] font-semibold tracking-[-0.036em]">
          KiRa<span className="text-muted-display">RyuuKi</span>
          <span
            className="absolute mt-[2.5px] ml-[2.5px] self-start text-[7px] font-medium text-ink-60"
            aria-hidden="true"
          >
            &reg;
          </span>
        </span>
      </button>

      <span className="pointer-events-none hidden items-center gap-2.5 whitespace-nowrap text-ink-45 sm:flex">
        <i
          className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
          aria-hidden="true"
        />{" "}
        <Micro>{status}</Micro>
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-30 uppercase">
          &lt;/system_ready&gt;
        </span>
      </span>

      <ol className="pointer-events-auto ml-auto mr-2 hidden items-center gap-[22px] md:flex">
        {sections.map((section, i) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-label={section.meta.tab}
              aria-current={i === index ? "true" : undefined}
              className="nav-link nav-link--tag font-mono text-nav font-medium tracking-[-0.012em] text-ink-60 transition-colors"
            >
              <span aria-hidden="true">
                <span className="nav-bracket">{`</`}</span>
                {section.meta.tag ?? section.meta.tab}
                <span className="nav-bracket">{`>`}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <ol className="pointer-events-auto ml-1 flex items-center gap-1 md:hidden">
        {sections.map((section, i) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-label={section.meta.tab}
              aria-current={i === index ? "true" : undefined}
              className={`h-px w-4 transition-all duration-300 ease-cubie ${
                i === index ? "bg-accent" : "bg-ink-30"
              }`}
            />
          </li>
        ))}
      </ol>

      <div className="pointer-events-auto flex items-center gap-1.5">
        <IconButton
          label={sound ? "Matikan Suara" : "Nyalakan Suara"}
          onClick={onToggleSound}
        >
          {sound ? <IconSoundOn /> : <IconSoundOff />}
        </IconButton>
        <IconButton label="Ganti tema" onClick={onToggleMode}>
          {mode === "dark" ? <IconSun /> : <IconMoon />}
        </IconButton>
        <IconButton
          label={scan ? "Matikan garis pemindai" : "Nyalakan garis pemindai"}
          onClick={onToggleScan}
          active={scan}
        >
          <IconScan />
        </IconButton>
      </div>
    </nav>
  );
}
