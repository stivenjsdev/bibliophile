import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <Header isDashboard={isDashboard} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
