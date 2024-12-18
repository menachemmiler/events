import { Request, Response } from "express";
import { initDatabase } from "../services/sid";
import { deadliestAttackTypesService, highestCasualtyRegionsService } from "../services/analysis";




export const deadliestAttackTypes = async (req: Request, res: Response) => {
  try {
    const deadliestAttack = await deadliestAttackTypesService();
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const highestCasualtyRegions = async (req: Request<{region:string}>, res: Response) => {
  try {
    const deadliestAttack = await highestCasualtyRegionsService(req.params.region);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
