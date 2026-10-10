import { fetchJson, fetchJsonWithHeaders } from "./http";

export const UMAMI_SHARE_URL = "https://cloud.umami.is/share/Fqn57l2MC2wHTYPC";
export const UMAMI_SITE = "kiraryuuki.github.io";

const UMAMI_API_BASE = "https://cloud.umami.is/analytics/us/api";

export const UMAMI_SERIES_DAYS = 30;

export type UmamiPoint = {
  label: string;
  iso: string;
  sessions: number;
  pageViews: number;
};

export type UmamiStats = {
  site: string;
  pageViews: number;
  visitors: number;
  visits: number;
  countries: number;
  events: number;
  days: UmamiPoint[];
};

type UmamiShare = { websiteId: string; token: string };
type UmamiSummary = {
  pageviews: number;
  visitors: number;
  visits: number;
};
type UmamiSeriesPoint = { x: string; y: number };
type UmamiSeries = {
  pageviews: UmamiSeriesPoint[];
  sessions: UmamiSeriesPoint[];
};

function getUmamiShareSlug(): string {
  try {
    const parts = UMAMI_SHARE_URL.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  } catch {
    return "";
  }
}

function buildUmamiDayLabel(
  date: Date,
  prev: Date | null,
  dense: boolean,
): string {
  if (Number.isNaN(date.getTime())) return "";
  const startsMonth =
    prev === null ||
    Number.isNaN(prev.getTime()) ||
    prev.getMonth() !== date.getMonth() ||
    prev.getFullYear() !== date.getFullYear();
  const showMonth = dense ? startsMonth : true;
  const month = date.toLocaleDateString("id-ID", { month: "short" });
  return showMonth ? `${month} ${date.getDate()}` : String(date.getDate());
}

function buildUmamiDays(
  pageViewsSeries: UmamiSeriesPoint[],
  sessionsSeries: UmamiSeriesPoint[],
): UmamiPoint[] {
  const tail = pageViewsSeries.slice(-UMAMI_SERIES_DAYS);
  const sessionsByX = new Map(sessionsSeries.map((s) => [s.x, s.y]));
  const dense = tail.length > 14;
  return tail.map((point, i) => {
    const iso = typeof point.x === "string" ? point.x.slice(0, 10) : "";
    const date = new Date(point.x);
    const sessions = sessionsByX.get(point.x) ?? 0;
    if (Number.isNaN(date.getTime())) {
      return { label: `#${i + 1}`, iso, sessions, pageViews: point.y };
    }
    const prevRaw = tail[i - 1]?.x;
    const prev = prevRaw ? new Date(prevRaw) : null;
    return {
      label: buildUmamiDayLabel(date, prev, dense),
      iso,
      sessions,
      pageViews: point.y,
    };
  });
}

export async function fetchUmamiStats(
  signal?: AbortSignal,
): Promise<UmamiStats> {
  if (!UMAMI_SHARE_URL) throw new Error("UMAMI_SHARE_URL kosong");
  const slug = getUmamiShareSlug();
  if (!slug) throw new Error("Umami: slug share tidak valid");
  const share = await fetchUmamiShare(slug, signal);
  if (!share.websiteId || !share.token)
    throw new Error("Umami: share tidak valid");
  const headers = {
    "x-umami-share-token": share.token,
    "x-umami-share-context": "1",
  };
  const now = Date.now();
  const umamiGet = <T>(path: string): Promise<T> =>
    fetchJsonWithHeaders<T>(`${UMAMI_API_BASE}${path}`, headers, signal);
  const [summary, series, countries, events] = await Promise.all([
    umamiGet<UmamiSummary>(
      `/websites/${share.websiteId}/stats?startAt=0&endAt=${now}`,
    ),
    umamiGet<UmamiSeries>(
      `/websites/${share.websiteId}/pageviews?startAt=${now - UMAMI_SERIES_DAYS * 86_400_000}&endAt=${now}&unit=day`,
    ),
    umamiGet<UmamiSeriesPoint[]>(
      `/websites/${share.websiteId}/metrics?startAt=0&endAt=${now}&type=country`,
    ),
    umamiGet<UmamiSeriesPoint[]>(
      `/websites/${share.websiteId}/metrics?startAt=0&endAt=${now}&type=event`,
    ),
  ]);
  return {
    site: UMAMI_SITE,
    pageViews: Number(summary.pageviews ?? 0),
    visitors: Number(summary.visitors ?? 0),
    visits: Number(summary.visits ?? 0),
    countries: Array.isArray(countries) ? countries.length : 0,
    events: Array.isArray(events)
      ? events.reduce((a, e) => a + (e.y ?? 0), 0)
      : 0,
    days: buildUmamiDays(series.pageviews ?? [], series.sessions ?? []),
  };
}

async function fetchUmamiShare(
  slug: string,
  signal?: AbortSignal,
): Promise<UmamiShare> {
  return fetchJson<UmamiShare>(`${UMAMI_API_BASE}/share/${slug}`, signal);
}
