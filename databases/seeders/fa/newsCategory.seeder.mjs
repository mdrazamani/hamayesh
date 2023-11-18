import NewsCategory from "../../../app/models/newsCategory.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedNewsCategoriesFA = async () => {
    // Define the initial primary categories
    const parentCategories = [
        // ...existing parent categories...
        {
            title: "هوش مصنوعی",
            description: `
            &lt;p&gt;آخرین &lt;strong&gt;پیشرفت‌ها&lt;/strong&gt; و &lt;em&gt;نوآوری‌ها&lt;/em&gt; در عرصه &lt;mark&gt;هوش مصنوعی&lt;/mark&gt;، از یادگیری عمیق تا پردازش زبان طبیعی.&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;یادگیری ماشین&lt;/li&gt;
                &lt;li&gt;روباتیک&lt;/li&gt;
                &lt;li&gt;پردازش تصویر و بینایی ماشین&lt;/li&gt;
            &lt;/ul&gt;
            &lt;p&gt;مطالعه بیشتر در مورد تاثیرات هوش مصنوعی بر جامعه و اقتصاد &lt;a href='#'&gt;اینجا&lt;/a&gt;.&lt;/p&gt;            
            `,
            slug: "artificial-intelligence",
            image: "آدرس-تصویر-هوش-مصنوعی",
            level: 1,
        },
        {
            title: "بلاک چین",
            description: `
            &lt;h2&gt;بلاک چین و انقلاب دیجیتال&lt;/h2&gt;
            &lt;p&gt;کشف &lt;strong&gt;آخرین تکنولوژی‌ها&lt;/strong&gt; و &lt;em&gt;راهکارهای&lt;/em&gt; مرتبط با &lt;mark&gt;بلاک چین&lt;/mark&gt; و ارزهای رمزپایه.&lt;/p&gt;
            &lt;ol&gt;
                &lt;li&gt;امنیت بلاک چین&lt;/li&gt;
                &lt;li&gt;توسعه قراردادهای هوشمند&lt;/li&gt;
                &lt;li&gt;نوآوری‌های ارز دیجیتال&lt;/li&gt;
            &lt;/ol&gt;
            &lt;p&gt;بررسی کاربردهای بلاک چین در صنایع مختلف &lt;a href='#'&gt;در اینجا&lt;/a&gt;.&lt;/p&gt;            
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
        // const createdParentCategories = await NewsCategory.insertMany(
        //     parentCategories
        // );

        const createdParentCategories = await insertDocumentsDynamically(
            NewsCategory,
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
                &lt;h3&gt;روباتیک و آینده تکنولوژی&lt;/h3&gt;
                &lt;p&gt;با &lt;strong&gt;جدیدترین دستاوردها&lt;/strong&gt; در زمینه &lt;em&gt;روباتیک&lt;/em&gt; آشنا شوید:&lt;/p&gt;
                &lt;ul&gt;
                    &lt;li&gt;روبات‌های خدماتی&lt;/li&gt;
                    &lt;li&gt;سیستم‌های خودران&lt;/li&gt;
                    &lt;li&gt;روبات‌های صنعتی پیشرفته&lt;/li&gt;
                &lt;/ul&gt;
                &lt;p&gt;مقالات و تحلیل‌های عمیق در &lt;a href='#'&gt;بلاگ ما&lt;/a&gt; مطالعه کنید.&lt;/p&gt;                
                `,
                slug: "robotics",
                parent: parentIds[0], // Link to "Artificial Intelligence"
                image: "آدرس-تصویر-روباتیک",
                level: 2,
            },
            {
                title: "یادگیری ماشین",
                description: `
                &lt;h3&gt;یادگیری ماشین و تحول دیجیتال&lt;/h3&gt;
                &lt;p&gt;کشف &lt;strong&gt;نوآوری‌ها&lt;/strong&gt; و &lt;em&gt;پژوهش‌های اخیر&lt;/em&gt; در &lt;mark&gt;یادگیری ماشین&lt;/mark&gt; از طریق:&lt;/p&gt;
                &lt;ol&gt;
                    &lt;li&gt;الگوریتم‌های پیشرفته&lt;/li&gt;
                    &lt;li&gt;کاربرد در صنایع مختلف&lt;/li&gt;
                    &lt;li&gt;تحولات اخیر در داده کاوی&lt;/li&gt;
                &lt;/ol&gt;
                &lt;p&gt;برای اطلاعات بیشتر، به &lt;a href='#'&gt;صفحه تخصصی ما&lt;/a&gt; مراجعه کنید.&lt;/p&gt;                
                `,
                slug: "machine-learning",
                parent: parentIds[0], // Link to "Artificial Intelligence"
                image: "آدرس-تصویر-یادگیری-ماشین",
                level: 2,
            },
            {
                title: "امنیت بلاک چین",
                description: `
                &lt;h3&gt;امنیت در عصر بلاک چین&lt;/h3&gt;
                &lt;p&gt;آموزش &lt;strong&gt;مفاهیم امنیتی&lt;/strong&gt; و &lt;em&gt;بهترین شیوه‌ها&lt;/em&gt; برای حفاظت از دارایی‌های دیجیتال:&lt;/p&gt;
                &lt;ul&gt;
                    &lt;li&gt;تکنیک‌های رمزنگاری&lt;/li&gt;
                    &lt;li&gt;امنیت قراردادهای هوشمند&lt;/li&gt;
                    &lt;li&gt;راهکارهای مقابله با کلاهبرداری&lt;/li&gt;
                &lt;/ul&gt;
                &lt;p&gt;بیشتر بدانید و با ما در &lt;a href='#'&gt;وبینارهای امنیتی&lt;/a&gt; شرکت کنید.&lt;/p&gt;                
                `,
                slug: "blockchain-security",
                parent: parentIds[1], // Link to "Blockchain"
                image: "آدرس-تصویر-امنیت-بلاک-چین",
                level: 2,
            },
            {
                title: "ارزهای دیجیتال",
                description: `
                &lt;h3&gt;ارزهای دیجیتال و اقتصاد نوین&lt;/h3&gt;
                &lt;p&gt;جدیدترین تحلیل‌های بازار &lt;strong&gt;ارزهای دیجیتال&lt;/strong&gt; و &lt;em&gt;راهبردهای سرمایه‌گذاری&lt;/em&gt;:&lt;/p&gt;
                &lt;ol&gt;
                    &lt;li&gt;نوسانات بازار&lt;/li&gt;
                    &lt;li&gt;انواع ارزهای رمزپایه&lt;/li&gt;
                    &lt;li&gt;آینده سرمایه‌گذاری دیجیتال&lt;/li&gt;
                &lt;/ol&gt;
                &lt;p&gt;تازه‌ترین خبرها و تحلیل‌ها را در &lt;a href='#'&gt;بخش اخبار ما&lt;/a&gt; دنبال کنید.&lt;/p&gt;                
                `,
                slug: "cryptocurrency",
                parent: parentIds[1], // Link to "Blockchain"
                image: "آدرس-تصویر-ارزهای-دیجیتال",
                level: 2,
            },
            // Add more subcategories as needed
        ];

        // Insert the subcategories into the database
        // const createdCategories2 = await NewsCategory.insertMany(
        //     childCategories
        // );

        const createdCategories2 = await insertDocumentsDynamically(
            NewsCategory,
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
