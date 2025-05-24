import { Outlet} from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      {/* form-for admin */}
      <NotFound />
      <div className="container-fluid p-0 d-none d-xl-flex">
          <ToastContainer/>
          <SideBar/>
          <main className="col-10">
            <Header />
            <Outlet />
          </main>
      </div>
   </>
  );
}

export default App;
