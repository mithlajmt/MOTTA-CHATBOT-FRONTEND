import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const username = localStorage.getItem("username");

  return username ? <Navigate to="/bot" replace /> : <Outlet />;
};

export default AuthLayout;
