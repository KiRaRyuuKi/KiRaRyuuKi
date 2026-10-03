import { useEffect, useRef, useState } from "react";
import { JellyWord } from "../ui/JellyWord";
import {
  IconBrush,
  IconCode,
  IconGame,
  IconMusic,
  type IconProps,
} from "../ui/icons";
import type { Meta } from "./meta";

export const id = "profile";

export const meta: Meta = { num: "01", tab: "Profile", tag: "Profile" };

function Headline() {
  return (
    <h2
      className="text-display leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      data-cursor="text"
    >
      <span className="block" aria-label="MUHAMMAD ILHAM">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="MUHAMMAD" mono />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="ILHAM" accent />
        </span>
      </span>
    </h2>
  );
}

const hobbies = [
  {
    title: "Coding",
    Icon: IconCode,
    detail:
      "Mencoba hal baru, bereksperimen, dan membangun proyek pribadi. Coding adalah cara saya mengekspresikan diri dan mengasah kemampuan problem solving.",
  },
  {
    title: "Gaming",
    Icon: IconGame,
    detail:
      "Bermain game untuk bersenang-senang dan media untuk mengembangkan ide-ide kreatif. Game sering menjadi sumber inspirasi dan hiburan yang menyenangkan.",
  },
  {
    title: "Musik",
    Icon: IconMusic,
    detail:
      "Mendengarkan musik untuk relaksasi, motivasi, dan inspirasi. Musik menjadi teman setia dalam perjalanan hidup untuk memahami sebuah perasaan.",
  },
  {
    title: "Desain & Pixel Art",
    Icon: IconBrush,
    detail:
      "Media mengekspresikan kreativitas dan imajinasi. Desain adalah cara saya berkomunikasi secara visual dan menciptakan karya yang unik.",
  },
];

type Hobby = (typeof hobbies)[number];

function HobbyButton({
  title,
  icon: Icon,
  expanded,
  onSelect,
}: {
  title: string;
  icon: (p: IconProps) => React.ReactNode;
  expanded: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-expanded={expanded}
      aria-controls={expanded ? "hobby-pop" : undefined}
      onClick={onSelect}
      className={`icon-btn grid size-[34px] place-items-center rounded-xl bg-card shadow-[0_1px_2px_rgba(10,10,10,0.045)] transition-[transform,color,box-shadow] duration-fast ease-cubie hover:-translate-x-0.5 hover:text-accent-strong hover:shadow-[0_3px_12px_rgba(10,10,10,0.1)] ${
        expanded ? "text-accent-strong" : "text-ink-80"
      }`}
    >
      <Icon className="size-[15px]" />
    </button>
  );
}

function HobbyPopover({
  hobby,
  index,
  wrapRef,
  onClose,
}: {
  hobby: Hobby;
  index: number;
  wrapRef: (el: HTMLDivElement | null) => void;
  onClose: () => void;
}) {
  return (
    <div
      ref={wrapRef}
      className="absolute top-full right-0 z-10 mt-3 lg:top-1/2 lg:right-full lg:mt-0 lg:mr-3 lg:-translate-y-1/2"
    >
      <div
        id="hobby-pop"
        role="dialog"
        aria-label={hobby.title}
        className="slide-fade relative w-[240px] max-w-[52vw] rounded-[16px] border border-hairline bg-card p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
      >
        <span
          aria-hidden="true"
          className="absolute -top-[5px] right-4 size-[10px] rotate-45 border-t border-l border-hairline bg-card lg:top-1/2 lg:-right-[5px] lg:-translate-y-1/2 lg:border-r lg:border-l-0"
        />

        <p className="flex items-baseline gap-2">
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
            / hobi
          </span>
        </p>

        <div className="mt-3 flex items-center gap-2.5">
          <span className="grid size-[32px] flex-none place-items-center rounded-lg bg-panel-deep text-accent-strong">
            <hobby.Icon className="size-[15px]" />
          </span>
          <h3 className="text-[14px] font-semibold tracking-[-0.02em] text-ink">
            {hobby.title}
          </h3>
        </div>

        <p className="mt-2.5 text-body leading-[1.55] text-ink-60">
          {hobby.detail}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase transition-colors hover:text-accent-strong"
        >
          Tutup —
        </button>
      </div>
    </div>
  );
}

