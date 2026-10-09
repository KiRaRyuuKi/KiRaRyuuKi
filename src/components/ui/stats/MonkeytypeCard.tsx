import { useMonkeytypeStats } from "../../../hooks/useStats";
import { MONKEYTYPE_PROFILE_URL } from "../../../lib/stats";
import { Card, MiniStat } from "./cards";
import { MiniStatSkeleton, Skeleton } from "./Skeleton";

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
    <Card
      title="Monkeytype Stats"
      sub={error ? "Gagal memuat data." : "Memuat data..."}
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
      {error ? (
        <p className="font-mono text-[10px] leading-relaxed text-ink-45">
          Monkeytype API tidak bisa dijangkau. Coba lagi nanti.
        </p>
      ) : (
        <div className="flex min-h-0 flex-col">
          <div className="grid grid-cols-2 gap-1.5 xl:grid-cols-6">
            <div className="min-w-0 rounded-[10px] bg-panel-deep px-2.5 py-2 col-span-3">
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
    </Card>
  );
}

export function MonkeytypeCard({ className }: { className?: string }) {
  const { data: live, error } = useMonkeytypeStats();

  if (!live) return <LoadingNote error={Boolean(error)} className={className} />;

  const m = live;
  return (
    <Card
      title="Monkeytype Stats"
      sub="Typing statistics and performance."
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
