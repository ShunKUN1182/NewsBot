import { fetchNews } from "./news/fetchNews.js";
import { selectNews } from "./ai/selectNews.js";
import { sendEmail } from "./email/sendEmail.js";

async function main() {
    try {
        const news = await fetchNews();
        const selected = await selectNews(news);
        await sendEmail(selected);
    } catch (error) {
        console.error("取得失敗", error);
    }
}

main();
