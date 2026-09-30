import { useEffect } from 'react'

export function useKeyboard({
  index,
  count,
  onSelect,
}: {
  index: number
  count: number
  onSelect: (index: number) => void
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable]')) return

      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
          event.preventDefault()
          onSelect(index + 1)
          break
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          onSelect(index - 1)
          break
        case 'Home':
          event.preventDefault()
          onSelect(0)
          break
        case 'End':
          event.preventDefault()
          onSelect(count - 1)
          break
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onSelect, index, count])
}
