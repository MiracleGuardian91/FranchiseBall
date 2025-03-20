import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { savePriorityLists } from "../controllers/priorityListController";

const router = Router();

router.post("/", authenticateJWT, savePriorityLists);

export default router;
