import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un componente de carga más elaborado
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;