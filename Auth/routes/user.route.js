import {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUser, getUsers } from "../controller/user.controller.js";
const router = Router();

router.get("/getuser/:id",getUser)
router.post("/getusers",getUsers)



export default router;