export const GITHUB_USER = "KiRaRyuuKi";

export const GITHUB_GRAPH_URL =
  "https://ghchart.rshah.org/KiRaRyuuKi";

// Heatmap orange (tema sendiri) dari DATA REAL. Sumber JSON ber-CORS
// (Access-Control-Allow-Origin: *), bisa di-fetch langsung dari browser:
//   https://github-contributions-api.jogruber.de/v4/{user}?y=last
// -> { total, contributions: [{ date, count, level }] }
// Isi dengan endpoint milikmu sendiri (worker/proxy) kalau mau tanpa pihak
// ke-3. KOSONGKAN = kartu jatuh ke gambar ghchart langsung (live, tapi hijau).
export const GITHUB_CONTRIBS_URL =
  "https://github-contributions-api.jogruber.de/v4/KiRaRyuuKi?y=last";

export const WAKATIME_SHARE_URL =
  "https://wakatime.com/share/@31bbc57a-0658-47f3-a3b5-8fb13ca037a7/fe0ee069-f6fa-4411-aa1f-0cfb0a7c5eb2.json";

export const WAKATIME_LANGUAGES_SHARE_URL =
  "https://wakatime.com/share/@31bbc57a-0658-47f3-a3b5-8fb13ca037a7/c299a46d-f375-472d-a309-8c164150b00e.json";

export const UMAMI_SHARE_URL = "https://cloud.umami.is/share/Fqn57l2MC2wHTYPC";

export const WAKATIME_PROXY_URL = "";

export const MONKEYTYPE_PROFILE_URL = "https://monkeytype.com/profile/KiRaRyuuKi";

export const MONKEYTYPE_PROXY_URL = "";

export const UMAMI_SITE = "kiraryuuki.github.io";

export type SourceMode = "manual" | "api";

export type StatsSource = {
  mode: SourceMode;
  endpoint: string;
  notes: string;
};

export const STATS_SOURCES: Record<
  "github" | "wakatime" | "monkeytype" | "umami",
  StatsSource
> = {
  github: {
    mode: "api",
    endpoint: "https://api.github.com/users/KiRaRyuuKi",
    notes:
      "Live via REST publik tanpa key (limit 60 req/jam). Angka repo/follower + grafik aktivitas live; bukan angka contoh.",
  },
  wakatime: {
    mode: "api",
    endpoint:
      "https://wakatime.com/share/@31bbc57a-0658-47f3-a3b5-8fb13ca037a7/fe0ee069-f6fa-4411-aa1f-0cfb0a7c5eb2.json",
    notes:
      "Live via embed JSON publik (WAKATIME_SHARE_URL buat angka 7 hari, WAKATIME_LANGUAGES_SHARE_URL buat Top Languages). Tanpa key, tanpa proxy.",
  },
  monkeytype: {
    mode: "api",
    endpoint: "",
    notes:
      "Wajib lewat proxy (MONKEYTYPE_PROXY_URL) — ApeKey tidak boleh di frontend. Proxy hit api.monkeytype.com pakai header Authorization: ApeKey dan mengembalikan bentuk MonkeytypeStats.",
  },
  umami: {
    mode: "api",
    endpoint: "https://cloud.umami.is/share/Fqn57l2MC2wHTYPC",
    notes:
      "Live via Share URL publik (UMAMI_SHARE_URL). Frontend tukar slug -> websiteId+token, lalu hit stats/pageviews dengan header x-umami-share-token. Tanpa key.",
  },
};

export type WakatimeStats = {
  startDate: string;
  endDate: string;
  avgDaily: string;
  totalWeek: string;
  bestDay: string;
  /** Hanya terisi kalau lewat proxy API key. Kosong = share URL tak sediakan. */
  allTime?: string;
  languages: { name: string; pct: number }[];
};
export type MonkeytypePb = { label: string; wpm: number; acc: number };
export type MonkeytypeStats = {
  name: string;
  profileUrl: string;
  joined: string;
  streak: string;
  level: number;
  levelXp: string;
  testsStarted: number;
  testsCompleted: number;
  totalTime: string;
  leaderboard15: { rank: string; top: string };
  leaderboard60: { rank: string; top: string };
  pbTime: MonkeytypePb[];
  pbWords: MonkeytypePb[];
};
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

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal: signal ?? null });
  if (!res.ok) throw new Error(`API: ${res.status}`);
  return (await res.json()) as T;
}

function formatDur(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  if (h <= 0) return `${m} mins`;
  if (m <= 0) return `${h} hrs`;
  return `${h} hrs ${m} mins`;
}

