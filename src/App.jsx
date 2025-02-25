import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/NotFound";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      if (mobile) {
        navigate("/notfound"); // Redirect to 404 on mobile
      } else {
        navigate("/"); // Redirect to Dashboard on larger screens
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [navigate]);

  return (
    <div className="container-fluid p-0 d-flex">
      {!isMobile && <SideBar />}

      {!isMobile ? (
        <main className={isMobile ? "col-12" : "col-10"}>
          <Header />
          <Outlet/>
        </main>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}

export default App;
