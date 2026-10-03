import { JellyWord } from "../ui/JellyWord";
import { GithubCard } from "../ui/stats/GithubCard";
import { MonkeytypeCard } from "../ui/stats/MonkeytypeCard";
import { UmamiCard } from "../ui/stats/UmamiCard";
import { WakatimeCard } from "../ui/stats/WakatimeCard";
import type { Meta } from "./meta";

export const id = "stats";

export const meta: Meta = { num: "06", tab: "Stats", tag: "Stats" };

function Headline() {
  return (
    <h2
      className="text-display leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      data-cursor="text"
    >
      <span className="block" aria-label="Statistik">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="Statistik" mono />
        </span>
      </span>
    </h2>
  );
}

export function Panel() {
  return (
    <div className="flex flex-col h-full pb-1 gap-3 justify-end">
      <div className="grid grid-cols-5 gap-2 lg:flex-row">
        <div className="flex flex-1 flex-col col-span-2">
          <div className="mb-3 flex items-baseline gap-2 text-ink-45">
            <p className="font-mono text-[clamp(15px,1.55vw)] font-medium tracking-[0.02em] text-ink lowercase">
              &lt;/stats&gt;
            </p>
            <i
              className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
              05
            </span>
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
              / statistik
            </span>
          </div>

          <Headline />
        </div>
        <div className="grid min-w-0 gap-2 col-span-3 grid-cols-1 lg:grid-cols-12">
          <MonkeytypeCard className="lg:col-span-7" />
          <UmamiCard className="lg:col-span-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 justify-between gap-3 lg:grid-cols-5">
        <GithubCard className="lg:col-span-3" />
        <WakatimeCard className="lg:col-span-2" />
      </div>
    </div>
  );
}
