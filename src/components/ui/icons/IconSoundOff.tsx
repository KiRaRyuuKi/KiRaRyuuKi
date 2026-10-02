import { base, type IconProps } from './base'

export function IconSoundOff({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
      <path d="m16 9.5 4 5M20 9.5l-4 5" />
    </svg>
  )
}
