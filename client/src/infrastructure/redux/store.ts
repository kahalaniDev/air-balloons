import {
  configureStore,
  PreloadedState,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import accountReducer from "../../features/account/slices/accountSlice";
import balloonsReducer from "../../features/balloons/slices/balloonsSlice";
import { isLoggedIn } from "../../features/account/slices/accountSlice";

const reducer = { account: accountReducer, balloons: balloonsReducer };

type StoreInitialState = StateFromReducersMapObject<typeof reducer>;

export const createStore = (
  preloadedState?: PreloadedState<Partial<StoreInitialState>>
) =>
  configureStore({
    preloadedState,
    reducer: reducer,
  });

const store = createStore();
store.dispatch(isLoggedIn());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
