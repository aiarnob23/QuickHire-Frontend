// lib/category-theme.ts

export const categoryTheme: Record<
    string,
    { bg: string; text: string , border:string }
> = {
    Marketing: {
        bg: "bg-chart-5/20",
        text: "text-chart-5",
        border: "border border-chart-5",
    },
    Design: {
        bg: "bg-chart-2/10",
        text: "text-chart-2",
        border: "border border-chart-2",
    },
    Business: {
        bg: "bg-primary/20",
        text: "text-primary",
        border: "border border-primary",
    },
    Technology: {
        bg: "bg-chart-3/20",
        text: "text-chart-3",
        border: "border border-chart-3",
    },
};

export function getCategoryStyles(category: string) {
    return (
        categoryTheme[category] ?? {
            bg: "bg-muted",
            text: "text-muted-foreground",
        }
    );
}