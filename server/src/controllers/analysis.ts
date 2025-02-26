import { Router } from "express";
import { allRegeion, deadliestAttackTypes, highestCasualtyRegions, incidentTrends } from "../routes/analysis";

const router = Router();

router.get("/deadliest-attack-types", deadliestAttackTypes);


//מקבל מזהה של איזור אופציונאלי (לא חובה ניתן לקבל גם ממוצע של כל האיזורים (אם לא מכניסים מזהה איזור)
router.get("/highest-casualty-regions", highestCasualtyRegions)

//.3 מגמות שנתיות וחודשיות בתדירות התקריות
router.get("/incident-trends", incidentTrends)

//.מביא את רשימת כל האיזורים והנקודות שלהם
router.get("/all-regions", allRegeion)


export default router;
