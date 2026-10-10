import { useMonkeytypeStats } from "../../../hooks/useStats";
import {
  MONKEYTYPE_PROFILE_URL,
  MONKEYTYPE_USER,
} from "../../../lib/stats";
import { IconMonkeytype } from "../icons/IconMonkeytype";
import { MiniStat } from "./cards";
import { MiniStatSkeleton, Skeleton } from "./Skeleton";
import {
  StatErrorNote,
  StatShell,
} from "./StatShell";


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

function LoadingNote({
  error,
  className,
}: {
  error: boolean;
  className?: string | undefined;
}) {
  return (
    <StatShell
      title="Monkeytype Stats"
      sub={error ? "Gagal memuat data." : "Memuat data..."}
      icon={IconMonkeytype}
      right={
        <a
          href={MONKEYTYPE_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent-strong"
        >
          {MONKEYTYPE_USER}
        </a>
      }
      className={className}
    >
      {error ? (
        <StatErrorNote message="Monkeytype API tidak bisa dijangkau. Coba lagi nanti." />
      ) : (
        <div className="flex min-h-0 flex-col">
          <div className="grid grid-cols-6 gap-1.5 stacked:grid-cols-2">
            <div className="min-w-0 rounded-[10px] bg-panel-deep px-2.5 py-2 col-span-3 stacked:col-span-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-[30px] flex-none rounded-full" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-[10px] w-1/2" />
                  <Skeleton className="mt-1 h-[9px] w-3/4" />
                </div>
              </div>
              <Skeleton className="mt-1.5 h-[4px] w-full rounded-full" />
            </div>
            <MiniStatSkeleton />
            <MiniStatSkeleton />
            <MiniStatSkeleton />
          </div>
          <div className="mt-1.5 grid flex-1 grid-cols-2 content-center gap-1.5">
            <div className="grid min-w-0 grid-cols-4 gap-1.5 rounded-[10px] bg-panel-deep p-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[40px] w-full" />
              ))}
            </div>
            <div className="grid min-w-0 grid-cols-4 gap-1.5 rounded-[10px] bg-panel-deep p-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[40px] w-full" />
              ))}
            </div>
          </div>
        </div>
      )}
    </StatShell>
  );
}

export function MonkeytypeCard({ className }: { className?: string }) {
  const { data: live, error } = useMonkeytypeStats();

  if (!live) return <LoadingNote error={Boolean(error)} className={className} />;

  const monkeytypeStats = live;
  return (
    <StatShell
      title="Monkeytype Stats"
      sub="Typing statistics and performance."
      right={monkeytypeStats.name}
      icon={IconMonkeytype}
      className={className}
    >
      <div className="flex min-h-0 flex-col">
        <div className="grid grid-cols-6 gap-1.5 stacked:grid-cols-2">
          <div className="min-w-0 rounded-[10px] bg-panel-deep px-2.5 py-2 col-span-3 stacked:col-span-2">
            <div className="flex items-center gap-2">
              <img
                aria-hidden="true"
                src="./images/foto-pribadi.png"
                alt=""
                width={60}
                height={60}
                loading="lazy"
                decoding="async"
                className="size-[30px] flex-none rounded-full object-cover"
              />
              <div className="min-w-0">
                <a
                  href={monkeytypeStats.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate text-[11.5px] font-medium text-ink-80 transition-colors hover:text-accent-strong"
                >
                  {monkeytypeStats.name}
                </a>
                <p className="truncate font-mono text-[9px] text-ink-45">
                  {monkeytypeStats.joined} · {monkeytypeStats.streak}
                </p>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-medium text-accent-strong tabular-nums">
                {monkeytypeStats.level}
              </span>
              <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-ink-18">
                <div className="h-full w-2/3 rounded-full bg-accent-strong" />
              </div>
              <span className="font-mono text-[9px] text-ink-30 tabular-nums">
                {monkeytypeStats.levelProgress.display}
              </span>
            </div>
          </div>
          <MiniStat label="Started" value={monkeytypeStats.testsStarted} />
          <MiniStat label="Completed" value={monkeytypeStats.testsCompleted} />
          <MiniStat label="Typing Time" value={monkeytypeStats.totalTime} />
        </div>
        {monkeytypeStats.pbTime.length === 0 && monkeytypeStats.pbWords.length === 0 ? (
          <p className="mt-1.5 font-mono text-[10px] text-ink-45">
            Belum ada personal best tercatat di akun ini.
          </p>
        ) : (
          <div className="mt-1.5 grid flex-1 grid-cols-2 content-center gap-1.5">
            <div className="grid min-w-0 grid-cols-4 gap-1.5 rounded-[10px] bg-panel-deep p-2">
              {monkeytypeStats.pbTime.map((p) => (
                <PbCol key={p.label} label={p.label} wpm={p.wpm} acc={p.acc} />
              ))}
            </div>
            <div className="grid min-w-0 grid-cols-4 gap-1.5 rounded-[10px] bg-panel-deep p-2">
              {monkeytypeStats.pbWords.map((p) => (
                <PbCol key={p.label} label={p.label} wpm={p.wpm} acc={p.acc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </StatShell>
  );
}
