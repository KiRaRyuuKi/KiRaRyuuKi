import { useEffect, useState } from 'react'

export function useHashSection(ids: readonly string[]) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const found = ids.indexOf(window.location.hash.slice(1))
    if (found > 0) setIndex(found)
  }, [ids])

  useEffect(() => {
    const id = ids[index]
    if (id === undefined) return
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }, [ids, index])

  return [index, setIndex] as const
}
