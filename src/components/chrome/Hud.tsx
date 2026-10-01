export function Hud() {
  const tick = "absolute size-[26px] border border-hairline";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[var(--z-annotations)]"
      aria-hidden="true"
    >
      <span className={`${tick} top-10 left-10 border-r-0 border-b-0`} />
      <span className={`${tick} top-10 right-10 border-b-0 border-l-0`} />
      <span className={`${tick} bottom-34 left-10 border-r-0 border-t-0`} />
      <span className={`${tick} right-10 bottom-34 border-t-0 border-l-0`} />
    </div>
  );
}
