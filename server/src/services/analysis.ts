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
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
            longitude: { $first: "$longitude" },
            latitude: { $first: "$latitude" },
          },
        },
        { $sort: { avg: -1 } },
      ]);
    } else {
      // מחזיר את ממוצע הנפגעים לאירוע בכל איזור מסודר מהגבוה לנמוך
      avgCasualty = await event.aggregate([
        {
          $group: {
            _id: "$region_txt",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
            longitude: { $first: "$longitude" },
            latitude: { $first: "$latitude" },
          },
        },
        { $sort: { avg: -1 } },
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

// פרמטרים: שנה, חודש )אופציונלי(.
//   תיאור: מחזיר תדירות תקריות לפי שנים וחודשים )כמות התקריות הייחודיות במהלך התקופה הנבחנת.
//   לדוגמא: אם בוחנים 12 חודשים עבור שנה מסוימת, צריך לעשות aggregation לפי החודשים וכמות
//   תקריות ייחודיות באותם חודשים(
export const incidentTrendsService = async (quary: {
  year?: string;
  month?: string;
  from?: string;
  to?: string;
}): Promise<responseDTO> => {
  try {
    let incidentTrends;
    let description;
    const { from, month, to, year } = quary;
    if (year && month) {
      incidentTrends = await event.aggregate([
        { $match: { iyear: parseInt(year), imonth: parseInt(month) } },
        {
          $group: {
            _id: { year: "$iyear", month: "$imonth" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);
      description = `כמות הפיגועים ב-שנה ${year} בחודש ${month}`;
    } else if (year) {
      //to get sum events in evry month in the year
      incidentTrends = await event.aggregate([
        { $match: { iyear: parseInt(year) } },
        {
          $group: {
            _id: { year: "$iyear", month: "$imonth" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);
      description = `כמות הפיגועים בכל חודש ב-שנה ${year} `;
    } else if (from && to) {
      //to get sum events in evry year between 'from' to 'to'
      incidentTrends = await event.aggregate([
        {
          $match: {
            iyear: { $gte: parseInt(from), $lte: parseInt(to) },
          },
        },
        {
          $group: {
            _id: { year: "$iyear" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1 } },
      ]);
      description = `כמות הפיגועים בין השנים ${from}-${to}`;
    } else {
      return {
        description: "חובה להכניס פרמטר 'שנה' או 'שנה וחודש'.",
        data: [],
      };
    }
    return {
      description,
      data: incidentTrends,
    };
  } catch (err: any) {
    console.log("Error in incidentTrendsService: ", err.message);
    return {
      description:
        "מחזיר תדירות תקריות לפי שנים וחודשים )כמות התקריות הייחודיות במהלך התקופה הנבחנת.",
      data: `Erorr: ${err.message}`,
    };
  }
};



