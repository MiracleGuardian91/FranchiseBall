import { Request, Response } from "express";
import Team from "../models/Team";

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" }) as unknown as Promise<void>;
    }

    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};