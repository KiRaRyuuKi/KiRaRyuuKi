const SPRITE = [
  'off',
  'off',
  'on',
  'on',
  'off',
  'off',
  'on',
  'accent',
  'on',
  'off',
  'on',
  'accent',
  'off',
  'accent',
  'on',
  'on',
  'on',
  'on',
  'on',
  'on',
  'off',
  'off',
  'on',
  'off',
  'off',
] as const

export function PixelSprite({ px = 3, className }: { px?: number; className?: string }) {
  return (
    <span
      className={`pixel-sprite ${className ?? ''}`}
      style={{ '--px': `${px}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      {SPRITE.map((cell, index) => (
        <i key={index} data-on={cell} />
      ))}
    </span>
  )
}
