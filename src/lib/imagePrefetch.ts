const fetched = new Set<string>();

export function prefetchImages(urls: (string | undefined)[]): void {
  for (const url of urls) {
    if (!url || fetched.has(url)) continue;
    fetched.add(url);
    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = "low";
    img.src = url;
  }
}

const IDLE_TIMEOUT = 4000;

function whenIdle(cb: () => void): () => void {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout: IDLE_TIMEOUT });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 250);
  return () => clearTimeout(id);
}

export function prefetchImagesIdle(urls: string[], chunk = 4): void {
  let i = 0;
  const next = () => {
    prefetchImages(urls.slice(i, i + chunk));
    i += chunk;
    if (i < urls.length) whenIdle(next);
  };
  whenIdle(next);
}