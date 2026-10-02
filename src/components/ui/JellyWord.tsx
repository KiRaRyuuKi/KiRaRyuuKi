export function JellyWord({
  text,
  accent = false,
  mono = false,
}: {
  text: string;
  accent?: boolean;
  mono?: boolean;
}) {
  const letters = [...text];
  return (
    <span className="jelly-word">
      <span
        className={`jelly-word-back${mono ? " jelly-word-back--mono" : ""}`}
        aria-hidden="true"
      >
        {letters.map((c, i) => (
          <span key={i} className="jelly-ghost">
            {c}
          </span>
        ))}
      </span>
      <span className="jelly-word-front">
        {letters.map((c, i) => (
          <span key={i} className={`jelly${accent ? " jelly-accent" : ""}`}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}
