import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { attackState, DataStatus, IAttack } from "../../types/redux";

const initialState: attackState = {
  error: null,
  status: DataStatus.IDLE,
  data: null,
};

export const getAttacks = createAsyncThunk(
  "analysis/deadliest-attack-types",
  async (search: string, thunkApi) => {
    try {
      const res = await fetch(
        `http://localhost:1313/api/${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization")!,
          },
        }
      );
      // console.log({ res });
      if (res.status != 200) {
        return thunkApi.rejectWithValue(
          "Can't find the attack-types, please try again"
        );
      }
      const data = await res.json();
      // console.log({ data });
      return thunkApi.fulfillWithValue(data);
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        `Can't find the attack-types, please try again ${err.message}`
      );
    }
  }
);

const attackSlice = createSlice({
  name: "attack",
  initialState,
  reducers: {
    updateAttack: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<attackState>) => {
    builder
      .addCase(getAttacks.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.data = null;
      })
      .addCase(getAttacks.fulfilled, (state, action) => {
        // console.log({ action });
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.data = action.payload as unknown as IAttack;
        // console.log(state.user);
      })
      .addCase(getAttacks.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.data = null;
      });
  },
});

export const { updateAttack } = attackSlice.actions;

export default attackSlice;
