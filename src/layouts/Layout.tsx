import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <Header isDashboard={isDashboard} />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
