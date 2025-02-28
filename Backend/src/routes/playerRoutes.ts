import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  getPlayers,
} from "../controllers/playerController";

const router = Router();

router.get("/", authenticateJWT, getPlayers);

export default router;
