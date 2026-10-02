export function IconButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`grid size-8 place-items-center rounded-[10px] transition-colors ${
        active ? 'bg-card text-accent-strong' : 'bg-card/70 text-ink-60 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
