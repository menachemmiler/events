import responseDTO from "../DTO/response";
import event from "../models/event";

//תיאור: מחזיר סוגי התקפות מדורגים לפי מספר הנפגעים הכולל.
export const deadliestAttackTypesService = async (): Promise<responseDTO> => {
  try {
    // מחזיר סוגי התקפות מדורגים לפי מספר הנפגעים הכולל גם הרוגים וגם פצועים.
    const deadliestAttack = await event.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          count: { $sum: { $add: ["$nkill", "$nwound"] } },
        },
      },
      { $sort: { count: -1 } },
    ]);
    return {
      description:
        "מחזיר סוגי התקפות מדורגים לפי מספר הנפגעים הכולל גם הרוגים וגם פצועים.",
      data: deadliestAttack,
    };
  } catch (err: any) {
    console.log("Error in deadliestAttackTypesService : ", err.message);
    return err.message;
  }
};




export const highestCasualtyRegionsService = async (
  region?: string
): Promise<responseDTO> => {
  try {
    let avgCasualty;
    if (region) {
      // מחזיר את ממוצע הנפגעים לאירוע באיזור ספיציפי
      avgCasualty = await event.aggregate([
        { $match: { region_txt: region } },
        {
          $group: {
            _id: "$region_txt",
            count: { $avg: { $add: ["$nkill", "$nwound"] } },
            longitude: { $first: "$longitude" },
            latitude: { $first: "$latitude" },
          },
        },
        { $sort: { count: -1 } },
      ]);
    } else {
      // מחזיר את ממוצע הנפגעים לאירוע בכל איזור מסודר מהגבוה לנמוך
      avgCasualty = await event.aggregate([
        {
          $group: {
            _id: "$region_txt",
            svg: { $avg: { $add: ["$nkill", "$nwound"] } },
            longitude: { $first: "$longitude" },
            latitude: { $first: "$latitude" },
          },
        },
        { $sort: { count: -1 } },
      ]);
    }
    return {
      description: "מחזיר את ממוצע הנפגעים לאירוע בכל איזור מסודר מהגבוה לנמוך",
      data: avgCasualty,
    };
  } catch (err: any) {
    console.log("Error in avgCasualty : ", err.message);
    return err.message;
  }
};
