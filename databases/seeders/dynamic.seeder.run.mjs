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
import { seedSlidersFA } from "./fa/slider.seeder.mjs";
import { seedGalleries } from "./gallery.seeder.mjs";
import { seedPricingDatabase } from "./fa/billing/pricing.seeder.mjs";

const seeders = {
    states: seedStates,
    cities: seedCity,
    users: seedUsersFA,
    roles: seedRoles,
    supporters: seedSupportersFA,
    sliders: seedSlidersFA,
    organizers: seedOrganizersFA,
    questions: seedQuestionsFA,
    galleries: seedGalleries,
    hamayeshDetail: seedHamayeshDetailFA,
    // Language === "fa" ? seedHamayeshDetailFA : seedHamayeshDetail,
    axies: seedAxieFA,
    secretariats: seedSecretariatsFA,
    speakers: seedSpeakersFA,
    news: seedNewsFA,
    dailyVisit: seedDailyVisit,
    articleCategories: seedArticleCategory,
    articles: Language === "fa" ? seedArticlesFA : seedArticles,
    pricing: seedPricingDatabase,
    // افزودن هر seeder دیگری که مورد نیاز است
};

console.log(Language);

const seedSpecificCollection = async (collectionName) => {
    try {
        dbconnection();

        if (seeders[collectionName]) {
            await seeders[collectionName]();
            console.log(`${collectionName} collection seeded successfully!`);
        } else {
            console.log(`No seeder found for ${collectionName}`);
        }
    } catch (error) {
        console.error(`Error seeding ${collectionName} collection:`, error);
    } finally {
        mongoose.connection.close();
    }
};

const collectionName = process.argv[2];

seedSpecificCollection(collectionName);
