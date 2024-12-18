import attacktype from "../models/attacktype";
import event from "../models/event";
import gname from "../models/gname";
import region from "../models/region";
import year from "../models/year";

// export const initDatabase = async () => {
//   try {
//     //get the list from ../data/mylist
//     const mylist = require("../../data/globalterrorismdb_0718dist.json");
//     // console.log({ mylist });
//     const insertAll = await event.insertMany(mylist);
//     //Now insert into collections of regions\years\attack type\organizationsForeign key
//     const Allattacktype = await attacktype.find();
//     const Allregion = await region.find();
//     const Allyear = await year.find();
//     const Allgname = await gname.find();
//     for (let i = 0; i < mylist.length; i++) {
//       if (mylist[i].attacktype1_txt) {
//         Allattacktype[mylist[i].attacktype1_txt].eventid.push(mylist[i].eventid);
//       }
//       if (mylist[i].region_txt) {
//         Allregion[mylist[i].region_txt].eventid.push(mylist[i].eventid);
//       }
//       if (mylist[i].year) {
//         Allyear[mylist[i].year].eventid.push(mylist[i].eventid);
//       }
//       if (mylist[i].gname) {
//         Allgname[mylist[i].gname].eventid.push(mylist[i].eventid);
//       }
//     }

//     // console.log("insertAll: ", insertAll);
//     return insertAll;
//   } catch (err: any) {
//     console.log("Error in sid data: ", err.message);
//     return err.message;
//   }
// };



// export const initDatabase = async () => {
//   try {
//     const mylist = require("../../data/globalterrorismdb_0718dist.json");
//     const insertAll = await event.insertMany(mylist);
//     const Allattacktype = await attacktype.find();
//     const Allregion = await region.find();
//     const Allyear = await year.find();
//     const Allgname = await gname.find();

//     if (!insertAll || insertAll.length === 0) {
//       throw new Error("cont sid!");
//     }

//     for (let i = 0; i < insertAll.length; i++) {
//       const event = insertAll[i];
//       const eventId = event._id;

//       console.log(`Inserting ${mylist.length} events`);
//       console.log(
//         `Updating event ${eventId} for attack type: ${event.attacktype1_txt}`
//       );

//       if (event.attacktype1_txt) {
//         console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
//         await attacktype.updateOne(
//           { attacktype1_txt: event.attacktype1_txt },
//           { $addToSet: { eventid: eventId } }
//         );
//       }

//       if (event.region_txt) {
//         await region.updateOne(
//           { region_txt: event.region_txt },
//           { $addToSet: { eventid: eventId } }
//         );
//       }

//       if (event.year) {
//         await year.updateOne(
//           { year: event.year },
//           { $addToSet: { eventid: eventId } }
//         );
//       }

//       if (event.gname) {
//         await gname.updateOne(
//           { gname: event.gname },
//           { $addToSet: { eventid: eventId } }
//         );
//       }
//     }
//     return insertAll;
//   } catch (err: any) {
//     console.log("Error in sid data: ", err.message);
//     return err.message;
//   }
// };



export const initDatabase = async () => {
    try {
      const mylist = require("../../data/globalterrorismdb_0718dist.json");
      const insertAll = await event.insertMany(mylist);
      return insertAll;
    } catch (err: any) {
      console.log("Error in sid data: ", err.message);
      return err.message;
    }
  };