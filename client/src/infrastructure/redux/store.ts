import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../../features/account/slices/accountSlice";
import balloonsReducer from "../../features/balloons/slices/balloonsSlice";
import { isLoggedIn } from "../../features/account/slices/accountSlice";

export const createStore = () =>
  configureStore({
    reducer: { account: accountReducer, balloons: balloonsReducer },
  });

const store = createStore();
store.dispatch(isLoggedIn());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
