import { Navigate, Outlet } from "react-router-dom";

const BotLayout = () => {
  const username = localStorage.getItem("username");

  return username ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default BotLayout;
