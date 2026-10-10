import type { ReactNode } from "react";
import type { IconProps } from "../icons";
import { Card } from "./cards";
import { MiniStatSkeleton } from "./Skeleton";

export function StatShell({
  icon,
  title,
  sub,
  right,
  className,
  children,
}: {
  icon?: (props: IconProps) => ReactNode;
  title: string;
  sub: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <Card
      title={title}
      sub={sub}
      right={right}
      icon={icon}
      className={className}
    >
      {children}
    </Card>
  );
}

export function StatErrorNote({ message }: { message: string }) {
  return <p className="font-mono text-[10px] leading-relaxed text-ink-45">{message}</p>;
}

export function StatMiniSkeletonGrid({
  count,
  className = "grid grid-cols-3 gap-1.5",
}: {
  count: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <MiniStatSkeleton key={i} />
      ))}
    </div>
  );
}
