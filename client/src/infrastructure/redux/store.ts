import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import accountReducer, {
  initialState as accountInitialState,
} from "../../features/account/slices/accountSlice";
import balloonsReducer, {
  initialState as balloonInitialState,
} from "../../features/balloons/slices/balloonsSlice";
import { isLoggedIn } from "../../features/account/slices/accountSlice";

type InitialState = {
  account?: typeof accountInitialState;
  balloon?: typeof balloonInitialState;
};

export const createStore = (preloadedState?: PreloadedState<InitialState>) =>
  configureStore({
    preloadedState,
    reducer: { account: accountReducer, balloons: balloonsReducer },
  });

const store = createStore();
store.dispatch(isLoggedIn());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
