import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/token",protectRoute,getStreamToken);

export default router;

// This route file defines the /token endpoint for generating Stream tokens