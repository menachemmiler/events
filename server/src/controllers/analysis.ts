import { Router } from "express";
import { deadliestAttackTypes, highestCasualtyRegions } from "../routes/analysis";

const router = Router();

router.get("/deadliest-attack-types", deadliestAttackTypes);


//מקבל מזהה של איזור אופציונאלי (לא חובה ניתן לקבל גם ממוצע של כל האיזורים (אם לא מכניסים מזהה איזור)
router .get("/highest-casualty-regions/:region?", highestCasualtyRegions)

export default router;
