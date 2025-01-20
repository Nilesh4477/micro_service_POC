import {Router} from "express";
import { login, register, user } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, user);
router.get("/",(req,res)=>{
    res.json({messgae:"Welcome to my page"})
})



export default router;