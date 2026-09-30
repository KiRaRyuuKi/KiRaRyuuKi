import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'default' | 'link' | 'text' | 'grab' | 'grabbing'>('default')

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    document.documentElement.setAttribute('data-cursor', 'on')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...target }
    let frame = 0

    const render = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY

      const grab = (event.target as Element | null)?.closest?.(
        '[data-cursor="grab"], [data-cursor="grabbing"]',
      )?.getAttribute('data-cursor') as 'grab' | 'grabbing' | null
      const hit = !grab && (event.target as Element | null)?.closest?.(
        'a, button, [data-cursor="link"]',
      )
      const text = !grab && !hit && (event.target as Element | null)?.closest?.('[data-cursor="text"]')
      setState(grab ?? (hit ? 'link' : text ? 'text' : 'default'))
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = ''
      if (ringRef.current) ringRef.current.style.opacity = ''
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      document.documentElement.removeAttribute('data-cursor')
    }
  }, [])

  return { dotRef, ringRef, state }
}
