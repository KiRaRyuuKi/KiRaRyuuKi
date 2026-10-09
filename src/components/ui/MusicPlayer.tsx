import { useEffect, useMemo, useRef, useState } from "react";
import {
  PLAYLISTS,
  TRACKS,
  type Playlist,
  type Track,
} from "../../lib/musics";
import { IconMusic, IconSoundOff, IconSoundOn } from "../ui/icons";

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function IconDots({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

function IconPrevious({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
      className={className}
    >
      <path d="M6 5v14" strokeLinecap="round" />
      <path d="M19 5.5v13L9.5 12 19 5.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconNext({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
      className={className}
    >
      <path d="M18 5v14" strokeLinecap="round" />
      <path d="M5 5.5v13l9.5-6.5L5 5.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconRepeat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function IconShuffle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="4" x2="4" y2="20" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

export function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playlist, setPlaylist] = useState<"all" | Playlist>("all");
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("all");
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const volRef = useRef<HTMLDivElement | null>(null);
  const playlistRef = useRef<HTMLDivElement | null>(null);
  const lastFocus = useRef<Element | null>(null);

  // antrean putar = lagu-lagu di playlist aktif
  const queue = useMemo(
    () =>
      playlist === "all"
        ? TRACKS
        : TRACKS.filter((t) => t.playlist === playlist),
    [playlist],
  );

  const track = queue[queueIndex] as Track;

  const selectTrack = (next: number) => {
    const total = queue.length;
    if (total === 0) return;
    const clamped = ((next % total) + total) % total;
    setQueueIndex(clamped);
    setProgress(0);
    setMenuOpen(false);
    // autoplay lanjut kalau sedang main
    if (isPlaying) {
      requestAnimationFrame(() => {
        audioRef.current?.play().catch(() => setIsPlaying(false));
      });
    }
  };

  const choosePlaylist = (p: "all" | Playlist) => {
    setPlaylist(p);
    setQueueIndex(0);
    setProgress(0);
    setPlaylistOpen(false);
    setMenuOpen(false);
    if (isPlaying) {
      requestAnimationFrame(() => {
        audioRef.current?.play().catch(() => setIsPlaying(false));
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play().catch(() => setIsPlaying(false));
    }
  };

  const randomNext = (exclude: number) => {
    if (queue.length < 2) return exclude;
    let n = exclude;
    while (n === exclude) n = Math.floor(Math.random() * queue.length);
    return n;
  };

  const goNext = () => {
    selectTrack(shuffle ? randomNext(queueIndex) : queueIndex + 1);
  };

  const goPrevious = () => {
    selectTrack(shuffle ? randomNext(queueIndex) : queueIndex - 1);
  };

  const cycleRepeat = () => {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  };

  const close = () => {
    setOpen(false);
    setMenuOpen(false);
    setVolumeOpen(false);
    setPlaylistOpen(false);
    (lastFocus.current as HTMLElement | null)?.focus?.();
  };

  // ganti src saat track berubah
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.getAttribute("src") !== track.src) {
      audio.src = track.src;
      audio.load();
      if (isPlaying) {
        void audio.play().catch(() => setIsPlaying(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.src]);

  // terapkan volume / mute ke elemen audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  // tutup saat klik di luar / Escape — pola sama seperti hobby popover di profile
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // kalau ada panel yang kebuka, tutup itu dulu (playlist paling atas)
      if (playlistOpen) {
        setPlaylistOpen(false);
        return;
      }
      if (menuOpen) {
        setMenuOpen(false);
        return;
      }
      if (volumeOpen) {
        setVolumeOpen(false);
        return;
      }
      close();
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t)) return;
      if (wrapRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, menuOpen, volumeOpen, playlistOpen]);

  // tutup dropdown (titik-tiga / playlist / volume) saat klik di area popup
  // tapi di luar wadahnya. Ditangani di onClick popup (React,
  // child-dulu-baru-parent) supaya tidak balapan dengan toggle tombol.
  const onPopupClick = (e: React.MouseEvent) => {
    if (
      menuOpen &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
    if (
      volumeOpen &&
      volRef.current &&
      !volRef.current.contains(e.target as Node)
    ) {
      setVolumeOpen(false);
    }
    if (
      playlistOpen &&
      playlistRef.current &&
      !playlistRef.current.contains(e.target as Node)
    ) {
      setPlaylistOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative flex-none">
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          const audio = audioRef.current;
          if (!audio) return;
          // repeat satu lagu -> ulang dari awal
          if (repeat === "one") {
            audio.currentTime = 0;
            void audio.play().catch(() => setIsPlaying(false));
            return;
          }
          const next =
            shuffle && queue.length > 1
              ? randomNext(queueIndex)
              : queueIndex + 1;
          // habis di lagu terakhir:
          // repeat all -> balik ke awal, repeat off -> berhenti
          if (next >= queue.length) {
            if (repeat === "all") {
              selectTrack(0);
            } else {
              audio.currentTime = 0;
              setProgress(0);
              return;
            }
          } else {
            selectTrack(next);
          }
          // WAJIB autoplay: jangan andalkan isPlaying (sudah false karena
          // event 'pause' ikut fire saat lagu habis)
          requestAnimationFrame(() => {
            const a = audioRef.current;
            if (a) void a.play().catch(() => setIsPlaying(false));
          });
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
      />

      <button
        type="button"
        title={
          isPlaying
            ? `Now playing: ${track.artist} — ${track.title}`
            : "Putar musik"
        }
        aria-label={
          isPlaying
            ? `Now playing: ${track.artist} — ${track.title}`
            : "Putar musik"
        }
        aria-expanded={open}
        aria-controls={open ? "music-pop" : undefined}
        onClick={() => {
          if (!open) lastFocus.current = document.activeElement;
          setOpen((v) => !v);
        }}
        className={`group grid size-[44px] flex-none place-items-center rounded-[12px] bg-strip-8 transition-colors hover:bg-accent ${
          open ? "bg-accent" : ""
        }`}
      >
        {/* kaset / vinyl — ikut mutar saat lagu diputar */}
        <span
          aria-hidden="true"
          className="animate-vinyl relative grid size-[30px] place-items-center rounded-full border border-on-dark-30 bg-strip transition-colors group-hover:border-accent-ink/40"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          <span className="absolute inset-[5px] rounded-full border border-dashed border-on-dark-30" />
          <span className="grid size-[11px] place-items-center rounded-full bg-accent transition-colors group-hover:bg-accent-ink">
            <IconMusic className="size-[6px] text-accent-ink transition-colors group-hover:text-accent" />
          </span>
        </span>
      </button>

      {open && (
        <div
          ref={(el) => {
            popRef.current = el;
          }}
          className="absolute bottom-full left-0 z-10 mb-3"
        >
          <div
            id="music-pop"
            role="dialog"
            aria-label={`Now playing: ${track.artist} — ${track.title}`}
            onClick={onPopupClick}
            className="slide-fade relative w-[370px] max-w-[80vw] rounded-[18px] border border-hairline bg-card p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
          >
            {/* panah ke bawah — mengarah ke kaset (kebalikan hobby popover) */}
            <span
              aria-hidden="true"
              className="absolute -bottom-[5px] left-[17.5px] size-[10px] rotate-45 border-r border-b border-hairline bg-card"
            />

            <div className="flex items-center gap-2">
              {/* dropdown ganti playlist */}
              <div ref={playlistRef} className="relative flex-none">
                <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
                  {String(queueIndex + 1).padStart(2, "0")}{" "}
                </span>
                <button
                  type="button"
                  title="Pilih playlist"
                  aria-label="Pilih playlist"
                  aria-expanded={playlistOpen}
                  onClick={() => {
                    setPlaylistOpen((v) => !v);
                    setMenuOpen(false);
                    setVolumeOpen(false);
                  }}
                  className={`font-mono text-[10px] font-medium tracking-[0.16em] uppercase transition-colors hover:text-accent-strong ${
                    playlistOpen ? "text-accent-strong" : "text-ink-45"
                  }`}
                >
                  / {playlist}
                </button>
                {playlistOpen && (
                  <div
                    role="menu"
                    aria-label="Pilih playlist"
                    className="slide-fade absolute bottom-full left-0 z-10 mb-2 w-[190px] overflow-hidden rounded-[12px] border border-hairline bg-card shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
                  >
                    {PLAYLISTS.map((p) => {
                      const count =
                        p === "all"
                          ? TRACKS.length
                          : TRACKS.filter((t) => t.playlist === p).length;
                      return (
                        <button
                          key={p}
                          type="button"
                          role="menuitem"
                          aria-current={p === playlist}
                          disabled={count === 0}
                          onClick={() => choosePlaylist(p)}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition-colors hover:bg-panel-deep disabled:pointer-events-none disabled:opacity-30 ${
                            p === playlist
                              ? "font-semibold text-accent-strong"
                              : "text-ink-80"
                          }`}
                        >
                          <span className="min-w-0 flex-1 truncate">/ {p}</span>
                          <span className="font-mono text-[10px] text-ink-45">
                            {count}
                          </span>
                          {p === playlist && (
                            <span
                              aria-hidden="true"
                              className="size-[6px] flex-none rounded-full bg-accent-strong"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* transport: repeat | shuffle | previous | next | titik 3 (playlist) */}
              <div
                ref={menuRef}
                className="relative ml-auto flex flex-none items-center gap-0.5"
              >
                <button
                  type="button"
                  title={shuffle ? "Acak: nyala" : "Acak: mati"}
                  aria-label="Mode acak"
                  aria-pressed={shuffle}
                  onClick={() => setShuffle((s) => !s)}
                  className={`grid size-[28px] place-items-center rounded-lg transition-colors hover:bg-panel-deep hover:text-accent-strong ${
                    shuffle ? "bg-panel-deep text-accent-strong" : "text-ink-45"
                  }`}
                >
                  <IconShuffle className="size-[14px]" />
                </button>
                <button
                  type="button"
                  title={
                    repeat === "off"
                      ? "Ulangi: mati"
                      : repeat === "all"
                        ? "Ulangi: semua"
                        : "Ulangi: satu lagu"
                  }
                  aria-label="Mode ulangi"
                  aria-pressed={repeat !== "off"}
                  onClick={cycleRepeat}
                  className={`relative grid size-[28px] place-items-center rounded-lg transition-colors hover:bg-panel-deep hover:text-accent-strong ${
                    repeat !== "off"
                      ? "bg-panel-deep text-accent-strong"
                      : "text-ink-45"
                  }`}
                >
                  <IconRepeat className="size-[14px]" />
                  {repeat === "one" && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-0.5 -right-0.5 grid size-[12px] place-items-center rounded-full bg-accent-strong text-[8px] font-bold text-white"
                    >
                      1
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  title="Lagu sebelumnya"
                  aria-label="Lagu sebelumnya"
                  onClick={goPrevious}
                  className="grid size-[28px] place-items-center rounded-lg text-ink-45 transition-colors hover:bg-panel-deep hover:text-accent-strong"
                >
                  <IconPrevious className="size-[14px]" />
                </button>
                <button
                  type="button"
                  title="Lagu berikutnya"
                  aria-label="Lagu berikutnya"
                  onClick={goNext}
                  className="grid size-[28px] place-items-center rounded-lg text-ink-45 transition-colors hover:bg-panel-deep hover:text-accent-strong"
                >
                  <IconNext className="size-[14px]" />
                </button>
                {/* volume — slider vertikal kebuka ke atas */}
                <div ref={volRef} className="relative flex-none">
                  <button
                    type="button"
                    title="Volume"
                    aria-label="Volume"
                    aria-expanded={volumeOpen}
                    onClick={() => {
                      setVolumeOpen((v) => !v);
                      setMenuOpen(false);
                      setPlaylistOpen(false);
                    }}
                    className={`grid size-[28px] place-items-center rounded-lg transition-colors hover:bg-panel-deep hover:text-accent-strong ${
                      volumeOpen
                        ? "bg-panel-deep text-accent-strong"
                        : "text-ink-45"
                    }`}
                  >
                    {muted || volume === 0 ? (
                      <IconSoundOff className="size-[14px]" />
                    ) : (
                      <IconSoundOn className="size-[14px]" />
                    )}
                  </button>
                  {volumeOpen && (
                    <div className="slide-fade absolute bottom-full left-1/2 z-10 mb-2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-[12px] border border-hairline bg-card p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={muted ? 0 : volume}
                        aria-label="Volume"
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setVolume(v);
                          setMuted(v === 0);
                        }}
                        className="h-[96px] w-[16px] cursor-pointer"
                        style={{
                          accentColor: "var(--accent-strong)",
                          writingMode: "vertical-lr",
                          direction: "rtl",
                        }}
                      />
                      <span className="font-mono text-[10px] text-ink-45">
                        {Math.round((muted ? 0 : volume) * 100)}
                      </span>
                      <button
                        type="button"
                        title={muted ? "Suarakan" : "Mute"}
                        aria-label={muted ? "Suarakan" : "Mute"}
                        onClick={() => setMuted((m) => !m)}
                        className="grid size-[24px] place-items-center rounded-lg text-ink-60 transition-colors hover:bg-panel-deep hover:text-accent-strong"
                      >
                        {muted ? (
                          <IconSoundOff className="size-[13px]" />
                        ) : (
                          <IconSoundOn className="size-[13px]" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  title="Pilih lagu"
                  aria-label="Pilih lagu"
                  aria-expanded={menuOpen}
                  onClick={() => {
                    setMenuOpen((v) => !v);
                    setVolumeOpen(false);
                    setPlaylistOpen(false);
                  }}
                  className={`grid size-[28px] place-items-center rounded-lg transition-colors hover:bg-panel-deep hover:text-accent-strong ${
                    menuOpen
                      ? "bg-panel-deep text-accent-strong"
                      : "text-ink-45"
                  }`}
                >
                  <IconDots className="size-[14px]" />
                </button>
                {menuOpen && (
                  <div
                    role="menu"
                    aria-label="Daftar lagu"
                    className="slide-fade absolute bottom-full right-0 z-10 mb-2 max-h-[21.5dvh] min-h-0 w-[340px] overflow-hidden rounded-[12px] border border-hairline bg-card shadow-[0_12px_40px_rgba(0,0,0,0.22)] overflow-y-auto [scrollbar-width:none]"
                  >
                    {queue.map((t, i) => (
                      <button
                        key={t.src}
                        type="button"
                        role="menuitem"
                        aria-current={i === queueIndex}
                        onClick={() => selectTrack(i)}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition-colors hover:bg-panel-deep ${
                          i === queueIndex
                            ? "font-semibold text-accent-strong"
                            : "text-ink-80"
                        }`}
                      >
                        <span className="font-mono text-[10px] text-ink-45">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {t.artist} — {t.title}
                        </span>
                        {i === queueIndex && (
                          <span
                            aria-hidden="true"
                            className="size-[6px] flex-none rounded-full bg-accent-strong"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              {/* tombol pause/start — ring-nya ikut mutar saat lagu diputar */}
              <button
                type="button"
                title={isPlaying ? "Pause" : "Putar"}
                aria-label={isPlaying ? "Pause" : "Putar"}
                onClick={togglePlay}
                className="relative grid size-[44px] flex-none place-items-center rounded-xl bg-panel-deep text-accent-strong transition-all hover:bg-accent hover:text-accent-ink active:scale-95"
              >
                <span
                  aria-hidden="true"
                  className="animate-vinyl relative grid size-[30px] place-items-center rounded-full border border-on-dark-30 bg-strip transition-colors group-hover:border-accent-ink/40"
                  style={{
                    animationPlayState: isPlaying ? "running" : "paused",
                  }}
                >
                  <span className="absolute inset-[5px] rounded-full border border-dashed border-on-dark-30" />
                  <span className="grid size-[11px] place-items-center rounded-full bg-accent transition-colors group-hover:bg-accent-ink">
                    <IconMusic className="size-[6px] text-accent-ink transition-colors group-hover:text-accent" />
                  </span>
                </span>
              </button>
              <div className="min-w-0">
                <h3 className="truncate text-[14px] font-semibold tracking-[-0.02em] text-ink">
                  {track.title}
                </h3>
                <p className="truncate text-[12px] text-ink-60">
                  {track.artist}
                </p>
              </div>

              <span
                aria-hidden="true"
                className={`ml-auto flex flex-none items-end gap-[2px] ${isPlaying ? "" : "opacity-40"}`}
              >
                {[0, 1, 2, 3].map((i) => (
                  <i
                    key={i}
                    className="w-[2.5px] rounded-full bg-accent-strong"
                    style={{
                      height: isPlaying ? undefined : "2.5px",
                      animation: isPlaying
                        ? `eq-bounce 0.9s ease-in-out ${i * 0.14}s infinite`
                        : "none",
                    }}
                  />
                ))}
              </span>
            </div>

            {/* progress */}
            <div className="mt-3">
              <div
                className="h-[4px] w-full cursor-pointer overflow-hidden rounded-full bg-ink-18"
                role="slider"
                tabIndex={0}
                aria-label="Posisi lagu"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration || 0)}
                aria-valuenow={Math.round(progress)}
                onClick={(e) => {
                  const audio = audioRef.current;
                  if (!audio || !duration) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ratio = Math.min(
                    1,
                    Math.max(0, (e.clientX - rect.left) / rect.width),
                  );
                  audio.currentTime = ratio * duration;
                }}
                onKeyDown={(e) => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  if (e.key === "ArrowRight")
                    audio.currentTime = Math.min(
                      duration || 0,
                      audio.currentTime + 5,
                    );
                  if (e.key === "ArrowLeft")
                    audio.currentTime = Math.max(0, audio.currentTime - 5);
                }}
              >
                <div
                  className="h-full rounded-full bg-accent-strong transition-[width]"
                  style={{
                    width: `${duration ? Math.min(100, (progress / duration) * 100) : 0}%`,
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-45">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
