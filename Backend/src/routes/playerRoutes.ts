import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import {
  getPlayers,
  setPlayerAsDraft,
} from "../controllers/playerController";

const router = Router();

router.get("/", authenticateJWT, getPlayers);
router.put("/draft/:playerId", authenticateJWT, setPlayerAsDraft);

export default router;
