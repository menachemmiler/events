import mongoose, { Document, Schema, model } from "mongoose";

export interface IYear extends Document {
  eventid: number[];
  year: string;
}

const yearSchema = new Schema<IYear>({
  eventid: { type: [String], ref: "Event" , default: [] },
  year: { type: String, required: true },
});

export default model<IYear>("Year", yearSchema);