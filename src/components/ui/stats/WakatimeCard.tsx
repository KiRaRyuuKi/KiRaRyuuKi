import { useEffect, useState } from "react";
import {
  WAKATIME_SHARE_URL,
  fetchWakatimeStats,
  type WakatimeStats,
} from "../../../lib/stats";
import { Card, MiniStat } from "./cards";

function LangBar({ name, pct }: { name: string; pct: number }) {
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

export function WakatimeCard({ className }: { className?: string }) {
  const [live, setLive] = useState<WakatimeStats | null>(null);
  const [failed, setFailed] = useState(false);

  // Full live dari 2 share JSON (angka 7 hari + languages). Tanpa data lokal.
  useEffect(() => {
    const ctrl = new AbortController();
    fetchWakatimeStats(ctrl.signal)
      .then((d) => setLive(d))
      .catch(() => setFailed(true));
    return () => ctrl.abort();
  }, []);

  if (!live) {
    return (
      <Card
        title="WakaTime Stats"
        sub={failed ? "Gagal memuat data." : "Memuat data..."}
        right={
          <a
            href={WAKATIME_SHARE_URL.replace(/\.json$/, "")}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent-strong"
          >
          </a>
        }
        className={className}
      >
        <p className="font-mono text-[10px] text-ink-45">
          {failed
            ? "WakaTime tidak bisa dijangkau. Coba lagi nanti."
            : "Mengambil aktivitas 7 hari terakhir..."}
        </p>
      </Card>
    );
  }

  const half = Math.ceil(live.languages.length / 2);
  const left = live.languages.slice(0, half);
  const right = live.languages.slice(half);

  return (
    <Card
      title="WakaTime Stats"
      sub="Live · last 7 days."
      right={
        <a
          href={WAKATIME_SHARE_URL.replace(/\.json$/, "")}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent-strong"
        >
          {live.endDate}
        </a>
      }
      className={className}
    >
      <div className="mb-1.5 flex items-stretch gap-2">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-1.5">
          <MiniStat label="Start" value={live.startDate} />
          <MiniStat label="End" value={live.endDate} />
          <MiniStat label="Daily Avg" value={live.avgDaily} />
          <MiniStat label="Total Week" value={live.totalWeek} />
          <MiniStat label="Best Day" value={live.bestDay} />
          {live.allTime ? (
            <MiniStat label="All-Time" value={live.allTime} />
          ) : null}
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
              <div className="flex min-w-0 flex-col gap-2">
                {left.map((l) => (
                  <LangBar key={l.name} name={l.name} pct={l.pct} />
                ))}
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                {right.map((l) => (
                  <LangBar key={l.name} name={l.name} pct={l.pct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
