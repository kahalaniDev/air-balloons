import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../infrastructure/redux/store";
import { logout } from "../../account/slices/accountSlice";
import { IAppError } from "../../../models/interfaces";
import { IBalloons, IBalloon, IPosition } from "../models/interfaces";
import { BalloonColor, BalloonType } from "../models/enums";
import { DEFAULT_BALLOON_ALTITUDE } from "../utils/constants";
import Position from "../models/Position";
import Balloon from "../models/Balloon";
import { errorHandler } from "../../../infrastructure/redux/errorHandler";

export const initialState: {
  list: IBalloons | [];
  loading: boolean;
  balloon?: IBalloon;
  activeBalloonPos?: IPosition;
  error?: IAppError;
} = {
  list: [],
  loading: false,
  balloon: undefined,
  error: undefined,
  activeBalloonPos: undefined,
};

export const getBalloons = createAsyncThunk<
  IBalloons,
  () => Promise<IBalloons>,
  { rejectValue: IAppError }
>("balloons/getBalloons", async (getBallonsRequest, { rejectWithValue }) => {
  try {
    return await getBallonsRequest();
  } catch (err) {
    return rejectWithValue(errorHandler(err));
  }
});

export const getBalloon = createAsyncThunk<
  IBalloon,
  {
    balloonId: string;
    getBallonRequest: (balloonId: string) => Promise<IBalloon>;
  },
  { rejectValue: IAppError }
>(
  "balloons/getBalloon",
  async ({ balloonId, getBallonRequest }, { rejectWithValue }) => {
    try {
      return await getBallonRequest(balloonId);
    } catch (err) {
      return rejectWithValue(errorHandler(err));
    }
  }
);

export const addBalloon = createAsyncThunk<
  IBalloon,
  {
    balloon: IBalloon;
    addBallonRequest: (balloon: IBalloon) => Promise<IBalloon>;
  },
  { rejectValue: IAppError }
>(
  "balloons/addBalloon",
  async ({ balloon, addBallonRequest }, { rejectWithValue }) => {
    try {
      return await addBallonRequest({
        id: balloon.id,
        name: balloon.name,
        description: balloon.description,
        type: balloon.type,
        color: balloon.color,
        position: {
          altitude: balloon.position!.altitude,
          latitude: balloon.position!.latitude,
          longitude: balloon.position!.longitude,
        },
      });
      // return await addBallonRequest(balloon);
    } catch (err) {
      return rejectWithValue(errorHandler(err));
    }
  }
);

const balloonsSlice = createSlice({
  name: "balloons",
  initialState,
  reducers: {
    resetError(state) {
      state.error = initialState.error;
    },
    resetBalloon(state) {
      state.balloon = undefined;
      state.activeBalloonPos = undefined;
    },
    updateActiveBalloonPos(state, action: PayloadAction<IPosition>) {
      state.activeBalloonPos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBalloons.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBalloons.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });
    builder.addCase(getBalloons.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getBalloon.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBalloon.fulfilled, (state, action) => {
      state.balloon = action.payload;
      state.loading = false;
    });
    builder.addCase(getBalloon.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(addBalloon.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addBalloon.fulfilled, (state, action) => {
      state.balloon = action.payload;
      state.loading = false;
    });
    builder.addCase(addBalloon.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { resetError, resetBalloon, updateActiveBalloonPos } =
  balloonsSlice.actions;
export default balloonsSlice.reducer;
