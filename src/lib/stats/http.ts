export async function fetchJson<T>(
  url: string,
  signal?: AbortSignal,
): Promise<T> {
  const res = await fetch(url, { signal: signal ?? null });
  if (!res.ok) throw new Error(`API: ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchJsonWithHeaders<T>(
  url: string,
  headers: Record<string, string>,
  signal?: AbortSignal,
): Promise<T> {
  const res = await fetch(url, { signal: signal ?? null, headers });
  if (!res.ok) throw new Error(`API: ${res.status}`);
  return (await res.json()) as T;
}

export function pickArray<T>(...candidates: unknown[]): T[] {
  for (const c of candidates) {
    if (Array.isArray(c)) return c as T[];
  }
  return [];
}
