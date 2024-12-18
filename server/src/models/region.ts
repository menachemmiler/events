import mongoose, { Document, Schema, model } from "mongoose";

export interface IRegion extends Document {
  eventid: string[];
  region: string;
}

const regionSchema = new Schema<IRegion>({
  eventid: { type: [String], ref: "Event", default: []  },
  region: { type: String, required: true },
});


export default model<IRegion>("Region", regionSchema);