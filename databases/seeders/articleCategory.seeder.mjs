import ArticleCategory from "../../app/models/articleCategory.model.mjs";
const translationMap = {
    // Title Translations
    Technology: "فناوری",
    Health: "سلامت",
    Science: "علم",
    Business: "تجارت",
    Travel: "سفر",
    Food: "غذا",
    Sports: "ورزش",
    Art: "هنر",
    Entertainment: "سرگرمی",
    Education: "آموزش",
    // ... add more translations as needed

    // Description Translations
    "Articles about the latest technology trends.":
        "مقالاتی درباره آخرین روندهای فناوری.",
    "Insights on various health topics.":
        "بینش‌هایی در مورد موضوعات مختلف سلامت.",
    "Exploring scientific discoveries and research.":
        "کاوش در کشفیات و تحقیقات علمی.",
    // ... add more translations as needed
};

function translateToFarsi(englishText) {
    return translationMap[englishText] || englishText;
}
export const seedArticleCategory = async () => {
    const articleCategoriesData = [
        {
            title: "Technology",
            description: "Articles about the latest technology trends.",
            referees: [], // if referees are necessary, assign some users
        },
        {
            title: "Health",
            description: "Insights on various health topics.",
            referees: [],
        },
        {
            title: "Science",
            description: "Exploring scientific discoveries and research.",
            referees: [],
        },
        {
            title: "Business",
            description: "News and analysis of the business world.",
            referees: [],
        },
        {
            title: "Travel",
            description: "Discovering the world's best travel destinations.",
            referees: [],
        },
        {
            title: "Food",
            description: "Culinary delights and cooking tips.",
            referees: [],
        },
        {
            title: "Sports",
            description: "Updates on the world of sports and athletics.",
            referees: [],
        },
        {
            title: "Art",
            description: "Exploring various forms of artistic expression.",
            referees: [],
        },
        {
            title: "Entertainment",
            description: "News and reviews from the entertainment industry.",
            referees: [],
        },
        {
            title: "Education",
            description:
                "Insights into educational practices and learning methods.",
            referees: [],
        },
        // ادامه دهید با دیتاهای بیشتر به همین الگو
    ].map((category) => ({
        fa: {
            title: translateToFarsi(category.title),
            description: translateToFarsi(category.description),
        },
        en: {
            title: category.title,
            description: category.description,
        },
        referees: category.referees,
    }));

    try {
        await ArticleCategory.deleteMany({});
        await ArticleCategory.insertMany(articleCategoriesData);
        console.log("ArticleCategories seeded successfully!");
    } catch (error) {
        console.error("Error seeding ArticleCategories:", error);
    }
};
