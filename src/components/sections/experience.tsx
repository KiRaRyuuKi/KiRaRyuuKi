import { useRef, useState } from "react";
import { JellyWord } from "../ui/JellyWord";
import type { Meta } from "./meta";
import { Pill } from "../chrome/Pill";

export const id = "experience";

export const meta: Meta = { num: "05", tab: "Experience", tag: "Experience" };

function Headline() {
  return (
    <h2
      className="text-display leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      data-cursor="text"
    >
      <span className="block" aria-label="Jejak Perjalanan">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="Jejak" accent />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Perjalanan" mono />
        </span>
      </span>
    </h2>
  );
}

const entries: {
  period: string;
  kind: string;
  group?: string;
  role: string;
  org: string;
  points: string[];
}[] = [
  {
    period: "November 2025 — Juni 2026",
    kind: "Skripsi",
    role: "Undergraduate Thesis Researcher (DevOps / Security)",
    org: "Politeknik Negeri Jember",
    points: [
      "ModSecurity dan Nginx caching di NGINX Ingress, Kubernetes multi-node di Proxmox Virtual Environment, host AWS EC2",
      "Uji 1.000 user konkuren (JMeter) 95% block rate, CPU app-pod < 25 millicores, backend terisolasi dari downtime",
    ],
  },
  {
    period: "Agustus 2025 — Desember 2025",
    kind: "Internship",
    role: "Web Development Intern",
    org: "PT. cmlabs Malang, East Java",
    points: [
      "SEO-friendly dengan Next.js (App Router, SSR dan SSG)",
      "Technical SEO, generateMetadata(), Open Graph, canonical, sitemap dan robots.txt, next/image",
      "Deployment Vercel (auto-build on push), validasi Lighthouse",
      "Certificate of Appreciation DevOps Engineer (cmlabs)",
    ],
  },
  {
    period: "2022 — 2026",
    kind: "Pendidikan",
    group: "Pendidikan",
    role: "D4 Informatics Engineering — GPA 3.67",
    org: "Politeknik Negeri Jember, Jember",
    points: [
      "PANDAWA geospatial system, hak cipta No. 000942745 (Jul 2025)",
      "Amfibi car marketplace (Laravel)",
      "RisqiShop desktop (Java)",
      "BNSP Web Developer (Apr 2026)",
    ],
  },
  {
    period: "2019 — 2022",
    kind: "Pendidikan",
    group: "Pendidikan",
    role: "Computer and Network Engineering — nilai 77,75",
    org: "SMKN 1 Bondowoso, Bondowoso",
    points: ["BNSP Network Administrator (KKNI Level II), Jun 2022"],
  },
  {
    period: "2026 / 2022",
    kind: "Sertifikasi",
    role: "BNSP Web Developer dan Network Administrator",
    org: "LSP Polije / LSP SMKN 1 Bondowoso",
    points: [
      "BNSP Web Developer (Apr 2026)",
      "BNSP Network Administrator KKNI Level II (Jun 2022)",
    ],
  },
];

export function Panel() {
  const drag = useRef<{ el: HTMLElement; y: number; top: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const onDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = {
      el: e.currentTarget,
      y: e.clientY,
      top: e.currentTarget.scrollTop,
    };
    setGrabbing(true);
  };
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || d.el !== e.currentTarget) return;
    d.el.scrollTop = d.top - (e.clientY - d.y);
  };
  const endDrag = () => {
    drag.current = null;
    setGrabbing(false);
  };

  return (
    <div className="grid grid-cols-2 h-full items-center gap-x-gutter gap-y-[clamp(26px,3vw,44px)] lg:grid-cols-5">
      <div className="flex flex-col col-span-2">
        <div className="mb-3 flex items-baseline gap-2 text-ink-45">
          <p className="font-mono text-[clamp(15px,1.55vw)] font-medium tracking-[0.02em] text-ink lowercase">
            &lt;/experience&gt;
          </p>
          <i
            className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
            06
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
            / lini waktu
          </span>
        </div>

        <Headline />

        <p className="mt-5 max-w-[48ch] text-lede leading-[1.19] font-medium tracking-[-0.026em] text-balance text-ink">
          Setiap perjalanan meninggalkan jejak, dari apa yang dipelajari,
          dikerjakan, hingga pencapaian yang berhasil diraih.
        </p>

        <p className="mt-4 max-w-[48ch] text-body-lg leading-[1.55] text-ink-60">
          Tidak semuanya tentang hasil akhir, karena setiap pengalaman juga
          menjadi bagian dari proses untuk terus berkembang dan melangkah lebih
          jauh.
        </p>

        <div className="mt-[clamp(22px,2.6vw,36px)] flex flex-wrap items-center gap-x-6 gap-y-3">
          <Pill
            label="Lihat Lengkap"
            href="./docs/muhammad-ilham_devops_resume.pdf"
            icon="download"
          />
        </div>
      </div>
      <div className="flex flex-col col-span-3 h-full pb-4 justify-end">
        <div
          data-cursor={grabbing ? "grabbing" : "grab"}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className={`flex max-h-[57dvh] min-h-0 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            grabbing ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {entries.map((entry, i) => {
            const grouped =
              entry.group !== undefined &&
              entries[i - 1]?.group === entry.group;
            return (
              <article
                key={entry.period}
                className={`grid grid-cols-[104px_minmax(0,1fr)] gap-4 border-hairline py-4 last:border-b ${
                  grouped ? "border-t-0 " : "border-t"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-ink">
                    {entry.period}
                  </span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
                    {entry.kind}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold tracking-[-0.025em] text-ink">
                    {entry.role}
                  </h3>
                  <p className="mt-0.5 text-body font-medium text-accent-strong">
                    {entry.org}
                  </p>
                  <ul className="mt-2 flex flex-col gap-[4px]">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-[14px] text-[12px] leading-[1.45] text-ink-60 before:absolute before:top-[0.62em] before:left-0 before:h-px before:w-1.5 before:bg-accent before:content-['']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
