import { Request, Response } from "express";
import * as XLSX from 'xlsx';
import * as path from "path";
import * as fs from "fs";

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" }) as unknown as Promise<void>;
    }

    const filePath = path.join(__dirname, "../assets", "teams.xlsx");

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: 'File not found' });
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const players = XLSX.utils.sheet_to_json(sheet);
    res.status(200).json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
