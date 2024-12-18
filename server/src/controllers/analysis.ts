import { Router } from "express";
import { deadliestAttackTypes } from "../routes/analysis";

const router = Router();

router.get("/deadliest-attack-types", deadliestAttackTypes);

export default router;
