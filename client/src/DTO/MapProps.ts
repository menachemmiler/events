import { Position } from "./position";

export type MapProps = {
  centerPosition: [number, number];
  initialZoom: number;
  positions: Position[];
};