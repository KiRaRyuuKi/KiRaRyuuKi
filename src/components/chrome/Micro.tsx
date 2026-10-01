export function Micro({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[10px] font-medium tracking-[0.16em] uppercase ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
