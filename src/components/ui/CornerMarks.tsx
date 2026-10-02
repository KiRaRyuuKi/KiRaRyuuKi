export function CornerMarks({ size = 12 }: { size?: number }) {
  const mark = {
    position: 'absolute' as const,
    width: size,
    height: size,
    pointerEvents: 'none' as const,
  }

  return (
    <>
      <span
        style={{
          ...mark,
          top: 10,
          left: 10,
          borderTop: '1px solid var(--hairline)',
          borderLeft: '1px solid var(--hairline)',
        }}
      />
      <span
        style={{
          ...mark,
          bottom: 10,
          right: 10,
          borderBottom: '1px solid var(--hairline)',
          borderRight: '1px solid var(--hairline)',
        }}
      />
    </>
  )
}
