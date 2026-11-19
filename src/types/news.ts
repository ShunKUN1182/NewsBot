export type NewsItem = {
    title: string;
    link: string;
    publishedAt: string;
    summary: string;
};

export type NewsData = {
    technology: NewsItem[];
    economy: NewsItem[];
    domestic: NewsItem[];
};

export type SelectedNews = {
    title: string;
    link: string;
    publishedAt: string;
    reason: string;
};

export type SelectedNewsSet = {
    technology: SelectedNews[];
    economy: SelectedNews[];
    domestic: SelectedNews[];
};
