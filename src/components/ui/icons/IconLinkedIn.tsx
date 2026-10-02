import { base, type IconProps } from './base'

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" className={className}>
      <path d="M4.5 3.6a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2.9 9.4h3.2V21H2.9V9.4Zm5.4 0h3.07v1.58h.04c.43-.8 1.47-1.65 3.02-1.65 3.23 0 3.83 2 3.83 4.6V21h-3.2v-5.2c0-1.24-.02-2.84-1.83-2.84-1.83 0-2.11 1.35-2.11 2.75V21H8.3V9.4Z" />
    </svg>
  )
}
