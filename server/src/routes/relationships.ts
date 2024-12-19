import { Request, Response } from "express";
import { topGroupsService } from "../services/relationships";
import { config } from "dotenv";

export const topGroups = async (
  req: Request<any, any, any, { region: string; top?: boolean }>,
  res: Response
) => {
  try {
    // console.log(req.query);
    const deadliestAttack = await topGroupsService(req.query);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
