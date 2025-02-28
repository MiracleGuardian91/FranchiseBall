import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  getTeams,
} from "../controllers/teamController";

const router = Router();

router.get("/", authenticateJWT, getTeams);

export default router;
