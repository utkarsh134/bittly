import { Router } from "express";
import {
  handlegenerateGenerateNewShortURL,
  handleGetAnalytics,
} from "../controllers/url.controller.js";

const router = Router();

router.post("/", handlegenerateGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
