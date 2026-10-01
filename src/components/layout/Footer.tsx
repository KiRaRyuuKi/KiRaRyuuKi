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

export function Footer() {
  return (
    <footer className="relative z-[var(--z-ui)] mt-gutter flex flex-none flex-col gap-3 rounded-frame px-pad-x py-4 text-on-dark">
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
    </footer>
  );
}
