import { Request, Response } from "express";
import Player from "../models/Player";

export const getPlayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" }) as unknown as Promise<void>;
    }

    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const setPlayerAsDraft = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" }) as unknown as Promise<void>;
    }

    const playerId = req.params.playerId;

    const player = await Player.findOneAndUpdate(
      {_id: playerId},
      {'isDrafted': true},
      {new: true}
    );

    if (!player) {
      res.status(404).json({ message: "Player not found." });
      return;
    }

    const players = await Player.find();
    res.status(200).json({
      message: 'Player setted as draft successfully!',
      players: players
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
}
