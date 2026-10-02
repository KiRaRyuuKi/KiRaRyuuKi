import { base, type IconProps } from './base'

export function IconSoundOn({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
      <path d="M15.5 9.2a4 4 0 0 1 0 5.6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  )
}
