import type { IconProps } from "../icons";

export const HEAT_COLORS = [
  "bg-ink-18",
  "bg-accent-strong/25",
  "bg-accent-strong/50",
  "bg-accent-strong/75",
  "bg-accent-strong",
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export function MiniStat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-[10px] bg-panel-deep px-2.5 py-2">
      <p className="truncate font-mono text-[8px] tracking-[0.08em] text-ink-45">
        {label}
      </p>
      <p className="mt-0.5 truncate text-[10px] leading-none font-bold tracking-[-0.02em] text-accent-strong tabular-nums">
        {value}
      </p>
    </div>
  );
}

export function Card({
  icon: Icon,
  title,
  sub,
  right,
  children,
  className,
}: {
  icon?: ((props: IconProps) => React.ReactNode) | undefined;
  title: string;
  sub: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <section
      className={`flex min-w-0 flex-col rounded-[14px] border border-hairline bg-card p-2.5 ${className ?? ""}`}
    >
      <h3 className="flex items-center gap-1.5 text-[13px] font-semibold tracking-[-0.02em] text-ink">
        {Icon && <Icon className="size-[14px] shrink-0 text-ink-60" />}
        {title}
      </h3>
      <div className="flex items-baseline justify-between gap-2">
        <p className="mt-0.5 truncate text-[11.5px] text-ink-60">{sub}</p>
        {right && (
          <span className="min-w-0 truncate font-mono text-[10px] text-ink-45">
            {right}
          </span>
        )}
      </div>
      <div className="mt-2 flex min-h-0 flex-1 flex-col">{children}</div>
    </section>
  );
}
