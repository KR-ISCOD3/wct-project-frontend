import React, { useState } from "react";
import { FaRegWindowRestore } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoLogOut, IoPeople, IoSettings } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSchool } from "react-icons/io";
import Loading from "./Loading"; // Import the Loading component

function SideBarTeacher() {
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true); // Set loading state to true when logging out
    dispatch(logoutUser())
      .then(() => {
        navigate("/login"); // Redirect after successful logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setIsLoading(false); // Reset loading state if an error occurs
      });
  };

  return (
    <aside className="col-2">
      {isLoading && <Loading/>}
      <div className="col-2 position-fixed p-3 font-poppins bg-blue-700 d-flex flex-column" style={{ height: "100vh" }}>
        {/* Header */}
        <header className="d-flex align-items-center text-light border-bottom pb-3">
          <div style={{ width: 60, height: 60 }} className="rounded-circle bg-transparent overflow-hidden me-2">
            <IoIosSchool style={{ fontSize: 220 }} className="text-light w-100 h-100" />
          </div>
          <div>
            <h5 className="m-0">FE-Manager</h5>
            <p style={{ fontSize: "12px" }} className="m-0"></p>
          </div>
        </header>

        {/* Menu */}
        <menu className="p-0 flex-grow-1">
          <ul className="list-unstyled">
            <NavLink to="/teacher-dashboard" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <FaRegWindowRestore className="me-2 fs-5" />
                Dashboard
              </li>
            </NavLink>
            <NavLink to="" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <RiHome2Fill className="me-2 fs-5" />
                Create Class
              </li>
            </NavLink>
            <NavLink to="" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <IoPeople className="me-2 fs-5" />
                List All Student
              </li>
            </NavLink>
            <NavLink to="" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <IoSettings className="me-2 fs-5" />
                Setting
              </li>
            </NavLink>
          </ul>
        </menu>

        {/* Footer - Log Out Button */}
        <footer>
          <button
            onClick={handleLogout} // Attach the logout function
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            disabled={isLoading} // Disable button while loading
          >
           
                <IoLogOut className="fs-3 me-2" />
                Log out
          </button>
        </footer>
      </div>
    </aside>
  );
}

export default SideBarTeacher;
