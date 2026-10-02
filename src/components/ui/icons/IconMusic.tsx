import { base, type IconProps } from './base'

export function IconMusic({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 17.5V6l10-2v11.5" strokeLinecap="square" />
      <circle cx="6.5" cy="17.5" r="2.6" />
      <circle cx="16.5" cy="15.5" r="2.6" />
    </svg>
  )
}
