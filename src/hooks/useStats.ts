import useSWR from "swr";
import {
  GITHUB_CONTRIBS_URL,
  buildContribGrid,
  fetchGitHubContribs,
  fetchGitHubSummary,
  fetchMonkeytypeStats,
  fetchUmamiStats,
  fetchWakatimeStats,
  type MonkeytypeStats,
  type UmamiStats,
  type WakatimeStats,
} from "../lib/stats";

export type GitHubSummary = {
  publicRepos: number;
  followers: number;
  following: number;
};

export function useGitHubSummary() {
  return useSWR<GitHubSummary>("github/summary", () => fetchGitHubSummary());
}

export function useGitHubContribGrid() {
  return useSWR(
    GITHUB_CONTRIBS_URL ? "github/contribs" : null,
    async () => buildContribGrid(await fetchGitHubContribs()),
  );
}

export function useWakatimeStats() {
  return useSWR<WakatimeStats>("wakatime/stats", () =>
    fetchWakatimeStats(),
  );
}

export function useMonkeytypeStats() {
  return useSWR<MonkeytypeStats>("monkeytype/stats", () =>
    fetchMonkeytypeStats(),
  );
}

export function useUmamiStats() {
  return useSWR<UmamiStats>("umami/stats", () => fetchUmamiStats());
}
