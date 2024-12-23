import responseDTO from "../DTO/response";
import event from "../models/event";
import { toTitleCase } from "../utils/all";

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

export const highestCasualtyRegionsService = async (query: {
  region?: string;
  country?: string;
  city?: string;
}): Promise<responseDTO> => {
  try {
    let { city, region, country } = query;
    let avgCasualty;
    if (region) {
      region = toTitleCase(region);
      console.log(region);
      // מחזיר את ממוצע הנפגעים לאירוע באיזור ספציפי
      avgCasualty = await event.aggregate([
        { $match: { region_txt: region } },
        {
          $group: {
            _id: "$region_txt",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
          },
        },
        { $sort: { avg: -1 } },
      ]);
    } else if (country) {
      country = toTitleCase(country);
      avgCasualty = await event.aggregate([
        { $match: { country_txt: country } },
        {
          $group: {
            _id: "$country_txt",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
          },
        },
      ]);
    } else if (city) {
      city = toTitleCase(city);
      avgCasualty = await event.aggregate([
        { $match: { city: city } },
        {
          $group: {
            _id: "$city",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
          },
        },
      ]);
    } else {
      // מחזיר את ממוצע הנפגעים לאירוע בכל איזור מסודר מהגבוה לנמוך
      avgCasualty = await event.aggregate([
        {
          $group: {
            _id: "$region_txt",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
          },
        },
        { $sort: { avg: -1 } },
      ]);
    }

    const toReturen = [];

    for (let i = 0; i < avgCasualty.length; i++) {
      const regionName = avgCasualty[i]._id;
      const coordinates = await getCoordinates(regionName);

      if (coordinates) {
        avgCasualty[i].coordinates = coordinates;
        toReturen.push(avgCasualty[i]);
      }
    }

    return {
      description: "מחזיר את ממוצע הנפגעים לאירוע בכל איזור מסודר מהגבוה לנמוך",
      data: toReturen,
    };
  } catch (err: any) {
    console.log("Error in avgCasualty : ", err.message);
    return { description: "Error", data: err.message };
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

export const getCoordinates = async (
  regionName: string
): Promise<{
  latitude: number;
  longitude: number;
} | null> => {
  const apiKey = "5879788fbb5a497fb68ed497960ff150";
  const url = `http://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    regionName
  )}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.total_results > 0) {
        const result = data.results[0];
        const latitude = result.geometry.lat;
        const longitude = result.geometry.lng;
        return { latitude, longitude };
      } else {
        console.log(168);
        console.log(`No results found for ${regionName}`);
        return null;
      }
    } else {
      console.error(`Error fetching data: ${response.status}`);
      return null;
    }
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
};



