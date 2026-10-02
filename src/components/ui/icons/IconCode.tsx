import { base, type IconProps } from './base'

export function IconCode({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 7 4 12l5 5M15 7l5 5-5 5" strokeLinecap="square" />
    </svg>
  )
}
