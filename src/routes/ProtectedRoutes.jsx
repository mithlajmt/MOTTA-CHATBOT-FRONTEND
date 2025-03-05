import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const username = localStorage.getItem("username");

  return username ? <Outlet /> : <Navigate to="/auth" replace />;
};

const PublicRoute = () => {
  const username = localStorage.getItem("username");

  return !username ? <Outlet /> : <Navigate to="/bot" replace />;
};

export { PrivateRoute, PublicRoute };
