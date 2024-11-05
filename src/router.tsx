import { HeaderSkeleton } from "@/components/HeaderSkeleton";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/layouts/Layout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomeRoute = lazy(() => import("@/components/HomeRoute"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const BookDashboardPage = lazy(() => import("@/pages/BookDashboardPage"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<HeaderSkeleton />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeRoute />} index />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<BookDashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
