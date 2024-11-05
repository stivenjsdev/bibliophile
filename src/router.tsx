import Layout from "@/layouts/Layout";
import BookDashboardPage from "@/pages/BookDashboardPage";
import LandingPage from "@/pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} index />
          <Route path="/dashboard" element={<BookDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
