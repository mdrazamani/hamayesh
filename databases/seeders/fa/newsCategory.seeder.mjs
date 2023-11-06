import NewsCategory from "../../../app/models/newsCategory.model.mjs";

export const seedNewsCategoriesFA = async () => {
    // Define the initial primary categories
    const parentCategories = [
        // ...existing parent categories...
        {
            title: "هوش مصنوعی",
            description: `
                <p>آخرین <strong>پیشرفت‌ها</strong> و <em>نوآوری‌ها</em> در عرصه <mark>هوش مصنوعی</mark>، از یادگیری عمیق تا پردازش زبان طبیعی.</p>
                <ul>
                    <li>یادگیری ماشین</li>
                    <li>روباتیک</li>
                    <li>پردازش تصویر و بینایی ماشین</li>
                </ul>
                <p>مطالعه بیشتر در مورد تاثیرات هوش مصنوعی بر جامعه و اقتصاد <a href='#'>اینجا</a>.</p>
            `,
            slug: "artificial-intelligence",
            image: "آدرس-تصویر-هوش-مصنوعی",
            level: 1,
        },
        {
            title: "بلاک چین",
            description: `
                <h2>بلاک چین و انقلاب دیجیتال</h2>
                <p>کشف <strong>آخرین تکنولوژی‌ها</strong> و <em>راهکارهای</em> مرتبط با <mark>بلاک چین</mark> و ارزهای رمزپایه.</p>
                <ol>
                    <li>امنیت بلاک چین</li>
                    <li>توسعه قراردادهای هوشمند</li>
                    <li>نوآوری‌های ارز دیجیتال</li>
                </ol>
                <p>بررسی کاربردهای بلاک چین در صنایع مختلف <a href='#'>در اینجا</a>.</p>
            `,
            slug: "blockchain",
            image: "آدرس-تصویر-بلاک-چین",
            level: 1,
        },
        // Add more primary categories if needed
    ];

    let createdCategories;

    try {
        await NewsCategory.deleteMany({});
        // Insert the primary categories into the database and retrieve them with generated IDs
        const createdParentCategories = await NewsCategory.insertMany(
            parentCategories
        );
        createdCategories = createdParentCategories;
        // Extract the IDs of the primary categories
        const parentIds = createdParentCategories.map(
            (category) => category._id
        );

        // Define the subcategories based on the primary categories
        const childCategories = [
            {
                title: "روباتیک",
                description: `
                    <h3>روباتیک و آینده تکنولوژی</h3>
                    <p>با <strong>جدیدترین دستاوردها</strong> در زمینه <em>روباتیک</em> آشنا شوید:</p>
                    <ul>
                        <li>روبات‌های خدماتی</li>
                        <li>سیستم‌های خودران</li>
                        <li>روبات‌های صنعتی پیشرفته</li>
                    </ul>
                    <p>مقالات و تحلیل‌های عمیق در <a href='#'>بلاگ ما</a> مطالعه کنید.</p>
                `,
                slug: "robotics",
                parent: parentIds[0], // Link to "Artificial Intelligence"
                image: "آدرس-تصویر-روباتیک",
                level: 2,
            },
            {
                title: "یادگیری ماشین",
                description: `
                    <h3>یادگیری ماشین و تحول دیجیتال</h3>
                    <p>کشف <strong>نوآوری‌ها</strong> و <em>پژوهش‌های اخیر</em> در <mark>یادگیری ماشین</mark> از طریق:</p>
                    <ol>
                        <li>الگوریتم‌های پیشرفته</li>
                        <li>کاربرد در صنایع مختلف</li>
                        <li>تحولات اخیر در داده کاوی</li>
                    </ol>
                    <p>برای اطلاعات بیشتر، به <a href='#'>صفحه تخصصی ما</a> مراجعه کنید.</p>
                `,
                slug: "machine-learning",
                parent: parentIds[0], // Link to "Artificial Intelligence"
                image: "آدرس-تصویر-یادگیری-ماشین",
                level: 2,
            },
            {
                title: "امنیت بلاک چین",
                description: `
                    <h3>امنیت در عصر بلاک چین</h3>
                    <p>آموزش <strong>مفاهیم امنیتی</strong> و <em>بهترین شیوه‌ها</em> برای حفاظت از دارایی‌های دیجیتال:</p>
                    <ul>
                        <li>تکنیک‌های رمزنگاری</li>
                        <li>امنیت قراردادهای هوشمند</li>
                        <li>راهکارهای مقابله با کلاهبرداری</li>
                    </ul>
                    <p>بیشتر بدانید و با ما در <a href='#'>وبینارهای امنیتی</a> شرکت کنید.</p>
                `,
                slug: "blockchain-security",
                parent: parentIds[1], // Link to "Blockchain"
                image: "آدرس-تصویر-امنیت-بلاک-چین",
                level: 2,
            },
            {
                title: "ارزهای دیجیتال",
                description: `
                    <h3>ارزهای دیجیتال و اقتصاد نوین</h3>
                    <p>جدیدترین تحلیل‌های بازار <strong>ارزهای دیجیتال</strong> و <em>راهبردهای سرمایه‌گذاری</em>:</p>
                    <ol>
                        <li>نوسانات بازار</li>
                        <li>انواع ارزهای رمزپایه</li>
                        <li>آینده سرمایه‌گذاری دیجیتال</li>
                    </ol>
                    <p>تازه‌ترین خبرها و تحلیل‌ها را در <a href='#'>بخش اخبار ما</a> دنبال کنید.</p>
                `,
                slug: "cryptocurrency",
                parent: parentIds[1], // Link to "Blockchain"
                image: "آدرس-تصویر-ارزهای-دیجیتال",
                level: 2,
            },
            // Add more subcategories as needed
        ];

        // Insert the subcategories into the database
        const createdCategories2 = await NewsCategory.insertMany(
            childCategories
        );

        createdCategories.push(...createdCategories2);

        console.log("news category seeded successfully");
    } catch (error) {
        console.error("news category error", error);
        // Handle the error appropriately according to your application's needs
    }
    return createdCategories;
};

// This function can be executed in your database seeding script or process.
