import express from "express";
import userRoutes from "./user.routes.mjs";
import authRoutes from "./auth.routes.mjs";
import otherRoutes from "./other.routes.mjs";
import SupporterRoutes from "./supporter.routes.mjs";
import OrganizerRoutes from "./organizer.routes.mjs";
import QuestionRoutes from "./question.routes.mjs";
import Secretariat from "./secretariat.routes.mjs";
import Speaker from "./speaker.routes.mjs";
import Slider from "./slider.routes.mjs";
import Gallery from "./gallery.routes.mjs";

import HamayeshDetailRoutes from "./hamayeshDetail.routes.mjs";
import AxieRoutes from "./axie.routes.mjs";

import News from "./news.routes.mjs";
import newsCategory from "./newsCategory.routes.mjs";
import NewsComment from "./newsComment.routes.mjs";
import NewsTag from "./newsTag.routes.mjs";

import DailyVisit from "./dailyVisit.routes.mjs";

import ArticleCategory from "./articleCategory.routes.mjs";
import Article from "./article.routes.mjs";

import {
    authenticateJWT,
    authorizeRole,
} from "../app/middlewares/auth.middleware.mjs";

const router = express.Router();

router.use("/", otherRoutes);
router.use("/auth", authRoutes);
router.use("/admin/users", authenticateJWT, userRoutes);

router.use("/supporters", SupporterRoutes);
router.use("/organizers", OrganizerRoutes);
router.use("/questions", QuestionRoutes);
router.use("/secretariats", Secretariat);
router.use("/hamayesh-detail", HamayeshDetailRoutes);
router.use("/axies", AxieRoutes);
router.use("/speakers", Speaker);
router.use("/sliders", Slider);
router.use("/galleries", Gallery);

router.use("/news", News);
router.use("/news-categories", newsCategory);
router.use("/news-comments", NewsComment);
router.use("/news-tags", NewsTag);

router.use("/daily-visits", DailyVisit);

router.use("/article-Categories", ArticleCategory);
router.use("/articles", Article);

export default router;
