import mongoose, { Document, Schema, model } from "mongoose";

export interface IGname extends Document {
  eventid: number[];
  gname: string;
}

const gnameSchema = new Schema<IGname>({
  eventid: { type: [String], ref: "Event" , default: [] },
  gname: { type: String, required: true },
});

export default model<IGname>("Gname", gnameSchema);