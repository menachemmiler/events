import e from "express";
import mongoose, { Document, Schema, model } from "mongoose";

export interface ICountry extends Document {
  country_txt: string;
  latitude: number;
  longitude: number;
}

export interface IRegion extends Document {
  region_txt: string;
  latitude: number;
  longitude: number;
}

export interface ILocation extends Document {
  country: ICountry[];
  region: IRegion[];
}

const countrySchema = new Schema<ICountry>({
  country_txt: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const regionSchema = new Schema<IRegion>({
  region_txt: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export const country = model<ICountry>("Country", countrySchema);
export const region = model<IRegion>("Region", regionSchema);
