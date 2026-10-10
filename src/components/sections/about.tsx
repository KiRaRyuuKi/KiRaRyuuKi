import { JellyWord } from "../ui/JellyWord";
import { ProtectedImage } from "../ui/ProtectedImage";
import { Pill } from "../chrome/Pill";
import type { Meta } from "./meta";

export const id = "about";

export const meta: Meta = { num: "02", tab: "About", tag: "About" };

function Headline() {
  return (
    <h2
      className="text-display leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      data-cursor="text"
    >
      <span className="block" aria-label="Roda Waktu Berputar">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="Roda" accent />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Waktu" mono />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Berputar" accent />
          <JellyWord text="," mono />
        </span>
      </span>
      <span className="block" aria-label="Penantian Terakhir">
        <span aria-hidden="true" className="jelly-line">
          <JellyWord text="Penantian" mono />
          <span className="jelly">&nbsp;</span>
          <JellyWord text="Terakhir" accent />
        </span>
      </span>
    </h2>
  );
}

export function Panel() {
  return (
    <div className="grid grid-cols-1 h-full items-center gap-x-gutter gap-y-[clamp(26px,3vw,44px)] lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="mb-3 flex items-baseline gap-2 text-ink-45">
          <p className="font-mono text-[clamp(15px,1.55vw)] font-medium tracking-[0.02em] text-ink lowercase">
            &lt;/about&gt;
          </p>
          <i
            className="h-px w-[clamp(18px,3vw,46px)] bg-ink-30"
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
            02
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
            / hal tentangku?
          </span>
        </div>

        <Headline />

        <p className="mt-5 max-w-[62ch] text-lede leading-[1.19] font-medium tracking-[-0.026em] text-balance text-ink">
          Masih memegang tekad untuk terus belajar, berusaha, dan mencoba hal
          baru, serta pantang menyerah. Tidak ada yang instan, setiap proses
          memiliki waktunya tersendiri.
        </p>

        <p className="mt-4 max-w-[62ch] text-body-lg leading-[1.55] text-ink-60">
          Yang dibangun mungkin akan berubah, yang dipelajari mungkin akan
          terlupakan, tetapi pengalaman dari setiap proses akan selalu menjadi
          bagian dari perjalanan.
        </p>

        <p className="mt-4 max-w-[62ch] text-body-lg leading-[1.55] text-ink-60">
          Kemarin menjadi sejarah untuk dievaluasi, hari ini menjadi kesempatan
          untuk dijalani, dan besok selalu membawa sesuatu yang baru untuk
          ditemukan.
        </p>

        <div className="mt-[clamp(22px,2.6vw,36px)] flex flex-wrap items-center gap-x-6 gap-y-3">
          <Pill
            label="Lihat Lengkap"
            href="./docs/muhammad-ilham_fullstack_resume.pdf"
            icon="download"
          />
        </div>
      </div>

      <figure className="relative w-full max-w-[min(100%,350px)] mx-auto aspect-4/5 overflow-hidden place-items-center rounded-[22px] bg-card shadow-[0_1px_2px_rgba(10,10,10,0.05)] before:absolute before:top-3 before:left-3 before:z-1 before:size-4 before:border before:border-hairline before:border-r-0 before:border-b-0 before:content-[''] after:absolute after:right-3 after:bottom-3 after:z-1 after:size-4 after:border after:border-hairline after:border-t-0 after:border-l-0 after:content-['']">
        <div className="relative size-full p-[22px]">
          <ProtectedImage
            src="./images/foto-cv.png"
            alt="Foto profil KiRaRyuuKi"
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="size-full"
            imgClassName="object-cover"
          />
        </div>
        <figcaption className="sr-only">Portrait placeholder</figcaption>
      </figure>
    </div>
  );
}
