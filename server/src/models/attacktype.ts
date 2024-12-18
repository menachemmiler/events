import mongoose, { Document, Schema, model } from "mongoose";

export interface IAttacktype extends Document {
  eventid: number[];
  attacktype1_txt: string;
}

const attacktypeSchema = new Schema<IAttacktype>({
  eventid: { type: [String], ref: "Event", default: [] },
  attacktype1_txt: { type: String, required: true },
});

export default model<IAttacktype>("Attacktype", attacktypeSchema);
