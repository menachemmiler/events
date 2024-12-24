import event, { IEvent } from "../models/event";
import { country, region } from "../models/location";

export const initDatabase = async () => {
  try {
    let mylist: IEvent[] = require("../../data/globalterrorismdb_0718dist.json");
    const insertAll = await event.insertMany(mylist);
    //to delete evry attack that heve the attacktype Unknown
    await event.deleteMany({ attacktype1_txt: "Unknown" });
    const allCountryLoactions = require("../../data/countrysLocation.json");
    const allRegionLoactions = require("../../data/regionLocation.json");
    const insertAllLocation = await country.insertMany(allCountryLoactions);
    const insertAllRegionLocation = await region.insertMany(allRegionLoactions);
    return {insertAll, insertAllLocation, insertAllRegionLocation};
  } catch (err: any) {
    console.log("Error in sid data: ", err.message);
    return err.message;
  }
};
