import { useState } from "react";
import { Modal } from "../layout/Modal";
import { IconGitHub, IconLinkedIn, IconMail, IconPin } from "../ui/icons";
import { MusicPlayer } from "../ui/MusicPlayer";

const contacts = [
  {
    label: "Email",
    value: "m.ilham.v.28.07.2003@gmail.com",
    href: "mailto:m.ilham.v.28.07.2003@gmail.com",
    icon: IconMail,
  },
  {
    label: "GitHub",
    value: "@KiRaRyuuKi",
    href: "https://github.com/KiRaRyuuKi",
    icon: IconGitHub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kiraryuuki",
    href: "https://linkedin.com/in/kiraryuuki",
    icon: IconLinkedIn,
  },
  {
    label: "Lokasi",
    value: "Bondowoso, Jawa Timur",
    href: "https://www.openstreetmap.org/search?query=Bondowoso",
    icon: IconPin,
  },
] as const;

function AccessibilityModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      label="Aksesibilitas"
      onClose={onClose}
      className="relative flex max-h-[85dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] border border-hairline bg-card shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
    >
      <div className="flex flex-col gap-3 overflow-y-auto px-5 py-5">
        <p className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
          Aksesibilitas
        </p>
        <h3 className="text-[20px] font-semibold tracking-[-0.022em] text-ink">
          Dukungan aksesibilitas
        </h3>
        <ul className="flex flex-col gap-2.5 text-body leading-[1.6] text-ink-60">
          <li>
            <span className="text-ink">Zoom teks.</span> Ukuran teks mengikuti
            zoom browser (Ctrl/Cmd + / −) dan pengaturan sistem; tata letak ikut
            menyesuaikan.
          </li>
          <li>
            <span className="text-ink">Keyboard.</span> Tekan{" "}
            <kbd className="rounded border border-hairline px-1 font-mono text-[10px] text-ink-80">
              ←
            </kbd>{" "}
            /{" "}
            <kbd className="rounded border border-hairline px-1 font-mono text-[10px] text-ink-80">
              →
            </kbd>{" "}
            (atau PageUp/PageDown) untuk berpindah bagian, Home/End ke
            awal/akhir, Tab untuk pindah fokus, dan Esc untuk menutup dialog.
          </li>
          <li>
            <span className="text-ink">Gerak.</span> Animasi otomatis dikurangi
            bila perangkat mengaktifkan "reduce motion".
          </li>
          <li>
            <span className="text-ink">Skrin pembaca.</span> Setiap bagian
            berlabel dan perpindahan bagian diumumkan.
          </li>
        </ul>
        <p className="text-[12px] leading-[1.6] text-ink-45">
          Menemukan kendala? Hubungi{" "}
          <a
            href="mailto:m.ilham.v.28.07.2003@gmail.com"
            className="text-ink-80 underline underline-offset-2 transition-colors hover:text-accent-strong"
          >
            m.ilham.v.28.07.2003@gmail.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-1 self-start font-mono text-[10px] font-medium tracking-[0.16em] text-ink-45 uppercase transition-colors hover:text-accent-strong"
        >
          Tutup —
        </button>
      </div>
    </Modal>
  );
}

export function Footer() {
  const [a11y, setA11y] = useState(false);

  return (
    <footer className="relative z-[var(--z-ui)] mt-gutter flex flex-none flex-col gap-3 rounded-frame px-pad-x py-1 text-on-dark">
      <div className="flex pt-4 items-end justify-between gap-5">
        <div className="flex min-w-0 items-center gap-3">
          <MusicPlayer />
          <p className="max-w-[50ch] text-[11.5px] leading-[1.4] text-on-dark-45">
            Punya sesuatu dan butuh solusi, atau mau ngobrol soal project?
            Hubungi saja, biasanya dibalas kok...
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto:") ? undefined : "noreferrer"
              }
              className="group flex min-w-0 items-center gap-2 transition-colors"
            >
              <span className="grid size-[26px] flex-none place-items-center rounded-[8px] bg-strip-8 transition-colors group-hover:bg-accent">
                <contact.icon className="size-[13px] shrink-0 text-on-dark-60 transition-colors group-hover:text-accent-ink" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-mono text-[8.5px] font-medium tracking-[0.16em] text-on-dark-30 uppercase">
                  {contact.label}
                </span>
                <span className="truncate text-[11.5px] font-medium tracking-[-0.012em] text-on-dark-60 transition-colors group-hover:text-on-dark">
                  {contact.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-on-dark-8 pt-3">
        <p className="font-mono text-[9.5px] font-medium tracking-[0.14em] text-on-dark-30 uppercase">
          Navigasi keyboard · ← → · Tab · Esc
        </p>
        <button
          type="button"
          onClick={() => setA11y(true)}
          className="font-mono text-[9.5px] font-medium tracking-[0.14em] text-on-dark-45 uppercase underline-offset-2 transition-colors hover:text-on-dark hover:underline"
        >
          Aksesibilitas
        </button>
      </div>

      {a11y && <AccessibilityModal onClose={() => setA11y(false)} />}
    </footer>
  );
}
