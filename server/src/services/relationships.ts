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
