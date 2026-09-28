import { XMLParser } from "fast-xml-parser";

export const NEWS_SOURCES = [
  {
    name: "OpenAI",
    url: "https://openai.com/news/rss.xml",
    host: "openai.com",
  },
  {
    name: "NVIDIA",
    url: "https://developer.nvidia.com/blog/feed/",
    host: "nvidia.com",
  },
  {
    name: "Microsoft",
    url: "https://www.microsoft.com/en-us/research/feed/",
    host: "microsoft.com",
  },
  {
    name: "Google AI",
    url: "https://blog.google/technology/ai/rss/",
    host: "blog.google",
  },
] as const;
export type NewsItem = {
  title: string;
  url: string;
  publisher: string;
  publishedAt: string;
  topic: string;
};
export type NewsFeed = {
  items: NewsItem[];
  checkedAt: string;
  sources: { name: string; ok: boolean }[];
  stale: boolean;
};
let saved: NewsFeed | undefined;
let expires = 0;
let pending: Promise<NewsFeed> | undefined;
const clean = (s: unknown) =>
  String(s && typeof s === "object" && "#text" in s ? s["#text"] : (s ?? ""))
    .replace(/<[^>]*>/g, "")
    .trim();
export function parseNews(
  xml: string,
  source: (typeof NEWS_SOURCES)[number],
): NewsItem[] {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error("Unsupported XML");
  const parsed = new XMLParser({
    ignoreAttributes: false,
    processEntities: true,
  }).parse(xml);
  const rows = parsed?.rss?.channel?.item ?? parsed?.feed?.entry;
  if (!rows) return [];
  return (Array.isArray(rows) ? rows : [rows])
    .flatMap((row): NewsItem[] => {
      try {
        const links = Array.isArray(row.link) ? row.link : [row.link];
        const link =
          links.find(
            (value: string | Record<string, string>) =>
              typeof value === "string" || value?.["@_rel"] === "alternate",
          ) ?? links[0];
        const url = new URL(
          clean(typeof link === "object" ? link?.["@_href"] : link),
        );
        if (
          url.protocol !== "https:" ||
          !(
            url.hostname === source.host ||
            url.hostname.endsWith("." + source.host)
          )
        )
          return [];
        url.hash = "";
        const title = clean(row.title).slice(0, 240);
        const date = new Date(row.pubDate ?? row.published ?? row.updated);
        if (
          !title ||
          !Number.isFinite(date.getTime()) ||
          date.getTime() > Date.now() + 86400000
        )
          return [];
        const text = title + " " + clean(row.description ?? row.summary);
        if (
          (source.name === "Microsoft" || source.name === "Google AI") &&
          !/\b(ai|artificial|machine learning|data|model|language|research|agent|neural)\b/i.test(
            text,
          )
        )
          return [];
        const topic = /agent/i.test(text)
          ? "Agents"
          : /data|analytics/i.test(text)
            ? "Data science"
            : /model|language|gpt/i.test(text)
              ? "Models"
              : "AI engineering";
        return [
          {
            title,
            url: url.toString(),
            publisher: source.name,
            publishedAt: date.toISOString(),
            topic,
          },
        ];
      } catch {
        return [];
      }
    })
    .slice(0, 18);
}
async function refresh(): Promise<NewsFeed> {
  const results = await Promise.allSettled(
    NEWS_SOURCES.map(async (source) => {
      const response = await fetch(source.url, {
        cache: "no-store",
        signal: AbortSignal.timeout(14000),
        headers: {
          "User-Agent": "AchintPortfolio/1.0 (publisher-attributed RSS reader)",
        },
      });
      if (!response.ok) throw new Error("Feed unavailable");
      const text = await response.text();
      if (text.length > 3_000_000) throw new Error("Feed too large");
      const items = parseNews(text, source);
      if (!items.length) throw new Error("No usable entries");
      return items;
    }),
  );
  const sources = results.map((r, i) => ({
    name: NEWS_SOURCES[i].name,
    ok: r.status === "fulfilled",
  }));
  const items = results.flatMap((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : saved?.items.filter((x) => x.publisher === NEWS_SOURCES[i].name) || [],
  );
  const unique = [...new Map(items.map((x) => [x.url, x])).values()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 45);
  const result = {
    items: unique,
    checkedAt: new Date().toISOString(),
    sources,
    stale: sources.some((x) => !x.ok),
  };
  saved = result;
  expires = Date.now() + (result.stale ? 5 * 60_000 : 60 * 60_000);
  return result;
}
export async function getNews(): Promise<NewsFeed> {
  if (saved && Date.now() < expires) return saved;
  if (!pending)
    pending = refresh().finally(() => {
      pending = undefined;
    });
  return pending;
}
