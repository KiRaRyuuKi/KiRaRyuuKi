import { base, type IconProps } from './base'

export function IconGame({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 8h10a5 5 0 0 1 4.9 6l-.6 3a2.4 2.4 0 0 1-4 1.3L15.5 17h-7L6.7 18.3a2.4 2.4 0 0 1-4-1.3l-.6-3A5 5 0 0 1 7 8Z" />
      <path d="M7 12v2.6M5.7 13.3h2.6M16 12.4h.01M18 14.4h.01" strokeLinecap="round" />
    </svg>
  )
}
