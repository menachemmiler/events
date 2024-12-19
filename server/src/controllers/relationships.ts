import { Router } from "express";
import { topGroups } from "../routes/relationships";

const router = Router();




router.get("/top-groups", topGroups)


export default router;
