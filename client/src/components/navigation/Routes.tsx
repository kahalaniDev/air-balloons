import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import LoginPage from "../../features/account/pages/LoginPage";
import HomePage from "../../features/balloons/pages/HomePage";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

type Props = {};

const Routes: React.FC<Props> = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
