import { useCallback, useEffect, useRef, useState } from 'react'

type Voice = 'tick' | 'link' | 'panel'

const VOICES: Record<Voice, { freq: number; to: number; dur: number; gain: number }> = {
  tick: { freq: 620, to: 380, dur: 0.055, gain: 0.05 },
  link: { freq: 1180, to: 980, dur: 0.03, gain: 0.028 },
  panel: { freq: 880, to: 1320, dur: 0.04, gain: 0.024 },
}

const STORAGE_KEY = "kiraryuuki:sound";

export function useSound() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'off'
    } catch {
      return true
    }
  })

  const contextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
    } catch {
      /* Storage disabled. The setting just will not survive the session. */
    }
  }, [enabled])

  useEffect(() => {
    const context = contextRef.current
    if (!context || context.state !== 'running') return
    if (enabled) {
      void context.resume()
    } else {
      void context.suspend()
    }
  }, [enabled])

  const play = useCallback(
    (voice: Voice = 'link') => {
      if (!enabled) return
      const spec = VOICES[voice]

      let context = contextRef.current
      if (!context) {
        const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (!Ctor) return
        context = new Ctor()
        contextRef.current = context
      }
      if (context.state === 'suspended') void context.resume()

      const now = context.currentTime
      const osc = context.createOscillator()
      const gain = context.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(spec.freq, now)
      osc.frequency.exponentialRampToValueAtTime(spec.to, now + spec.dur)

      gain.gain.setValueAtTime(spec.gain, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + spec.dur)

      osc.connect(gain).connect(context.destination)
      osc.start(now)
      osc.stop(now + spec.dur)
    },
    [enabled],
  )

  return { enabled, setEnabled, play }
}
