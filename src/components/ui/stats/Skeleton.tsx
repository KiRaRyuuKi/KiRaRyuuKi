export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton block rounded-[4px] ${className}`}
      style={style}
    />
  );
}

export function MiniStatSkeleton() {
  return (
    <div className="min-w-0 rounded-[10px] bg-panel-deep px-2.5 py-2">
      <Skeleton className="h-[8px] w-2/3" />
      <Skeleton className="mt-1.5 h-[10px] w-1/2" />
    </div>
  );
}

export function BarSkeleton() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <Skeleton className="h-[9px] w-1/2" />
        <Skeleton className="h-[9px] w-[24px]" />
      </div>
      <Skeleton className="mt-1 h-[5px] w-full rounded-full" />
    </div>
  );
}

import { CONTRIB_WEEKS } from "../../../lib/stats";

const HEAT_COLS = CONTRIB_WEEKS;
const HEAT_ROWS = 7;

export function HeatGridSkeleton() {
  return (
    <div className="mt-2 flex min-h-0 flex-1 flex-col">
      <div className="skeleton grid flex-1 content-evenly gap-[2.5px] rounded-[6px]">
        {Array.from({ length: HEAT_ROWS }).map((_, r) => (
          <div
            key={r}
            className="grid gap-[2.5px]"
            style={{
              gridTemplateColumns: `repeat(${HEAT_COLS}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: HEAT_COLS }).map((_, c) => (
              <span
                key={c}
                className="aspect-square w-full rounded-[2px] bg-panel-deep"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
