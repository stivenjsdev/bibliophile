import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { BookDashboardSkeleton } from "./BookDashboardSkeleton";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <BookDashboardSkeleton />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
