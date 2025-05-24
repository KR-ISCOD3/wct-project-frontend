import React, { useState } from "react";
import { FaBookOpen, FaUserFriends, FaUserCog, FaRegWindowRestore } from "react-icons/fa";
import { RiHome3Fill, RiHomeSmile2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { IoIosSchool } from "react-icons/io";
import Loading from "./Loading"; // Import the Loading component

function SideBar() {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); 


  const handleLogout = () => {
    setIsLoading(true); // Show loading state
    dispatch(logoutUser())
      .then(() => {
        // Redirect to login page after successful logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setIsLoading(false); // Hide loading state if logout fails
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
            <NavLink to="/" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <FaRegWindowRestore className="me-2 fs-5" />
                Dashboard
              </li>
            </NavLink>
            {userRole === "admin" && (
              <NavLink to="/student" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
                <li className="py-2 px-3">
                  <FaUserFriends className="me-2 fs-5" />
                  Students
                </li>
              </NavLink>
            )}
            <NavLink to="/teacher" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <FaUserCog className="me-2 fs-5" />
                Instructors
              </li>
            </NavLink>
            <NavLink to="/building" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <RiHome3Fill className="me-2 fs-5" />
                Building
              </li>
            </NavLink>
            <NavLink to="/class" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <RiHomeSmile2Fill className="me-2 fs-5" />
                Classes
              </li>
            </NavLink>
            <NavLink to="course" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <FaBookOpen className="me-2 fs-5" />
                Courses
              </li>
            </NavLink>
            <NavLink to="certificate" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
              <li className="py-2 px-3">
                <PiStudentBold className="me-2 fs-5" />
                Certificate
              </li>
            </NavLink>
          </ul>
        </menu>

        {/* Footer - Log Out Button */}
        <footer>
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            disabled={isLoading} // Disable the button while loading
          >
            
                <IoLogOut className="fs-3 me-2" />
                Log out
          </button>
        </footer>
      </div>
    </aside>
  );
}

export default SideBar;
