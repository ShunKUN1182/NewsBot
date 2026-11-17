import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenAI } from "@google/genai";
import type { NewsItem } from "../news/fetchNews.js";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("NO,APIKEY");
}

const ai = new GoogleGenAI({
    apiKey: apiKey,
});

type NewsData = {
    technology: NewsItem[];
    economy: NewsItem[];
    domestic: NewsItem[];
};

type SelectedNews = {
    title: string;
    link: string;
    publishedAt: string;
    reason: string;
};

type SelectedNewsSet = {
    technology: SelectedNews[];
    economy: SelectedNews[];
    domestic: SelectedNews[];
};

export async function selectNews(newsObject: NewsData) {
    const inputNews = {
        technology: newsObject.technology.map(({ title, link, publishedAt }) => ({
            title,
            link,
            publishedAt,
        })),
        economy: newsObject.economy.map(({ title, link, publishedAt }) => ({
            title,
            link,
            publishedAt,
        })),
        domestic: newsObject.domestic.map(({ title, link, publishedAt }) => ({
            title,
            link,
            publishedAt,
        })),
    };
    const prompt = `
あなたは毎朝配信するニュースを選定するアシスタントです。

以下のニュース一覧から、各ジャンルごとに最もおすすめの記事を1件選んでください。
どうしても選びきれず複数件読むべきだと判断した場合は3件までなら選んでも構いません。
ただし、極力1件で選ぶようには努力してください。どうしてもの場合のみ複数件を選択してください。

【選定ジャンル】
- technology：技術ニュース
- economy：AI・IT業界を含む経済ニュース
- domestic：社会・国内ニュース

【選定基準】
- 新しいニュースを優先する
- 社会的・技術的な影響が大きいものを優先する
- 重要度や話題性を考慮する
- 同じような内容の記事は避ける
- 該当する重要なニュースがない場合は無理に選ばない
- Webに関するトピックをユーザーは知りたがっている
- 必ずニュース一覧に存在する記事だけを選ぶ
- title、link、publishedAtはニュース一覧の値を一切変更せず、そのまま返す

【選定理由】
各記事について、なぜ選んだのかを短い日本語で説明してください。

【返し方】
以下のようなJSON形式で返してください。
{
  "technology": [
    {
      "title": "記事タイトル",
      "link": "https://example.com",
      "publishedAt": "2026-11-17",
      "reason": "Web開発に関わる重要な技術発表だからです。"
    }
  ],
  "economy": [],
  "domestic": [
    {
      "title": "記事タイトル",
      "link": "https://example.com",
      "publishedAt": "2026-11-17",
      "reason": "社会的な影響が大きいニュースだからです。"
    }
  ]
}
【ニュース一覧】
${JSON.stringify(inputNews)}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    const selectedNews: SelectedNewsSet = JSON.parse(response.text ?? "");
    const originalNews = [...inputNews.technology, ...inputNews.economy, ...inputNews.domestic];

    const verifiedNews = {
        technology: selectedNews.technology.filter((item) =>
            inputNews.technology.some((original) => original.link === item.link),
        ),
        economy: selectedNews.economy.filter((item) =>
            inputNews.economy.some((original) => original.link === item.link),
        ),
        domestic: selectedNews.domestic.filter((item) =>
            inputNews.domestic.some((original) => original.link === item.link),
        ),
    };
    return verifiedNews;
}
