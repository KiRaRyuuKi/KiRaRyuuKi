import { Fragment, useState } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import {
  useGitHubContribGrid,
  useGitHubSummary,
} from "../../../hooks/useStats";
import {
  GITHUB_CONTRIBS_URL,
  GITHUB_GRAPH_URL,
  GITHUB_USER,
} from "../../../lib/stats";
import { Card, HEAT_COLORS, MONTHS, MiniStat } from "./cards";
import { HeatGridSkeleton, MiniStatSkeleton } from "./Skeleton";

export function GithubCard({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  const { data: live, error } = useGitHubSummary();
  const { data: grid, error: contribError } = useGitHubContribGrid();
  const [imgOk, setImgOk] = useState(true);

  const loading = !live && !error;

  const repos = useCountUp(live?.publicRepos ?? 0);
  const followers = useCountUp(live?.followers ?? 0);
  const following = useCountUp(live?.following ?? 0);

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  return (
    <Card
      title="GitHub Contributions"
      sub={grid ? "Trailing 12 months." : `My GitHub activity in ${year}.`}
      right={`@${GITHUB_USER}`}
      className={className}
    >
      <div className="grid grid-cols-3 gap-1.5">
        {loading ? (
          <>
            <MiniStatSkeleton />
            <MiniStatSkeleton />
            <MiniStatSkeleton />
          </>
        ) : (
          <>
            <MiniStat
              label="Repos"
              value={live ? <span ref={repos.ref}>{repos.value}</span> : "-"}
            />
            <MiniStat
              label="Followers"
              value={
                live ? <span ref={followers.ref}>{followers.value}</span> : "-"
              }
            />
            <MiniStat
              label="Following"
              value={
                live ? <span ref={following.ref}>{following.value}</span> : "-"
              }
            />
          </>
        )}
      </div>
      {error && !live ? (
        <p className="mt-2 font-mono text-[10px] text-ink-45">
          GitHub API tidak bisa dijangkau (rate limit / offline). Coba lagi
          nanti.
        </p>
      ) : null}
      {GITHUB_CONTRIBS_URL ? (
        grid ? (
          <>
            <div className="mt-2 flex min-h-0 flex-1 flex-col">
              <div
                className="grid flex-1 content-evenly gap-[2.5px]"
                style={{
                  gridTemplateColumns: `auto repeat(${grid.columns.length}, minmax(0, 1fr))`,
                }}
                role="img"
                aria-label={`Heatmap aktivitas GitHub live (trailing 12 bulan)`}
              >
                <span aria-hidden="true" />
                {grid.months.map((m, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="font-mono text-[9px] whitespace-nowrap text-ink-45"
                  >
                    {i === 0
                      ? ""
                      : m !== grid.months[i - 1]
                        ? (MONTHS[m] ?? "")
                        : ""}
                  </span>
                ))}
                {dayLabels.map((dl, r) => (
                  <Fragment key={r}>
                    <span
                      aria-hidden="true"
                      className="flex items-center pr-0.5 font-mono text-[9px] text-ink-45"
                    >
                      {dl}
                    </span>
                    {grid.columns.map((weekCol, wi) => {
                      const level = weekCol[r] ?? 0;
                      return (
                        <i
                          key={wi}
                          title={`${dayNames[r]} · level ${level}`}
                          className={`aspect-square w-full rounded-[2px] ${HEAT_COLORS[level] ?? HEAT_COLORS[0]}`}
                        />
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="font-mono text-[9px] text-ink-30">
                Learn how we count contributions
              </span>
              <span className="ml-auto font-mono text-[9px] text-ink-45">
                Less
              </span>
              {HEAT_COLORS.map((c, i) => (
                <i key={i} className={`size-[9px] rounded-[2.5px] ${c}`} />
              ))}
              <span className="font-mono text-[9px] text-ink-45">More</span>
            </div>
          </>
        ) : contribError ? (
          <p className="mt-2 font-mono text-[10px] text-ink-45">
            Grafik aktivitas tidak bisa dimuat saat ini.
          </p>
        ) : (
          <HeatGridSkeleton />
        )
      ) : imgOk ? (
        <div className="mt-2 flex min-h-0 flex-1 items-center">
          <img
            src={GITHUB_GRAPH_URL}
            alt={`Grafik aktivitas GitHub ${GITHUB_USER}`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="w-full rounded-[8px]"
          />
        </div>
      ) : (
        <p className="mt-2 font-mono text-[10px] text-ink-45">
          Grafik aktivitas tidak bisa dimuat saat ini.
        </p>
      )}
    </Card>
  );
}
