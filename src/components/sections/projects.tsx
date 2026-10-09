import { useCallback, useEffect, useRef, useState } from "react";
import { CornerMarks } from "../ui/CornerMarks";
import { JellyWord } from "../ui/JellyWord";
import { ProtectedImage } from "../ui/ProtectedImage";
import { Modal } from "../layout/Modal";
import type { Meta } from "./meta";

export const id = "projects";

export const meta: Meta = { num: "03", tab: "Projects", tag: "Projects" };

function Headline() {
  return (
    <h2
      className="text-display leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      data-cursor="text"
    >
      <span className="block" aria-label="Bagaikan Sebuah Medali">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="Bagaikan" accent />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Sebuah" mono />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Medali" accent />
        </span>
      </span>
    </h2>
  );
}

type Project = {
  title: string;
  year: string;
  summary: string;
  tech: string[];
  links: { label: string; href: string; external?: boolean }[];
  images?: string[];
};

const projectImages = (slug: string, files: string[]) =>
  files.map((file) => `./images/projects/${slug}/${file}`);

const projects: Project[] = [
  {
    title: "Waves (Toolkit Serba Guna)",
    year: "2026 — Sekarang",
    summary:
      "REST API dengan FastAPI, frontend TypeScript/Next.js, eksperimen application security dan ML (PyTorch).",
    tech: ["TypeScript", "Next.js", "FastAPI", "PyTorch"],
    images: projectImages("Waves", [
      "01-music-studio.png",
      "02-stem-demucs.png",
      "03-voice-synthesis.png",
      "04-image-studio.png",
      "05-video-studio.png",
      "06-studio-remover.png",
      "07-screen-coder.png",
      "08-fine-tune-id.png",
      "09-llm-hub.png",
      "10-llm-detail.png",
      "11-media-downloader.png",
    ]),
    links: [
      {
        label: "Source",
        href: "https://github.com/KiRaRyuuKi",
        external: true,
      },
    ],
  },
  {
    title: "ModSecurity dan Nginx di Kubernetes",
    year: "2025 — 2026",
    summary:
      "Dual-layer defense (WAF dan caching) di NGINX Ingress Controller pada Kubernetes multi-node di Proxmox Virtual Environment, host AWS EC2. 95% serangan HTTP(S) Flood diblokir pada 1.000 user konkuren (JMeter), CPU app-pod < 25 millicores.",
    tech: ["Kubernetes", "ModSecurity", "Nginx", "JMeter"],
    images: projectImages("Thesis", [
      "01-diagram.png",
      "02-diagram.png",
      "03-diagram.png",
    ]),
    links: [
      {
        label: "Thesis",
        href: "./docs/detail/muhammad_ilham_thesis.pdf",
        external: true,
      },
    ],
  },
  {
    title: "PANDAWA (Geospatial Information System)",
    year: "2025",
    summary:
      "System pemetaan, monitoring, dan pengelolaan data sumber daya alam Kabupaten Bondowoso. Terdaftar sebagai hak cipta No. 000942745 (Juli 2025).",
    tech: ["Next.js", "TypeScript", "Prisma", "Postgres"],
    images: projectImages("PANDAWA", [
      "01-pandawa.png",
      "02-landing-page.png",
      "03-peta-interaktif.png",
      "04-detail-kecamatan.png",
      "05-authentication.png",
      "06-dashboard.png",
      "07-prediksi-hasil-panen.png",
    ]),
    links: [
      {
        label: "Source",
        href: "https://github.com/KiRaRyuuKi",
        external: true,
      },
    ],
  },
  {
    title: "Amfibi (Car Marketplace & Rental)",
    year: "2024",
    summary:
      "Marketplace mobil baru/bekas plus rental. Chat buyer/seller real-time, kalender ketersediaan, konfirmasi booking, invoice otomatis, RBAC.",
    tech: ["Laravel", "Livewire", "Tailwind", "Postgres"],
    images: projectImages("Amfibi", [
      "01-landing-page.png",
      "02-authentication.png",
      "03-dashboard.png",
      "04-market.png",
      "05-detail-mobil.png",
    ]),
    links: [
      {
        label: "Source",
        href: "https://github.com/KiRaRyuuKi",
        external: true,
      },
    ],
  },
  {
    title: "RisqiShop (Cashier & Inventory)",
    year: "2023",
    summary:
      "Aplikasi desktop kasir dan manajemen stok dengan fitur diskon/total otomatis, laporan harian-bulanan dengan ekspor PDF/Excel.",
    tech: ["Java", "SQLite"],
    images: projectImages("RisqiShop", [
      "01-menu-login.png",
      "02-transaksi.png",
      "03-supplier.png",
      "04-riwayat.png",
    ]),
    links: [
      {
        label: "Source",
        href: "https://github.com/KiRaRyuuKi",
        external: true,
      },
    ],
  },
];

export const projectCount = projects.length;

