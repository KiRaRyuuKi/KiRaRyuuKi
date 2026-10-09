import { useEffect, useState } from "react";
import {
  MONKEYTYPE_PROFILE_URL,
  fetchMonkeytypeStats,
  type MonkeytypeStats,
} from "../../../lib/stats";
import { Card, MiniStat } from "./cards";

function PbCol({
  label,
  wpm,
  acc,
}: {
  label: string;
  wpm: number;
  acc: number;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <p className="truncate font-mono text-[8px] text-ink-45">{label}</p>
      <p className="mt-0.5 truncate text-[17px] leading-none font-bold tracking-[-0.02em] text-accent-strong tabular-nums">
        {wpm}
      </p>
      <p className="mt-0.5 font-mono text-[9px] text-ink-45 tabular-nums">
        {acc}%
      </p>
    </div>
  );
}

function SetupNote({
  failed,
  className,
}: {
  failed: boolean;
  className: string | undefined;
}) {
  return (
    <Card
      title="Monkeytype Stats"
      sub={failed ? "Gagal memuat data." : "Memuat data..."}
      right={
        <a
          href={MONKEYTYPE_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent-strong"
        >
        </a>
      }
      className={className}
    >
      <p className="font-mono text-[10px] leading-relaxed text-ink-45">
        {failed
          ? "Monkeytype API tidak bisa dijangkau. Coba lagi nanti."
          : "Mengambil statistik typing..."}
      </p>
    </Card>
  );
}

export function MonkeytypeCard({ className }: { className?: string }) {
  const [live, setLive] = useState<MonkeytypeStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchMonkeytypeStats(ctrl.signal)
      .then((d) => setLive(d))
      .catch(() => setFailed(true));
    return () => ctrl.abort();
  }, []);

  if (!live) return <SetupNote failed={failed} className={className} />;

  const m = live;
  return (
    <Card
      title="Monkeytype Stats"
      sub="Live typing statistics."
      right={m.name}
      className={className}
    >
      <div className="flex min-h-0 flex-col">
        <div className="grid grid-cols-2 gap-1.5 xl:grid-cols-6">
          <div className="min-w-0 rounded-[10px] bg-panel-deep px-2.5 py-2 col-span-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="grid size-[30px] flex-none place-items-center rounded-full bg-accent-strong text-[14px] font-bold text-white"
              >
                {m.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <a
                  href={m.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate text-[11.5px] font-medium text-ink-80 transition-colors hover:text-accent-strong"
                >
                  {m.name}
                </a>
                <p className="truncate font-mono text-[9px] text-ink-45">
                  {m.joined} · {m.streak}
                </p>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-medium text-accent-strong tabular-nums">
                {m.level}
              </span>
              <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-ink-18">
                <div className="h-full w-2/3 rounded-full bg-accent-strong" />
              </div>
              <span className="font-mono text-[9px] text-ink-30 tabular-nums">
                {m.levelXp}
              </span>
            </div>
          </div>
          <MiniStat label="Started" value={m.testsStarted} />
          <MiniStat label="Completed" value={m.testsCompleted} />
          <MiniStat label="Typing Time" value={m.totalTime} />
        </div>
        {m.pbTime.length === 0 && m.pbWords.length === 0 ? (
          <p className="mt-1.5 font-mono text-[10px] text-ink-45">
            Belum ada personal best tercatat di akun ini.
          </p>
        ) : (
          <div className="mt-1.5 grid flex-1 grid-cols-2 content-center gap-1.5">
            <div className="grid min-w-0 grid-cols-4 gap-1.5 rounded-[10px] bg-panel-deep p-2">
              {m.pbTime.map((p) => (
                <PbCol key={p.label} label={p.label} wpm={p.wpm} acc={p.acc} />
              ))}
            </div>
            <div className="grid min-w-0 grid-cols-4 gap-1.5 rounded-[10px] bg-panel-deep p-2">
              {m.pbWords.map((p) => (
                <PbCol key={p.label} label={p.label} wpm={p.wpm} acc={p.acc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
