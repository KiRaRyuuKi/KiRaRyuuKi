import { useWakatimeStats } from "../../../hooks/useStats";
import { getWakatimeSharePage } from "../../../lib/stats";
import { IconWakatime } from "../icons/IconWakatime";
import { MiniStat } from "./cards";
import { BarSkeleton, MiniStatSkeleton, Skeleton } from "./Skeleton";
import {
  StatErrorNote,
  StatShell,
} from "./StatShell";

function Bar({ name, pct }: { name: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="truncate text-[11.5px] text-ink-80">{name}</p>
        <p className="flex-none font-mono text-[9px] text-ink-45 tabular-nums">
          {pct}%
        </p>
      </div>
      <div className="mt-0.5 h-[5px] w-full overflow-hidden rounded-full bg-ink-18">
        <div
          className="h-full rounded-full bg-accent-strong"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function LangColumn({ langs }: { langs: { name: string; pct: number }[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      {langs.map((l) => (
        <Bar key={l.name} name={l.name} pct={l.pct} />
      ))}
    </div>
  );
}

export function WakatimeCard({ className }: { className?: string }) {
  const { data: live, error } = useWakatimeStats();

  if (!live) {
    return (
      <StatShell
        title="WakaTime Stats"
        sub={error ? "Gagal memuat data." : "Memuat data..."}
        icon={IconWakatime}
        right={
          <a
            href={getWakatimeSharePage()}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent-strong"
          >
            share
          </a>
        }
        className={className}
      >
        {error ? (
          <StatErrorNote message="WakaTime tidak bisa dijangkau. Coba lagi nanti." />
        ) : (
          <div className="mb-1.5 flex items-stretch gap-2">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <MiniStatSkeleton key={i} />
              ))}
            </div>
            <div className="min-w-0 flex-1 rounded-[10px] bg-panel-deep p-2.5">
              <Skeleton className="h-[9px] w-1/2" />
              <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex min-w-0 flex-col gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <BarSkeleton key={i} />
                  ))}
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <BarSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </StatShell>
    );
  }

  const half = Math.ceil(live.languages.length / 2);
  const left = live.languages.slice(0, half);
  const right = live.languages.slice(half);

  return (
    <StatShell
      title="WakaTime Stats"
      sub="Coding activity this week."
      right={<p>{live.endDate}</p>}
      icon={IconWakatime}
      className={className}
    >
      <div className="mb-1.5 flex items-stretch gap-2">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-1.5">
          <MiniStat label="Start" value={live.startDate} />
          <MiniStat label="End" value={live.endDate} />
          <MiniStat label="Daily Avg" value={live.avgDaily} />
          <MiniStat label="Total Week" value={live.totalWeek} />
          <MiniStat label="Best Day" value={live.bestDay} />
          <MiniStat label="All-Time" value={live.allTime ?? "—"} />
        </div>
        <div className="min-w-0 flex-1 rounded-[10px] bg-panel-deep p-2.5">
          <p className="font-mono text-[9px] tracking-[0.08em] text-ink-45">
            Top Languages
          </p>
          {live.languages.length === 0 ? (
            <p className="mt-1.5 font-mono text-[9px] text-ink-45">
              Tidak ada data bahasa minggu ini.
            </p>
          ) : (
            <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-2">
              <LangColumn langs={left} />
              <LangColumn langs={right} />
            </div>
          )}
        </div>
      </div>
    </StatShell>
  );
}
