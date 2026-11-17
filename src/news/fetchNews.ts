import Parser from "rss-parser";

const parser = new Parser();

export type NewsItem = {
    title: string;
    link: string;
    publishedAt: string;
    summary: string;
};

const RSS_URLS = {
    technology: "https://news.yahoo.co.jp/rss/topics/it.xml",
    economy: "https://news.yahoo.co.jp/rss/topics/business.xml",
    domestic: "https://news.yahoo.co.jp/rss/topics/domestic.xml",
};

export async function fetchRss(url: string): Promise<NewsItem[]> {
    const feed = await parser.parseURL(url);
    return feed.items
        .filter((item) => item.title && item.link)
        .map((item) => ({
            title: item.title!,
            link: item.link!,
            publishedAt: item.pubDate ?? "",
            summary: item.contentSnippet ?? "",
        }));
}

export async function fetchNews() {
    const [technology, economy, domestic]: [NewsItem[], NewsItem[], NewsItem[]] = await Promise.all(
        [fetchRss(RSS_URLS.technology), fetchRss(RSS_URLS.economy), fetchRss(RSS_URLS.domestic)],
    );
    return { technology, economy, domestic };
}