export function Panel() {
  const [active, setActive] = useState<Hobby | null>(null);
  const lastFocus = useRef<Element | null>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const open = (hobby: Hobby) => {
    if (active === hobby) {
      close();
      return;
    }
    lastFocus.current = document.activeElement;
    setActive(hobby);
  };
  const close = () => {
    setActive(null);
    (lastFocus.current as HTMLElement | null)?.focus?.();
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t)) return;
      if (colRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 h-full items-center gap-x-gutter gap-y-[clamp(26px,3vw,44px)] lg:grid-cols-2">
        <figure className="relative w-full max-w-[min(100%,425px)] mx-auto aspect-4/5 overflow-hidden place-items-center before:absolute before:top-3 before:left-3 before:z-1 before:size-4 before:border before:border-hairline before:border-r-0 before:border-b-0 before:content-[''] after:absolute after:right-3 after:bottom-3 after:z-1 after:size-4 after:border after:border-hairline after:border-t-0 after:border-l-0 after:content-['']">
          <div className="relative size-full p-[22px]">
            <div className="relative size-full overflow-hidden">
              <img
                src="./images/foto-pribadi.png"
                alt="Foto profil KiRaRyuuKi"
                width={800}
                height={1000}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 backdrop-blur-[2.5px] [mask-image:radial-gradient(ellipse_78%_78%_at_50%_50%,transparent_68%,black_98%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_12px_var(--panel-deep)]"
              />
            </div>
          </div>
        </figure>

        <div className="flex flex-col mr-14 sm:mr-20 lg:mr-32">
          <div className="mb-3 flex items-baseline gap-2 text-ink-45">
            <p className="font-mono text-[clamp(15px,1.55vw)] font-medium tracking-[0.02em] text-ink lowercase">
              &lt;/profile&gt;
            </p>
            <i
              className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
              01
            </span>
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
              / profil singkat
            </span>
          </div>

          <Headline />

          <p className="mt-5 max-w-[62ch] text-lede leading-[1.19] font-medium tracking-[-0.026em] text-ink">
            Full-Stack Developer dengan latar belakang di bidang DevOps dan
            riset keamanan aplikasi serta jaringan.
          </p>

          <p className="mt-4 max-w-[62ch] text-body-lg leading-[1.55] text-ink-60">
            Berangkat dari ketertarikan untuk tahu lebih banyak, mencari ide,
            dan bereksperimen, hingga menuangkannya pada riset (skripsi) dengan
            tema mitigasi HTTP(S) Flood dengan ModSecurity dan Nginx Caching di
            Kubernetes Multi-Node menggunakan Proxmox dalam lingkungan Nested
            Virtualization.
          </p>

          <dl className="mt-[clamp(22px,2.2vw,32px)] grid grid-cols-2 gap-x-6 gap-y-3 border-t border-hairline pt-4 sm:grid-cols-4">
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
                Fokus
              </dt>
              <dd className="text-body font-medium tracking-[-0.012em] text-ink-80">
                Full-Stack · DevOps · Security Research
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
                Lokasi
              </dt>
              <dd className="text-body font-medium tracking-[-0.012em] text-ink-80">
                Bondowoso, Jawa Timur
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
                Status
              </dt>
              <dd className="text-body font-medium tracking-[-0.012em] text-ink-80">
                Tersedia untuk proyek baru dan kolaborasi
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
                Zona waktu
              </dt>
              <dd className="text-body font-medium tracking-[-0.012em] text-ink-80">
                Asia/Jakarta
              </dd>
            </div>
          </dl>

          <div
            ref={colRef}
            className="absolute right-0 mt-20 flex flex-col items-center gap-[5px]"
          >
            {hobbies.map((hobby) => (
              <div key={hobby.title} className="relative">
                <HobbyButton
                  title={hobby.title}
                  icon={hobby.Icon}
                  expanded={active === hobby}
                  onSelect={() => open(hobby)}
                />

                {active === hobby && (
                  <HobbyPopover
                    hobby={hobby}
                    index={hobbies.indexOf(hobby)}
                    wrapRef={(el) => {
                      popRef.current = el;
                    }}
                    onClose={close}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
