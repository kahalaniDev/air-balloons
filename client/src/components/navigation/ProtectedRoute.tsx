import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";

type Props = {};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.account.isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
