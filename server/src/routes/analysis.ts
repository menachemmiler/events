import { Request, Response } from "express";
import { initDatabase } from "../services/sid";
import { deadliestAttackTypesService } from "../services/analysis";




export const deadliestAttackTypes = async (req: Request, res: Response) => {
  try {
    const deadliestAttack = await deadliestAttackTypesService();
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
