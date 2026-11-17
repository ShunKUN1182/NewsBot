import { fetchNews } from "./news/fetchNews.js";
import { selectNews } from "./ai/selectNews.js";

async function main() {
    try {
        const news = await fetchNews();
        const selected = await selectNews(news);
        console.log(selected);
    } catch (error) {
        console.error("取得失敗", error);
    }
}

main();
