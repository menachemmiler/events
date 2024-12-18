import event from "../models/event";

export const initDatabase = async () => {
  try {
    //get the list from ../data/mylist
    const mylist = require("../../data/globalterrorismdb_0718dist.json");
    // console.log({ mylist });
    const insertAll = await event.insertMany(mylist);
    // console.log("insertAll: ", insertAll);
    return insertAll;
  } catch (err: any) {
    console.log("Error in sid data: ", err.message);
    return err.message;
  }
};
