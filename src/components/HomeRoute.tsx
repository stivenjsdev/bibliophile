import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import { Navigate } from "react-router-dom";

const HomeRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
};

export default HomeRoute;
