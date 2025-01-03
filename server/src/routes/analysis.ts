import { Request, Response } from "express";
import { initDatabase } from "../services/sid";
import {
  allRegeionService,
  deadliestAttackTypesService,
  highestCasualtyRegionsService,
  incidentTrendsService,
} from "../services/analysis";

export const deadliestAttackTypes = async (req: Request, res: Response) => {
  try {
    const deadliestAttack = await deadliestAttackTypesService();
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const highestCasualtyRegions = async (
  req: Request<
    any,
    any,
    any,
    { region?: string; country?: string; city?: string }
  >,
  res: Response
) => {
  try {
    // console.log(req.query);
    const deadliestAttack = await highestCasualtyRegionsService(req.query);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const incidentTrends = async (
  req: Request<
    any,
    any,
    any,
    { year?: string; month?: string; from?: string; to?: string }
  >,
  res: Response
) => {
  try {
    // console.log(req.query);
    const deadliestAttack = await incidentTrendsService(req.query);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const allRegeion = async (req: Request, res: Response) => {
  try {
    // console.log(req.query);
    const deadliestAttack = await allRegeionService();
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
