import { base, type IconProps } from './base'

export function IconBrush({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20c0-3.5 2-5 4-5 1.4 0 2.2.8 3 1.6C11.8 15.8 13 14 16 14c2 0 4 1 4 3.4 0 2.7-2.4 4.6-5 4.6H7c-1.7 0-3-1-3-2Z" />
      <path d="m11 14 7.4-7.4a1.9 1.9 0 0 1 2.7 2.7L13.6 16.7" strokeLinecap="square" />
    </svg>
  )
}
