import { useDispatch } from "react-redux";
import type { AppDispatch } from "../infrastructure/redux/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
