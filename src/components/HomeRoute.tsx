import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import { Navigate } from "react-router-dom";

const HomeRoute = () => {
  const { state: authState } = useAuth();
  const { user } = authState;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
};

export default HomeRoute;
