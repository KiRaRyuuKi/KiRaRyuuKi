import { formatClock } from "./format";
import { fetchJson } from "./http";

export const MONKEYTYPE_USER = "KiRaRyuuKi";
export const MONKEYTYPE_PROFILE_URL = "https://monkeytype.com/profile/KiRaRyuuKi";

export const MONKEYTYPE_PROXY_URL = "";

export type MonkeytypePb = { label: string; wpm: number; acc: number };

export type LevelProgress = {
  level: number;
  current: number;
  max: number;
  display: string;
};

export type MonkeytypeStats = {
  name: string;
  profileUrl: string;
  joined: string;
  streak: string;
  level: number;
  levelProgress: LevelProgress;
  levelXp: string;
  testsStarted: number;
  testsCompleted: number;
  totalTime: string;
  leaderboard15: { rank: string; top: string };
  leaderboard60: { rank: string; top: string };
  pbTime: MonkeytypePb[];
  pbWords: MonkeytypePb[];
};

type MonkeytypePbRaw = { wpm: number; acc: number };
type MonkeytypeProfile = {
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
    time?: Record<string, MonkeytypePbRaw[]>;
    words?: Record<string, MonkeytypePbRaw[]>;
  };
  allTimeLbs?: {
    time?: Record<string, { rank?: number; count?: number }>;
  };
};

export function getMonkeytypeLevel(totalXp: number): LevelProgress {
  const level = Math.floor((Math.sqrt(392 * totalXp + 22801) - 53) / 98);
  const max = 49 * (level - 1) + 100;
  const totalToReach = (49 * level * level + 53 * level - 102) / 2;
  const current = Math.max(0, Math.round(totalXp - totalToReach));
  return { level, current, max, display: `${current}/${max}` };
}

function getLeaderboard(
  lbs: MonkeytypeProfile["allTimeLbs"],
  mode: string,
): { rank: string; top: string } {
  const entry = lbs?.time?.[mode];
  if (typeof entry?.rank === "number") {
    return {
      rank: `#${entry.rank}`,
      top:
        typeof entry.count === "number" && entry.count > 0
          ? `top ${Math.ceil((entry.rank / entry.count) * 100)}%`
          : "top —",
    };
  }
  return { rank: "—", top: "top —" };
}

function getPersonalBests(
  group: Record<string, MonkeytypePbRaw[]> | undefined,
  keys: string[],
  tag: string,
): MonkeytypePb[] {
  const out: MonkeytypePb[] = [];
  for (const k of keys) {
    const best = group?.[k]?.[0];
    if (best && typeof best.wpm === "number")
      out.push({
        label: `${k} ${tag}`,
        wpm: Math.round(best.wpm),
        acc: Math.round(best.acc ?? 0),
      });
  }
  return out;
}

function fromMonkeytypeProfile(p: MonkeytypeProfile): MonkeytypeStats {
  const xp = p.xp ?? 0;
  const levelProgress = getMonkeytypeLevel(xp);
  const name = p.name ?? MONKEYTYPE_USER;
  const joined = p.addedAt
    ? `Joined ${new Date(p.addedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
    : "—";
  return {
    name,
    profileUrl: MONKEYTYPE_PROFILE_URL,
    joined,
    streak: `${p.streak ?? 0}-day streak`,
    level: levelProgress.level,
    levelProgress,
    levelXp: levelProgress.display,
    testsStarted: p.typingStats?.startedTests ?? 0,
    testsCompleted: p.typingStats?.completedTests ?? 0,
    totalTime: formatClock(p.typingStats?.timeTyping ?? 0),
    leaderboard15: getLeaderboard(p.allTimeLbs, "15"),
    leaderboard60: getLeaderboard(p.allTimeLbs, "60"),
    pbTime: getPersonalBests(p.personalBests?.time, ["15", "30", "60", "120"], "time"),
    pbWords: getPersonalBests(
      p.personalBests?.words,
      ["10", "25", "50", "100"],
      "words",
    ),
  };
}

export async function fetchMonkeytypeStats(
  signal?: AbortSignal,
): Promise<MonkeytypeStats> {
  if (MONKEYTYPE_PROXY_URL) {
    return fetchJson<MonkeytypeStats>(MONKEYTYPE_PROXY_URL, signal);
  }
  const payload = await fetchJson<{ data?: MonkeytypeProfile }>(
    `https://api.monkeytype.com/users/${MONKEYTYPE_USER}/profile`,
    signal,
  );
  if (!payload.data) throw new Error("Monkeytype: profil kosong");
  return fromMonkeytypeProfile(payload.data);
}
