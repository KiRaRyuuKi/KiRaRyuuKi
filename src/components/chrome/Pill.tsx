import { IconArrow, IconDownload } from "../ui/icons";

export function Pill({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: "arrow" | "download";
}) {
  const Icon = icon === "download" ? IconDownload : IconArrow;

  return (
    <a
      href={href}
      className="group inline-flex h-[clamp(46px,4vw,54px)] items-center gap-[clamp(14px,1.8vw,24px)] rounded-full bg-ink pr-[6px] pl-[clamp(16px,1.7vw,22px)] text-panel transition-transform duration-300 ease-cubie hover:-translate-y-px dark:bg-card dark:text-ink"
    >
      <span className="whitespace-nowrap text-[clamp(12px,1vw,13.5px)] font-medium tracking-[-0.014em]">
        {label}
      </span>
      <span className="grid aspect-square w-[clamp(36px,3.2vw,44px)] place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 ease-cubie group-hover:scale-105">
        <Icon className="size-[15px]" />
      </span>
    </a>
  );
}
