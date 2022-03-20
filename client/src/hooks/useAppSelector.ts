import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../infrastructure/redux/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
