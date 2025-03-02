import { Outlet} from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import PageNotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <PageNotFound />
      <div className="container-fluid p-0 d-none d-xl-flex">
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
