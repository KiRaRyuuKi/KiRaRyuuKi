import { useCountUp } from "../../../hooks/useCountUp";
import { useUmamiStats } from "../../../hooks/useStats";
import { UMAMI_SHARE_URL, UMAMI_SITE } from "../../../lib/stats";
import { Card, MiniStat } from "./cards";
import { MiniStatSkeleton, Skeleton } from "./Skeleton";

export function UmamiCard({ className }: { className?: string }) {
  const { data: live, error } = useUmamiStats();

  const views = useCountUp(live?.pageViews ?? 0);
  const visitors = useCountUp(live?.visitors ?? 0);
  const visits = useCountUp(live?.visits ?? 0);

  if (!live) {
    return (
      <Card
        title="Umami"
        sub={error ? "Gagal memuat data." : "Memuat data..."}
        right={
          <a
            href={UMAMI_SHARE_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent-strong"
          >
            {UMAMI_SITE}
          </a>
        }
        className={className}
      >
        {error ? (
          <p className="font-mono text-[10px] text-ink-45">
            Umami tidak bisa dijangkau. Coba lagi nanti.
          </p>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <MiniStatSkeleton key={i} />
              ))}
            </div>
            <div className="mt-1.5 flex min-h-[96px] flex-1 items-end gap-1.5">
              {[44, 68, 36, 82, 58, 74].map((h, i) => (
                <Skeleton
                  key={i}
                  className="w-full rounded-[4px]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  }

  const max = Math.max(1, ...live.days.map((m) => m.pageViews));

  return (
    <Card
      title="Umami"
      sub="Traffic and interaction."
      right={
        <a
          href={UMAMI_SHARE_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent-strong"
        >
          {live.site}
        </a>
      }
      className={className}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="grid grid-cols-5 gap-1.5">
          <MiniStat
            label="Views"
            value={
              <span ref={views.ref}>{views.value.toLocaleString("en-US")}</span>
            }
          />
          <MiniStat
            label="Visitors"
            value={
              <span ref={visitors.ref}>
                {visitors.value.toLocaleString("en-US")}
              </span>
            }
          />
          <MiniStat
            label="Visits"
            value={
              <span ref={visits.ref}>
                {visits.value.toLocaleString("en-US")}
              </span>
            }
          />
          <MiniStat label="Countries" value={live.countries} />
          <MiniStat label="Events" value={live.events} />
        </div>
        {live.days.length === 0 ? (
          <p className="mt-1.5 font-mono text-[10px] text-ink-45">
            Belum ada traffic tercatat.
          </p>
        ) : (
          <div
            className="mt-1.5 flex min-h-[96px] flex-1 items-end gap-1.5"
            role="img"
            aria-label="Grafik traffic harian 30 hari terakhir (live dari Umami)"
          >
            {live.days.map((m) => {
              const h = Math.max(6, Math.round((m.pageViews / max) * 100));
              const sessH =
                m.pageViews > 0
                  ? Math.max(0, Math.round((m.sessions / m.pageViews) * 100))
                  : 0;
              return (
                <div
                  key={m.iso || m.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-0.5"
                  title={`${m.iso || m.label}: ${m.pageViews} views / ${m.sessions} sessions`}
                >
                  <div
                    className="flex w-full flex-col justify-end overflow-hidden rounded-[4px]"
                    style={{ height: `${h}%` }}
                  >
                    <div className="w-full flex-1 bg-accent-strong" />
                    <div
                      className="w-full bg-ink-30"
                      style={{ height: `${sessH}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] whitespace-nowrap text-ink-45">
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
