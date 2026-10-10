import {
  formatDuration,
  formatLongDate,
  formatShortDay,
} from "./format";
import { fetchJson, pickArray } from "./http";

export const WAKATIME_SHARE_URL =
  "https://wakatime.com/share/@31bbc57a-0658-47f3-a3b5-8fb13ca037a7/fe0ee069-f6fa-4411-aa1f-0cfb0a7c5eb2.json";

export const WAKATIME_LANGUAGES_SHARE_URL =
  "https://wakatime.com/share/@31bbc57a-0658-47f3-a3b5-8fb13ca037a7/c299a46d-f375-472d-a309-8c164150b00e.json";

export const WAKATIME_PROXY_URL = "";

export type WakatimeStats = {
  startDate: string;
  endDate: string;
  avgDaily: string;
  totalWeek: string;
  bestDay: string;
  allTime?: string;
  languages: { name: string; pct: number }[];
};

type WakaShareDay = {
  range: { date: string; text: string };
  grand_total: { total_seconds: number; text: string };
};

type WakaSharePayload = { data: WakaShareDay[] };

type WakaLangEntry = { name: string; total_seconds?: number; percent?: number };
type WakaLangsPayload =
  | { data?: { languages?: WakaLangEntry[] } | WakaLangEntry[]; languages?: WakaLangEntry[] }
  | WakaLangEntry[];

export function normalizeWakaLanguages(
  payload: WakaLangsPayload,
): WakaLangEntry[] {
  if (Array.isArray(payload)) return payload;
  const direct = pickArray<WakaLangEntry>(payload.data, payload.languages);
  if (direct.length > 0) return direct;
  const nested = payload.data;
  if (nested && !Array.isArray(nested)) {
    return pickArray<WakaLangEntry>(nested.languages);
  }
  return [];
}

export function getWakatimeSharePage(): string {
  return WAKATIME_SHARE_URL.replace(/\.json$/, "");
}

async function fetchWakaLanguages(
  signal?: AbortSignal,
): Promise<{ name: string; pct: number }[] | null> {
  if (!WAKATIME_LANGUAGES_SHARE_URL) return null;
  try {
    const payload = await fetchJson<WakaLangsPayload>(
      WAKATIME_LANGUAGES_SHARE_URL,
      signal,
    );
    const entries = normalizeWakaLanguages(payload);
    if (entries.length === 0) return null;
    const total = entries.reduce((a, e) => a + (e.total_seconds ?? 0), 0);
    const mapped = entries.map((e) => ({
      name: e.name,
      pct:
        typeof e.percent === "number"
          ? Math.round(e.percent)
          : total > 0
            ? Math.round(((e.total_seconds ?? 0) / total) * 100)
            : 0,
    }));
    return mapped
      .filter((l) => l.name && l.pct > 0)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 6);
  } catch {
    return null;
  }
}

export async function fetchWakatimeStats(
  signal?: AbortSignal,
): Promise<WakatimeStats> {
  if (WAKATIME_PROXY_URL) {
    try {
      return await fetchJson<WakatimeStats>(WAKATIME_PROXY_URL, signal);
    } catch {
      // Jika proxy gagal, fallback ke share publik.
    }
  }
  if (!WAKATIME_SHARE_URL) throw new Error("WAKATIME_SHARE_URL kosong");
  const payload = await fetchJson<WakaSharePayload>(
    WAKATIME_SHARE_URL,
    signal,
  );
  const days = payload.data ?? [];
  if (days.length === 0) throw new Error("WakaTime: data kosong");
  const total = days.reduce(
    (acc, d) => acc + (d.grand_total?.total_seconds ?? 0),
    0,
  );
  const best = days.reduce((a, b) =>
    (b.grand_total?.total_seconds ?? 0) > (a.grand_total?.total_seconds ?? 0)
      ? b
      : a,
  );
  const first = days[0]?.range.date ?? "";
  const lastDay = days[days.length - 1]?.range.date ?? "";
  const langs = await fetchWakaLanguages(signal);
  return {
    startDate: formatLongDate(first),
    endDate: formatLongDate(lastDay),
    avgDaily: formatDuration(total / days.length),
    totalWeek: formatDuration(total),
    bestDay: `${formatShortDay(best.range.date)} · ${best.grand_total.text}`,
    languages: langs ?? [],
  };
}
