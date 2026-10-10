import { formatDuration, toIsoDay } from "./format";
import { fetchJson } from "./http";

export const GITHUB_USER = "KiRaRyuuKi";
export const GITHUB_API_URL = "https://api.github.com/users/KiRaRyuuKi";

export const GITHUB_CONTRIBS_URL =
  "https://github-contributions-api.jogruber.de/v4/KiRaRyuuKi?y=last";

export type ContribDay = { date: string; count: number };

export type ContribGrid = {
  columns: number[][];
  months: number[];
};

export const CONTRIB_WEEKS = 53;
export const CONTRIB_LEVELS = 5;

export function getContribLevel(count: number, max: number): number {
  if (count <= 0) return 0;
  return Math.min(
    CONTRIB_LEVELS - 1,
    Math.ceil((count / Math.max(1, max)) * (CONTRIB_LEVELS - 1)),
  );
}

export function getContribMonthLabel(
  months: number[],
  monthNames: string[],
  index: number,
): string {
  if (index === 0) return "";
  const current = months[index];
  const prev = months[index - 1];
  if (current === prev || current === undefined) return "";
  return monthNames[current] ?? "";
}

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

export function buildContribGrid(days: ContribDay[]): ContribGrid {
  const byDate = new Map(days.map((d) => [d.date, d.count]));
  const max = Math.max(1, ...days.map((d) => d.count));
  const sorted = [...days].sort((a, b) => (a.date < b.date ? -1 : 1));
  const lastDate = sorted[sorted.length - 1]?.date;
  if (!lastDate) return { columns: [], months: [] };
  const last = new Date(`${lastDate}T00:00:00`);
  const end = new Date(last);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const start = new Date(end);
  start.setDate(end.getDate() - 370);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const columns: number[][] = [];
  const months: number[] = [];
  for (let c = 0; c < CONTRIB_WEEKS; c++) {
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
      week.push(getContribLevel(byDate.get(toIsoDay(dt)) ?? 0, max));
    }
    columns.push(week);
  }
  return { columns, months };
}

export async function fetchGitHubSummary(
  signal?: AbortSignal,
): Promise<{ publicRepos: number; followers: number; following: number }> {
  const data = await fetchJson<{
    public_repos?: number;
    followers?: number;
    following?: number;
  }>(GITHUB_API_URL, signal);
  return {
    publicRepos: Number(data.public_repos ?? 0),
    followers: Number(data.followers ?? 0),
    following: Number(data.following ?? 0),
  };
}

export { formatDuration as formatGitHubDuration };
