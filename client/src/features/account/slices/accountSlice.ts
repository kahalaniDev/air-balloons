import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAppError } from "../../../models/interfaces";
import { IUserCredentials, IUserData } from "../models/interfaces";
import { errorHandler } from "../../../infrastructure/redux/errorHandler";

export const initialState: {
  isAuth: boolean;
  loading: boolean;
  username: string;
  error?: IAppError;
} = {
  username: "",
  isAuth: false,
  error: undefined,
  loading: false,
};

export const login = createAsyncThunk<
  string,
  {
    userCred: IUserCredentials;
    loginRequest: (userCred: IUserCredentials) => Promise<IUserData>;
  },
  { rejectValue: IAppError }
>("account/login", async ({ userCred, loginRequest }, { rejectWithValue }) => {
  try {
    const data = await loginRequest(userCred);
    localStorage.setItem("user", JSON.stringify(data.token));
    return data.username;
  } catch (err) {
    return rejectWithValue(errorHandler(err));
  }
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { rejectValue: IAppError }
>("account/logout", async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("user");
  } catch (err) {
    return rejectWithValue(errorHandler(err));
  }
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetError(state) {
      state.error = initialState.error;
    },
    isLoggedIn(state) {
      const data = localStorage.getItem("user");
      if (data) {
        const { username } = JSON.parse(data);
        state.isAuth = true;
        state.username = username;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.username = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.username = "";
      state.isAuth = false;
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { resetError, isLoggedIn } = accountSlice.actions;
export default accountSlice.reducer;
