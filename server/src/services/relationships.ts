import e from "express";
import responseDTO from "../DTO/response";
import event from "../models/event";

//חמשת ארגוני הטרור הבולטים באזור מסוים
export const topGroupsService = async (quary: {
  region: string;
  top?: boolean;
}): Promise<responseDTO> => {
  try {
    const { region, top } = quary;
    if (!region) throw new Error("region quary is required!");
    let topGroups;
    let description;
    if (top) {
      topGroups = await event.aggregate([
        { $match: { region_txt: region } },
        { $group: { _id: "$gname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);
      description = `חמשת ארגוני הטרור הבולטים באזור ${region}`;
    } else {
      topGroups = await event.aggregate([
        { $match: { region_txt: region } },
        { $group: { _id: "$gname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
      description = `כל ארגוני הטרור באזור ${region} מסודרים לפי מסוכנות`;
    }

    return {
      description,
      data: topGroups,
    };
  } catch (err: any) {
    return err.message;
  }
};

// אפשרויות סינון:
// i. בחירת שנה - הצגת הארגונים לפי מספר התקריות המשויכות לה בסדר יורד ממספר
// התקריות הכי גדול להכי קטן
// ii. בחירת ארגון מרשימה - הצגת התקריות לפני שנים
export const groupByYearService = async (quary: {
  gname?: string;
  year?: string;
}): Promise<responseDTO> => {
  try {
    const { gname, year } = quary;
    if (!gname && !year) {
      //to returen list of all  oranizations + list of all years that in the database
      const allGnames = await event.aggregate([
        { $group: { _id: "$gname" } },
        { $sort: { _id: 1 } },
      ]);
      const allYears = await event.aggregate([
        { $group: { _id: "$iyear" } },
        { $sort: { _id: 1 } },
      ]);
      return {
        data: {
          allGnames,
          allYears,
        },
      };
    }
    let groupBy;
    let description;

    if (gname) {
      groupBy = await event.aggregate([
        { $match: { gname: gname } },
        { $group: { _id: { year: "$iyear" }, count: { $sum: 1 } } },
        { $sort: { "_id.year": 1 } },
      ]);
      description = `התקריות של ארגון ${gname} לפי שנה`;
    } else if (year) {
      groupBy = await event.aggregate([
        { $match: { iyear: parseInt(year) } },
        { $group: { _id: { gname: "$gname" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
      description = `התקריות בשנה ${year} לפי ארגון`;
    }
    return {
      description,
      data: groupBy,
    };
  } catch (err: any) {
    return err.message;
  }
};

export const deadliestRegionsService = async (quary: {
  gname: string;
}): Promise<responseDTO> => {
  try {
    const { gname } = quary;

    if (!gname) throw new Error("!gname");


    const allCurrGnameAttacks = await event.aggregate([
      { $match: { gname: gname } },
      { $group: { _id: "$region_txt", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    console.log("before= ", { allCurrGnameAttacks });

    const arrToReturen = [];

    for (let i = 0; i < allCurrGnameAttacks.length; i++) {
      let curr = allCurrGnameAttacks[i];
      //find top in this area
      let mostInCurrentArea = await event.find({ region_txt: curr._id });
      if (!mostInCurrentArea || mostInCurrentArea.length == 0)
        throw new Error("!mostInCurrentArea || mostInCurrentArea.length == 0");
      mostInCurrentArea = mostInCurrentArea.sort(
        (a, b) => b.nkill + b.nwound - (a.nkill + a.nwound)
      );
      mostInCurrentArea = mostInCurrentArea.filter(
        (a) => a.gname !== "Unknown"
      );
      if (mostInCurrentArea[0].gname == gname)
        arrToReturen.push(allCurrGnameAttacks[i]);
      console.log(
        `in=${mostInCurrentArea[0].region_txt}, by${mostInCurrentArea[0].gname}= `,
        mostInCurrentArea[0].nkill + mostInCurrentArea[0].nwound
      );
    }
    console.log("after= ", { arrToReturen });

    return {
      description: `כל האזורים שבהם ארגון ${gname} ביצע את המתקפה הקטלנית ביותר לאותו איזור`,
      data: arrToReturen,
    };
  } catch (err: any) {
    return err.message;
  }
};
