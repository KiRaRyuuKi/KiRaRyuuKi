import { base, type IconProps } from './base'

export function IconDownload({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} strokeLinecap="square" className={className}>
      <path d="M12 4v11M7 11l5 5 5-5M4.5 20h15" />
    </svg>
  )
}
