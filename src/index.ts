import { fetchNews } from "./news/fetchNews.js";
import { selectNews } from "./ai/selectNews.js";
import { sendEmail } from "./email/sendEmail.js";

async function main() {
    const news = await fetchNews();
    const selected = await selectNews(news);
    await sendEmail(selected);
}

export default {
    async scheduled() {
        try {
            await main();
            console.log("ニュース配信処理が完了しました");
        } catch (error) {
            console.error("ニュース配信処理に失敗しました:", error);
            throw error;
        }
    },
};
