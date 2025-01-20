import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllPosts, storePost } from "../controller/post.controller.js";
const router = Router();

router.post("/createpost",authMiddleware,storePost)
router.get("/posts",getAllPosts)// here i used micro-service API


export default router;