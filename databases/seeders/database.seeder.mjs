import mongoose from "mongoose";
import dbconnection from "../../config/db.mjs";
import { Language } from "../../config/index.mjs";

import { seedStates } from "./state.seeder.mjs";
import { seedCity } from "./city.seeder.mjs";
import { seedUsers } from "./user.seeder.mjs";
import { seedRoles } from "./role.seeder.mjs";
import { seedSupporters } from "./supporter.seeder.mjs";
import { seedOrganizers } from "./organizer.seeder.mjs";
import { seedQuestions } from "./question.seeder.mjs";
import { seedHamayeshDetail } from "./hamayeshDetail.seeder.mjs";
import { seedAxie } from "./axie.seeder.mjs";
import { seedSecretariats } from "./secretariats.seeder.mjs";
import { seedSpeakers } from "./speakers.seeder.mjs";
import { seedNews } from "./news.seeder.mjs";
import { seedDailyVisit } from "./dailyVisit.seeder.mjs";
import { seedArticleCategory } from "./articleCategory.seeder.mjs";
import { seedArticles } from "./article.seeder.mjs";

import { seedNewsFA } from "./fa/news.seeder.mjs";
import { seedUsersFA } from "./fa/user.seeder.mjs";
import { seedSecretariatsFA } from "./fa/secretariats.seeder.mjs";
import { seedSpeakersFA } from "./fa/speakers.seeder.mjs";
import { seedOrganizersFA } from "./fa/organizer.seeder.mjs";
import { seedSupportersFA } from "./fa/supporter.seeder.mjs";
import { seedQuestionsFA } from "./fa/question.seeder.mjs";
import { seedAxieFA } from "./fa/axie.seeder.mjs";
import { seedHamayeshDetailFA } from "./fa/hamayeshDetail.seeder.mjs";
import { seedArticleCategoryFA } from "./fa/articleCategory.seeder.mjs";
import { seedArticlesFA } from "./fa/article.seeder.mjs";
import { seedGalleries } from "./gallery.seeder.mjs";
import { seedSlidersFA } from "./fa/slider.seeder.mjs";

const seedDatabase = async () => {
    try {
        dbconnection();

        await seedStates();
        await seedCity();
        await seedRoles();
        await seedDailyVisit();
        await seedGalleries();

        if (Language == "fa") {
            await seedUsersFA();
            await seedSecretariatsFA();
            await seedSpeakersFA();
            await seedOrganizersFA();
            await seedSupportersFA();
            await seedQuestionsFA();
            await seedAxieFA();
            await seedNewsFA();
            await seedHamayeshDetailFA();
            await seedArticleCategoryFA();
            await seedArticlesFA();
            await seedSlidersFA();
        } else {
            await seedUsers();
            await seedSecretariats();
            await seedSpeakers();
            await seedOrganizers();
            await seedSupporters();
            await seedQuestions();
            await seedAxie();
            await seedNews();
            await seedHamayeshDetail();
            await seedArticleCategory();
            await seedArticles();
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
