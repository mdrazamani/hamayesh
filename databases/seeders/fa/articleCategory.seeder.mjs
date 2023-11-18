import ArticleCategory from "../../../app/models/articleCategory.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedArticleCategoryFA = async () => {
    const articleCategoriesData = [
        {
            title: "تکنولوژی",
            description: "مقالات درباره آخرین روندهای تکنولوژی.",
            referees: [], // اگر داوران مورد نیاز هستند، برخی کاربران را تعیین کنید
        },
        {
            title: "سلامتی",
            description: "تفسیرهایی در مورد موضوعات مختلف سلامتی.",
            referees: [],
        },
        {
            title: "علم",
            description: "کشف‌ها و تحقیقات علمی را بررسی می‌کند.",
            referees: [],
        },
        {
            title: "کسب و کار",
            description: "اخبار و تجزیه و تحلیل جهان کسب و کار.",
            referees: [],
        },
        {
            title: "سفر",
            description: "کشف بهترین مقاصد سفر جهان را تجربه کنید.",
            referees: [],
        },
        {
            title: "غذا",
            description: "لذت‌های آشپزی و نکات آشپزی.",
            referees: [],
        },
        {
            title: "ورزش",
            description: "آخرین اخبار و وقایع ورزشی جهان را بروز نگه دارید.",
            referees: [],
        },
        {
            title: "هنر",
            description: "تجسم در اشکال هنری مختلف را بررسی می‌کند.",
            referees: [],
        },
        {
            title: "سرگرمی",
            description: "اخبار و بررسی‌ها از صنعت سرگرمی.",
            referees: [],
        },
        {
            title: "آموزش",
            description: "بازتابی در تمارین آموزشی و روش‌های یادگیری.",
            referees: [],
        },
        // ادامه دهید با دیتاهای بیشتر به همین الگو
    ];

    try {
        await ArticleCategory.deleteMany({});
        // await ArticleCategory.insertMany(articleCategoriesData);
        await insertDocumentsDynamically(
            ArticleCategory,
            articleCategoriesData
        );
        console.log("دسته‌های مقاله با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن دسته‌های مقاله:", error);
    }
};
