import { base, type IconProps } from './base'

export function IconArrow({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} strokeLinecap="square" className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}