function formatLongDate(isoDate: string): string {
  // "2026-09-29" -> "Sep 29, 2026"
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatShortDay(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

type WakaShareDay = {
  range: { date: string; text: string };
  grand_total: { total_seconds: number; text: string };
};

type WakaSharePayload = { data: WakaShareDay[] };

type WakaLangEntry = { name: string; total_seconds?: number; percent?: number };
// Bentuk payload share Languages bervariasi tergantung chart yang dibuat.
// Tangani 3 varian: { data: { languages: [...] } }, { data: [...] }, { languages: [...] }.
type WakaLangsPayload =
  | { data?: { languages?: WakaLangEntry[] } | WakaLangEntry[]; languages?: WakaLangEntry[] }
  | WakaLangEntry[];

async function fetchWakaLanguages(
  signal?: AbortSignal,
): Promise<{ name: string; pct: number }[] | null> {
  if (!WAKATIME_LANGUAGES_SHARE_URL) return null;
  try {
    const payload = await fetchJson<WakaLangsPayload>(
      WAKATIME_LANGUAGES_SHARE_URL,
      signal,
    );
    let entries: WakaLangEntry[] = [];
    if (Array.isArray(payload)) {
      entries = payload;
    } else if (Array.isArray(payload.data)) {
      entries = payload.data;
    } else if (Array.isArray(payload.languages)) {
      entries = payload.languages;
    } else if (
      payload.data &&
      !Array.isArray(payload.data) &&
      Array.isArray(payload.data.languages)
    ) {
      entries = payload.data.languages;
    }
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

export type ContribDay = { date: string; count: number };

// Ambil hitungan kontribusi harian dari worker (lihat GITHUB_CONTRIBS_URL).
// Gagal = throw, kartu fallback ke gambar ghchart.
export async function fetchGitHubContribs(
  signal?: AbortSignal,
): Promise<ContribDay[]> {
  if (!GITHUB_CONTRIBS_URL) throw new Error("GITHUB_CONTRIBS_URL belum diisi");
  const payload = await fetchJson<
    ContribDay[] | { contributions?: ContribDay[] }
  >(GITHUB_CONTRIBS_URL, signal);
  const days = Array.isArray(payload) ? payload : (payload.contributions ?? []);
  if (days.length === 0) throw new Error("Kontribusi kosong");
  return days;
}

// Susun 53 kolom minggu (Min–Sab) gaya GitHub dari data real.
// Level warna relatif terhadap hari tersibuk (0 = kosong).
export function buildContribGrid(days: ContribDay[]): {
  columns: number[][];
  months: number[];
} {
  const byDate = new Map(days.map((d) => [d.date, d.count]));
  const max = Math.max(1, ...days.map((d) => d.count));
  const lvl = (c: number) =>
    c <= 0 ? 0 : Math.min(4, Math.ceil((c / max) * 4));
  const sorted = [...days].sort((a, b) => (a.date < b.date ? -1 : 1));
  const last = new Date(`${sorted[sorted.length - 1]!.date}T00:00:00`);
  const end = new Date(last);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);
  start.setDate(end.getDate() - 370);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const columns: number[][] = [];
  const months: number[] = [];
  for (let c = 0; c < 53; c++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + c * 7);
    months.push(weekStart.getMonth());
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(weekStart);
      dt.setDate(weekStart.getDate() + d);
      if (dt.getTime() > today.getTime()) {
        week.push(0);
        continue;
      }
      const key = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
      week.push(lvl(byDate.get(key) ?? 0));
    }
    columns.push(week);
  }
  return { columns, months };
}

// GitHub REST publik — live, tanpa key.
export async function fetchGitHubSummary(
  signal?: AbortSignal,
): Promise<{ publicRepos: number; followers: number; following: number }> {
  const data = await fetchJson<{
    public_repos?: number;
    followers?: number;
    following?: number;
  }>(STATS_SOURCES.github.endpoint, signal);
  return {
    publicRepos: Number(data.public_repos ?? 0),
    followers: Number(data.followers ?? 0),
    following: Number(data.following ?? 0),
  };
}

// WakaTime — embed JSON publik (CORS *), tanpa key. Full live, tanpa fallback
// lokal: gagal fetch = throw, kartu tampilkan error. Bentuk respons:
// { data: [{ range: { date, text }, grand_total: { total_seconds, text } }] }
export async function fetchWakatimeStats(
  signal?: AbortSignal,
): Promise<WakatimeStats> {
  // Jalur 1 (opsional): proxy ber-API-key → full live termasuk allTime.
  if (WAKATIME_PROXY_URL) {
    try {
      return await fetchJson<WakatimeStats>(WAKATIME_PROXY_URL, signal);
    } catch {
      // turun ke share URL di bawah
    }
  }
  // Jalur 2: 2 share JSON publik. Gagal = throw, kartu tampilkan error.
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
  const first = days[0]!.range.date;
  const last = days[days.length - 1]!.range.date;
  const langs = await fetchWakaLanguages(signal);
  return {
    startDate: formatLongDate(first),
    endDate: formatLongDate(last),
    avgDaily: formatDur(total / days.length),
    totalWeek: formatDur(total),
    bestDay: `${formatShortDay(best.range.date)} · ${best.grand_total.text}`,
    languages: langs ?? [],
  };
}

// Monkeytype — publik DULU (tanpa key, CORS *), proxy hanya override
// opsional. Endpoint publik: GET /users/{username}/profile mengembalikan
// nama, xp, streak, typingStats, dan personalBests.
const MONKEYTYPE_USER = "KiRaRyuuKi";

type MtPb = { wpm: number; acc: number };
type MtProfile = {
  name?: string;
  addedAt?: number;
  xp?: number;
  streak?: number;
  typingStats?: {
    completedTests?: number;
    startedTests?: number;
    timeTyping?: number;
  };
  personalBests?: {
    time?: Record<string, MtPb[]>;
    words?: Record<string, MtPb[]>;
  };
  allTimeLbs?: {
    time?: Record<string, { rank?: number; count?: number }>;
  };
};

// Rumus level persis dari source Monkeytype
// (frontend/src/ts/utils/levels.ts): level dari total XP.
function mtLevel(totalXp: number): { level: number; cur: number; max: number } {
  const level = Math.floor((Math.sqrt(392 * totalXp + 22801) - 53) / 98);
  const max = 49 * (level - 1) + 100;
  const totalToReach = (49 * level * level + 53 * level - 102) / 2;
  return { level, cur: Math.max(0, Math.round(totalXp - totalToReach)), max };
}

function mtHms(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

function mtRank(
  lbs: MtProfile["allTimeLbs"],
  mode2: string,
): { rank: string; top: string } {
  const e = lbs?.time?.[mode2];
  if (typeof e?.rank === "number") {
    return {
      rank: `#${e.rank}`,
      top:
        typeof e.count === "number" && e.count > 0
          ? `top ${Math.ceil((e.rank / e.count) * 100)}%`
          : "top —",
    };
  }
  return { rank: "—", top: "top —" };
}

function mtPbs(
  group: Record<string, MtPb[]> | undefined,
  keys: string[],
  tag: string,
): MonkeytypePb[] {
  const out: MonkeytypePb[] = [];
  for (const k of keys) {
    const b = group?.[k]?.[0];
    if (b && typeof b.wpm === "number")
      out.push({
        label: `${k} ${tag}`,
        wpm: Math.round(b.wpm),
        acc: Math.round(b.acc ?? 0),
      });
  }
  return out;
}

function mtFromProfile(p: MtProfile): MonkeytypeStats {
  const xp = p.xp ?? 0;
  const { level, cur, max } = mtLevel(xp);
  const name = p.name ?? MONKEYTYPE_USER;
  const joined = p.addedAt
    ? `Joined ${new Date(p.addedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
    : "—";
  return {
    name,
    profileUrl: MONKEYTYPE_PROFILE_URL,
    joined,
    streak: `${p.streak ?? 0}-day streak`,
    level,
    levelXp: `${cur}/${max}`,
    testsStarted: p.typingStats?.startedTests ?? 0,
    testsCompleted: p.typingStats?.completedTests ?? 0,
    totalTime: mtHms(p.typingStats?.timeTyping ?? 0),
    leaderboard15: mtRank(p.allTimeLbs, "15"),
    leaderboard60: mtRank(p.allTimeLbs, "60"),
    pbTime: mtPbs(p.personalBests?.time, ["15", "30", "60", "120"], "time"),
    pbWords: mtPbs(p.personalBests?.words, ["10", "25", "50", "100"], "words"),
  };
}

// Monkeytype — publik dulu (tanpa key), proxy hanya override opsional.
// Tanpa keduanya = throw, kartu tampilkan pesan setup. Tanpa data lokal.
export async function fetchMonkeytypeStats(
  signal?: AbortSignal,
): Promise<MonkeytypeStats> {
  if (MONKEYTYPE_PROXY_URL) {
    return fetchJson<MonkeytypeStats>(MONKEYTYPE_PROXY_URL, signal);
  }
  const payload = await fetchJson<{ data?: MtProfile }>(
    `https://api.monkeytype.com/users/${MONKEYTYPE_USER}/profile`,
    signal,
  );
  if (!payload.data) throw new Error("Monkeytype: profil kosong");
  return mtFromProfile(payload.data);
}

// Umami — share publik tanpa key, 2 langkah:
// 1. GET {base}/share/{slug} -> { websiteId, token }
// 2. GET stats/pageviews pakai header x-umami-share-token + x-umami-share-context
const UMAMI_API_BASE = "https://cloud.umami.is/analytics/us/api";

function umamiSlug(): string {
  try {
    const parts = UMAMI_SHARE_URL.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  } catch {
    return "";
  }
}

type UmamiShare = { websiteId: string; token: string };
type UmamiSummary = {
  pageviews: number;
  visitors: number;
  visits: number;
};
type UmamiSeries = {
  pageviews: { x: string; y: number }[];
  sessions: { x: string; y: number }[];
};

const UMAMI_SERIES_DAYS = 30;

export async function fetchUmamiStats(
  signal?: AbortSignal,
): Promise<UmamiStats> {
  if (!UMAMI_SHARE_URL) throw new Error("UMAMI_SHARE_URL kosong");
  const slug = umamiSlug();
  if (!slug) throw new Error("Umami: slug share tidak valid");
  const share = await fetchJson<UmamiShare>(
    `${UMAMI_API_BASE}/share/${slug}`,
    signal,
  );
  if (!share.websiteId || !share.token)
    throw new Error("Umami: share tidak valid");
  const headers = {
    "x-umami-share-token": share.token,
    "x-umami-share-context": "1",
  };
  const now = Date.now();
  const doGet = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${UMAMI_API_BASE}${path}`, {
      signal: signal ?? null,
      headers,
    });
    if (!res.ok) throw new Error(`Umami: ${res.status}`);
    return (await res.json()) as T;
  };
  const [summary, series, countries, events] = await Promise.all([
    doGet<UmamiSummary>(
      `/websites/${share.websiteId}/stats?startAt=0&endAt=${now}`,
    ),
    doGet<UmamiSeries>(
      `/websites/${share.websiteId}/pageviews?startAt=${now - UMAMI_SERIES_DAYS * 86_400_000}&endAt=${now}&unit=day`,
    ),
    doGet<{ x: string; y: number }[]>(
      `/websites/${share.websiteId}/metrics?startAt=0&endAt=${now}&type=country`,
    ),
    doGet<{ x: string; y: number }[]>(
      `/websites/${share.websiteId}/metrics?startAt=0&endAt=${now}&type=event`,
    ),
  ]);
  const pv = series.pageviews ?? [];
  const ss = series.sessions ?? [];
  const tail = pv.slice(-UMAMI_SERIES_DAYS);
  const dense = tail.length > 14;
  const days = tail.map((p, i) => {
    const iso = typeof p.x === "string" ? p.x.slice(0, 10) : "";
    const d = new Date(p.x);
    const sess = ss[ss.length - tail.length + i]?.y ?? 0;
    if (Number.isNaN(d.getTime())) {
      return { label: `#${i + 1}`, iso, sessions: sess, pageViews: p.y };
    }
    const prevItem = tail[i - 1];
    const prev = prevItem ? new Date(prevItem.x) : null;
    const startsMonth =
      prev === null ||
      Number.isNaN(prev.getTime()) ||
      prev.getMonth() !== d.getMonth() ||
      prev.getFullYear() !== d.getFullYear();
    const showMonth = dense ? startsMonth : true;
    const month = d.toLocaleDateString("id-ID", { month: "short" });
    const label = showMonth ? `${month} ${d.getDate()}` : String(d.getDate());
    return { label, iso, sessions: sess, pageViews: p.y };
  });
  return {
    site: UMAMI_SITE,
    pageViews: Number(summary.pageviews ?? 0),
    visitors: Number(summary.visitors ?? 0),
    visits: Number(summary.visits ?? 0),
    countries: Array.isArray(countries) ? countries.length : 0,
    events: Array.isArray(events)
      ? events.reduce((a, e) => a + (e.y ?? 0), 0)
      : 0,
    days,
  };
}
