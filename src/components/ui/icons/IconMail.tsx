import { base, type IconProps } from './base'

export function IconMail({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.6" y="5" width="18.8" height="14" rx="2" />
      <path d="m3.4 7 8.6 6 8.6-6" />
    </svg>
  )
}
