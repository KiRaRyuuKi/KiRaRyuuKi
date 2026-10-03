import { useRef, useState } from "react";
import { JellyWord } from "../ui/JellyWord";
import type { Meta } from "./meta";

export const id = "skills";

export const meta: Meta = { num: "04", tab: "Skills", tag: "Skills" };

function Headline() {
  return (
    <h2
      className="text-display leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      data-cursor="text"
    >
      <span className="block" aria-label="Menemani Pekerjaan">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="Menemani" mono />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Pekerjaan" accent />
        </span>
      </span>
    </h2>
  );
}

const groups = [
  {
    group: "Frontend",
    items: [
      { name: "JavaScript", note: "logika, DOM, event" },
      { name: "TypeScript", note: "Next.js App Router, SSR/SSG" },
      { name: "React", note: "komponen, state, data fetching" },
      { name: "Next.js", note: "SSR, SSG, metadata dinamis" },
      { name: "Tailwind CSS", note: "responsive UI, token" },
      { name: "UI/UX Designer", note: "Figma, sistem desain" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "REST API", note: "desain, autentikasi" },
      { name: "Node.js", note: "dasar, API kecil" },
      { name: "Laravel", note: "Livewire, RBAC" },
      { name: "Python", note: "pemrograman dasar, algoritma" },
      { name: "FastAPI", note: "REST API, Python" },
      { name: "SQLite", note: "deployment lokal ringan" },
      { name: "Postgres", note: "skema, query, migrasi" },
      { name: "Prisma ORM", note: "model, migrasi" },
    ],
  },
  {
    group: "Deployment & Quality Assurance",
    items: [
      { name: "Git / GitHub", note: "branch, rebase, review" },
      { name: "GitLab CI/CD", note: "otomatisasi build & deploy" },
      { name: "Jenkins", note: "workflow CI/CD" },
      { name: "Docker", note: "dasar, container" },
      { name: "Kubernetes", note: "orchestration, scaling" },
      { name: "Nginx", note: "reverse proxy, caching" },
      { name: "SEO", note: "technical SEO, metadata" },
      { name: "Lighthouse", note: "audit performa & SEO" },
    ],
  },
  {
    group: "Infrastruktur & Security",
    items: [
      { name: "Proxmox Virtual Environment", note: "LXC/KVM" },
      { name: "Kubernetes", note: "multi-node, NGINX Ingress" },
      { name: "ModSecurity", note: "OWASP CRS" },
      { name: "Terraform", note: "Infrastructure as Code" },
      { name: "Ansible", note: "otomatisasi konfigurasi" },
      { name: "PyTorch", note: "eksperimen model" },
      { name: "Apache JMeter", note: "pengujian beban user" },
      { name: "Machine Learning", note: "eksperimen, KNN" },
    ],
  },
];

export const skillCount = groups.reduce((n, g) => n + g.items.length, 0);

function Meter({ level }: { level: number }) {
  return (
    <div className="tile__meter" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} data-on={i < level ? "true" : undefined} />
      ))}
    </div>
  );
}

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
    <div className="flex flex-col h-full pb-1 justify-end">
      <div className="mb-3 flex items-baseline gap-2 text-ink-45">
        <p className="font-mono text-[clamp(15px,1.55vw)] font-medium tracking-[0.02em] text-ink lowercase">
          &lt;/skills&gt;
        </p>
        <i
          className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
          04
        </span>
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
          / sebuah bekal
        </span>
      </div>

      <Headline />

      <p className="mt-4 max-w-[72ch] text-lede leading-[1.19] font-medium tracking-[-0.026em] text-balance text-ink">
        Bukan daftar harta, melainkan bekal yang terus bertambah sepanjang
        perjalanan. Ada yang sudah lama digunakan, ada yang baru dipelajari, dan
        ada yang mungkin akan ditemukan kembali ketika dibutuhkan.
      </p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 mt-6 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <div key={group.group} className="flex flex-col">
            <p className="mb-3 flex items-center gap-[9px] text-ink-60">
              <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
                {group.group}
              </span>
              <i className="h-px flex-1 bg-hairline" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-30"
              >
                {"</>"}
              </span>
            </p>
            <ul
              data-cursor={grabbing ? "grabbing" : "grab"}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onPointerCancel={endDrag}
              className={`flex max-h-[39dvh] min-h-0 flex-col gap-[7px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                grabbing ? "cursor-grabbing select-none" : "cursor-grab"
              }`}
            >
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="group tile rounded-[14px] bg-card p-3 transition-[transform,box-shadow] duration-fast ease-cubie hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(10,10,10,0.09)]"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold tracking-[-0.018em] text-ink">
                      {item.name}
                    </p>
                    <span className="tile__px" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-[1.4] text-ink-45">
                    {item.note}
                  </p>
                  <Meter level={5} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
