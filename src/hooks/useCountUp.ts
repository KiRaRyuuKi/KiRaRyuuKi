import { useEffect, useRef, useState } from "react";

// Animasi angka 0 → target saat elemen pertama kali terlihat.
// Pakai di kartu stat: const { ref, value } = useCountUp(7).
export function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);
  const lastTarget = useRef(target);

  useEffect(() => {
    // target berubah (mis. data live baru datang) → animasikan ulang
    if (lastTarget.current !== target) {
      lastTarget.current = target;
      done.current = false;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}
