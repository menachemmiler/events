import event from "../models/event";



export const deadliestAttackTypesService = async () => {
  try {
    // מחזיר סוגי התקפות מדורגים לפי מספר הנפגעים הכולל גם הרוגים וגם פצועים.
    const deadliestAttack = await event.aggregate([
      { $group: { _id: "$attacktype1_txt", count: { $sum: [ "$nkill", "$nwound" ]} } },
      { $sort: { count: -1 } },
    ]);
    return deadliestAttack;
    
  } catch (err: any) {
    console.log("Error in deadliestAttackTypesService : ", err.message);
    return err.message;
  }
};
