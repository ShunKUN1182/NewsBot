import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { Resend } from "resend";
import type { SelectedNewsSet } from "../types/news.js";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    throw new Error("apikey未設定");
}

const resend = new Resend(apiKey);

export async function sendEmail(newsObject: SelectedNewsSet) {
    const date = new Date();
    const todayDate = `${date.getMonth() + 1}月${date.getDate()}日`;
    const sections = [
        { title: "01 | Technology", news: newsObject.technology },
        { title: "02 | Economy", news: newsObject.economy },
        { title: "03 | Domestic", news: newsObject.domestic },
    ];

    const { data, error } = await resend.emails.send({
        from: `${process.env.FROM_EMAIL}`,
        to: [`${process.env.TO_EMAIL}`],
        subject: `${todayDate}のおすすめニュース`,
        html: `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2937;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
                            <tr>
                                <td style="background-color:#1e3a5f;padding:28px 24px;border-radius:12px 12px 0 0;color:#ffffff;">
                                    <h1 style="margin:0;font-size:24px;line-height:1.4;">本日のおすすめニュース</h1>
                                    <p style="margin:8px 0 0;font-size:14px;color:#dbeafe;">${todayDate}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color:#ffffff;padding:8px 24px 24px;border-radius:0 0 12px 12px;">
                                    ${sections
                                        .map(
                                            ({ title, news }) => `
                                                <div style="padding-top:20px;">
                                                    <h2 style="margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #e5e7eb;font-size:17px;color:#1e3a5f;">${title}</h2>
                                                    ${
                                                        news.length > 0
                                                            ? news
                                                                  .map(
                                                                      (item) => `
                                                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px;background-color:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;">
                                                                            <tr>
                                                                                <td style="padding:16px;">
                                                                                    <h3 style="margin:0 0 8px;font-size:16px;line-height:1.5;">
                                                                                        <a href="${item.link}" style="color:#2563eb;text-decoration:none;">${item.title}</a>
                                                                                    </h3>
                                                                                    <p style="margin:0;font-size:14px;line-height:1.7;color:#4b5563;"><strong style="color:#374151;">おすすめ理由</strong><br>${item.reason}</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    `,
                                                                  )
                                                                  .join("")
                                                            : `<p style="margin:0;padding:14px 16px;background-color:#f8fafc;border-radius:8px;font-size:14px;color:#6b7280;">このトピックは本日おすすめの内容がありませんでした。</p>`
                                                    }
                                                </div>
                                            `,
                                        )
                                        .join("")}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding:16px 8px;font-size:12px;color:#9ca3af;">毎朝お届けするおすすめニュース</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `,
    });
    if (error) {
        console.error("メール送信失敗:", error);
    } else {
        console.log("メール送信成功", data?.id);
    }
}
