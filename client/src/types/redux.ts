export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface attackState {
  error: string | null;
  status: DataStatus;
  data: null | IAttack;
}

export interface IAttack {
  description: string;
  data: any[];
}
