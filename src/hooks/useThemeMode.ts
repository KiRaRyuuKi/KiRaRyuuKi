import { useCallback, useState } from 'react'

export type Mode = 'light' | 'dark'

const STORAGE_KEY = "kiraryuuki:mode";

function readInitialMode(): Mode {
  const attr = document.documentElement.dataset.mode
  return attr === 'dark' || attr === 'light' ? attr : 'light'
}

export function useThemeMode() {
  const [mode, setMode] = useState<Mode>(readInitialMode)

  const toggleMode = useCallback(() => {
    setMode((current) => {
      const next: Mode = current === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-mode', next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* Storage disabled. The choice lasts this page only. */
      }
      return next
    })
  }, [])

  return { mode, toggleMode } as const
}
