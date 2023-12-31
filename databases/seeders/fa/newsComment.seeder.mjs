import NewsComment from "../../../app/models/newsComment.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";
function translateToEnglish(farsiText) {
    const translationMap = {
        "نگاهی به این پیشرفت‌ها نشان می‌دهد که آینده‌ی تکنولوژی وابسته به هوش مصنوعی است.":
            "A look at these advancements shows that the future of technology is reliant on artificial intelligence.",
        "مطلب بسیار جامع و کاملی بود، منتظر مقالات بعدی شما هستم.":
            "The article was very comprehensive; I am looking forward to your next articles.",
        // ... other comments
        فرهاد: "Farhad",
        سارا: "Sara",
        رضا: "Reza",
        تارا: "Tara",
        علی: "Ali",
        مریم: "Maryam",
        میرزایی: "Mirzai",
        کریمی: "Karimi",
        شاهین: "Shahin",
        نوری: "Nouri",
        رضایی: "Rezaei",
        موسوی: "Mousavi",
        // Add more translations as needed
    };

    return translationMap[farsiText] || farsiText;
}

export const seedNewsCommentsFA = async () => {
    const commentsData = [
        {
            comment:
                "نگاهی به این پیشرفت‌ها نشان می‌دهد که آینده‌ی تکنولوژی وابسته به هوش مصنوعی است.",
            likeNumber: 15,
            userFirstName: "فرهاد",
            userLastName: "میرزایی",
            userEmail: "farhad.mirzai@example.com",
            userIp: "192.168.1.6",
            status: true,
        },
        {
            comment: "مطلب بسیار جامع و کاملی بود، منتظر مقالات بعدی شما هستم.",
            likeNumber: 20,
            userFirstName: "سارا",
            userLastName: "کریمی",
            userEmail: "sara.karimi@example.com",
            userIp: "192.168.1.7",
            status: true,
        },
        {
            comment:
                "با اینکه بلاک چین یک مفهوم نسبتاً جدید است، اما تأثیر آن در صنعت مالی غیرقابل انکار است.",
            likeNumber: 30,
            userFirstName: "رضا",
            userLastName: "شاهین",
            userEmail: "reza.shahin@example.com",
            userIp: "192.168.1.8",
            status: true,
        },
        {
            comment:
                "مقاله‌ای دقیق و مختصر در مورد فناوری‌های مدرن، خصوصاً ارزهای دیجیتال.",
            likeNumber: 8,
            userFirstName: "تارا",
            userLastName: "نوری",
            userEmail: "tara.nouri@example.com",
            userIp: "192.168.1.9",
            status: true,
        },
        {
            comment:
                "روباتیک و هوش مصنوعی مرزهای جدیدی را در علم و فناوری باز کرده‌اند.",
            likeNumber: 12,
            userFirstName: "علی",
            userLastName: "رضایی",
            userEmail: "ali.rezaei@example.com",
            userIp: "192.168.1.10",
            status: true,
        },
        {
            comment:
                "یادگیری ماشین و کاربردهای آن در صنایع مختلف یکی از مهم‌ترین مباحث فعلی است.",
            likeNumber: 18,
            userFirstName: "مریم",
            userLastName: "موسوی",
            userEmail: "maryam.mousavi@example.com",
            userIp: "192.168.1.11",
            status: true,
        },
        // Add more comments as needed
    ].map((comment) => ({
        fa: {
            comment: comment.comment,
            userFirstName: comment.userFirstName,
            userLastName: comment.userLastName,
        },
        en: {
            comment: translateToEnglish(comment.comment),
            userFirstName: translateToEnglish(comment.userFirstName),
            userLastName: translateToEnglish(comment.userLastName),
        },
        likeNumber: comment.likeNumber,
        userEmail: comment.userEmail,
        userIp: comment.userIp,
        status: comment.status,
    }));

    let createdComments;
    try {
        await NewsComment.deleteMany({});
        createdComments = await NewsComment.insertMany(commentsData);
        // createdComments = await insertDocumentsDynamically(
        //     NewsComment,
        //     commentsData
        // );
        console.log("news comment seeded successfully");
    } catch (error) {
        console.error("news comment error", error);
    }

    return createdComments;
};
