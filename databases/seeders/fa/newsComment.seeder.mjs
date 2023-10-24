import NewsComment from "../../../app/models/newsComment.model.mjs";

export const seedNewsCommentsFA = async () => {
    const commentsData = [
        {
            comment: "پیشرفت‌های شگفت‌انگیز در این حوزه!",
            likeNumber: 5,
            userFirstName: "جان",
            userLastName: "دو",
            userEmail: "john.doe@example.com",
            userIp: "192.168.1.2",
            status: true,
        },
        {
            comment: "من محتوای اینجا را دوست دارم!",
            likeNumber: 10,
            userFirstName: "الیس",
            userLastName: "اسمیت",
            userEmail: "alice.smith@example.com",
            userIp: "192.168.1.3",
            status: true,
        },
        {
            comment: "این بسیار مفید است.",
            likeNumber: 3,
            userFirstName: "باب",
            userLastName: "جانسون",
            userEmail: "bob.johnson@example.com",
            userIp: "192.168.1.4",
            status: true,
        },
        {
            comment: "عالی بود. خوب کار کرده‌اید!",
            likeNumber: 7,
            userFirstName: "امیلی",
            userLastName: "دیویس",
            userEmail: "emily.davis@example.com",
            userIp: "192.168.1.5",
            status: true,
        },
        // اضافه کردن نظرات بیشتر به تعداد نیازمندی...
    ];

    let createdComments;
    try {
        await NewsComment.deleteMany({});
        createdComments = await NewsComment.insertMany(commentsData);
        console.log("نظرات اخبار با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن نظرات اخبار:", error);
    }

    return createdComments;
};

// این تابع می‌تواند برای seed کردن چندین نظر به صورت یکجا اجرا شود.