function Cover({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const cover = project.images?.[0];

  return (
    <div
      className={`hatch relative grid place-items-center overflow-hidden border-b border-hairline-soft ${className ?? ""}`}
    >
      {cover ? (
        <ProtectedImage
          src={cover}
          alt={`Cuplikan ${project.title}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <span className="text-[clamp(30px,3.2vw,44px)] leading-none font-bold tracking-[-0.05em] text-ink-18 transition-colors duration-300 group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <CornerMarks size={12} />
    </div>
  );
}

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const count = images.length;
  const go = (step: number) => setIdx((i) => (i + step + count) % count);

  return (
    <div className="relative aspect-[15/8] overflow-hidden border-b border-hairline-soft bg-panel-deep">
      <ProtectedImage
        key={images[idx]}
        src={images[idx]}
        alt={`Cuplikan ${title} — gambar ${idx + 1} dari ${count}`}
        loading="lazy"
        decoding="async"
        className="size-full object-contain"
      />

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Gambar sebelumnya"
            className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-hairline px-3 py-1.5 font-mono text-[12px] font-medium tracking-[0.12em] uppercase disabled:pointer-events-none disabled:opacity-30 bg-card/70 text-ink-80 backdrop-blur transition-colors hover:text-accent-strong"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Gambar berikutnya"
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-hairline px-3 py-1.5 font-mono text-[12px] font-medium tracking-[0.12em] uppercase disabled:pointer-events-none disabled:opacity-30 bg-card/70 text-ink-80 backdrop-blur transition-colors hover:text-accent-strong"
          >
            →
          </button>
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 rounded-full border border-hairline bg-card/70 px-2 py-[3px] font-mono text-[9px] font-medium tracking-[0.16em] text-ink-60 backdrop-blur"
          >
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  return (
    <Modal
      label={project.title}
      onClose={onClose}
      className="group relative flex max-h-[85dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] border border-hairline bg-card shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
    >
      {project.images?.length ? (
        <Gallery images={project.images} title={project.title} />
      ) : (
        <Cover project={project} index={index} className="aspect-[16/8]" />
      )}

      <div className="flex flex-col gap-2 overflow-y-auto px-5 pt-4 pb-5">
        <p className="flex items-baseline gap-2">
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
            / {project.year}
          </span>
        </p>

        <h3 className="text-[20px] font-semibold tracking-[-0.022em] text-ink">
          {project.title}
        </h3>

        <p className="text-body leading-[1.6] text-ink-60">{project.summary}</p>

        <ul className="flex flex-wrap gap-[5px] pt-1">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-hairline px-2 py-[3px] font-mono text-[9px] font-medium tracking-[0.08em] text-ink-60 uppercase"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 pt-2">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="inline-flex items-center gap-[5px] text-[12px] font-medium tracking-[-0.008em] text-ink-80 transition-colors duration-fast ease-cubie hover:text-accent-strong"
            >
              {link.label} →
            </a>
          ))}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase transition-colors hover:text-accent-strong"
          >
            Tutup —
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function Panel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [active, setActive] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      const w = trackRef.current?.clientWidth ?? 0;
      setPerPage(Math.min(4, Math.max(1, Math.floor((w + 12) / 242))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const pages = Math.max(1, Math.ceil(projects.length / perPage));

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  const shown = projects.slice(page * perPage, page * perPage + perPage);

  const open = (project: Project, index: number) => {
    setActive({ project, index });
  };

  const close = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <div className="flex flex-col h-full pb-1 justify-end">
      <div className="mb-3 flex items-baseline gap-2 text-ink-45">
        <p className="font-mono text-[clamp(15px,1.55vw)] font-medium tracking-[0.02em] text-ink lowercase">
          &lt;/projects&gt;
        </p>
        <i
          className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
          03
        </span>
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
          / karya kebanggaan
        </span>
      </div>

      <Headline />

      <p className="mt-4 max-w-[72ch] text-lede leading-[1.19] font-medium tracking-[-0.026em] text-balance text-ink">
        Setiap proses memiliki cerita dan pelajaran yang berbeda. Karena sesuatu
        hal yang pernah dilalui akan menjadi pengalaman untuk sesuatu yang lebih
        baik.
      </p>

      <div
        ref={trackRef}
        className="mt-[clamp(18px,2vw,28px)] grid gap-3"
        style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
      >
        {shown.map((project, i) => (
          <article
            key={project.title}
            onClick={() => open(project, page * perPage + i)}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[18px] bg-card shadow-[0_1px_2px_rgba(10,10,10,0.05)] transition-[transform,box-shadow] duration-300 ease-cubie hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,10,10,0.12)]"
          >
            <Cover
              project={project}
              index={page * perPage + i}
              className="aspect-[11/5]"
            />

            <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-4">
              <h3 className="flex items-baseline gap-2 text-[14px] font-semibold tracking-[-0.022em] text-ink">
                <button
                  type="button"
                  onClick={() => open(project, page * perPage + i)}
                  className="text-start transition-colors hover:text-accent-strong"
                >
                  {project.title}
                </button>
                <span className="ml-auto font-mono text-[9px] font-medium tracking-[0.1em] text-ink-45">
                  {project.year}
                </span>
              </h3>
              <p className="line-clamp-2 text-[12px] leading-[1.5] tracking-[-0.004em] text-ink-60">
                {project.summary}
              </p>
              <ul className="mt-auto flex flex-wrap gap-[5px] pt-1.5">
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline px-2 py-[3px] font-mono text-[9px] font-medium tracking-[0.08em] text-ink-60 uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase">
          {String(page + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Halaman proyek sebelumnya"
            className="rounded-full w-28 border border-hairline px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.12em] text-ink-60 uppercase transition-colors hover:text-accent-strong disabled:pointer-events-none disabled:opacity-30"
          >
            ← Previews
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page >= pages - 1}
            aria-label="Halaman proyek berikutnya"
            className="rounded-full w-28 border border-hairline px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.12em] text-ink-60 uppercase transition-colors hover:text-accent-strong disabled:pointer-events-none disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>

      {active && (
        <ProjectModal
          project={active.project}
          index={active.index}
          onClose={close}
        />
      )}
    </div>
  );
}
