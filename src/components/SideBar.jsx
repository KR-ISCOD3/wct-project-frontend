import React from "react";
import { FaRegWindowRestore, FaUserCog, FaUserFriends } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside className="col-2">
      <div className="col-2 position-fixed p-3 font-poppins bg-blue-700" style={{height:"100vh"}}>
        <header className="d-flex align-items-center justify-content-start text-light border-secondary-subtle border-bottom pb-1">
          <div style={{width:60,height:60}} className="rounded-circle bg-light overflow-hidden me-2 mb-2">
            <img src="" alt="" className="w-100 h-100 object-fit-cover"/>
          </div>
          <div>
            <h5 className="m-0 ">FE-Manager</h5>
            <p style={{fontSize:"12px"}} className="m-0"></p>
          </div>
        </header>
        <menu className="p-0">
          <ul className="list-unstyled">
              <NavLink to="/" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
                <li className="py-2 px-3">
                  <FaRegWindowRestore className="me-2 fs-5"/>
                  Dashboard
                </li>
              </NavLink>
              <NavLink to="/student" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
                <li className="py-2 px-3">
                  <FaUserFriends className="me-2 fs-5"/>
                  Students
                </li>
              </NavLink>
              <NavLink to="/teacher" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
                <li className="py-2 px-3">
                  <FaUserCog className="me-2 fs-5"/>
                  Teachers
                </li>
              </NavLink>
              <a href="" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
                <li className="py-2 px-3">
                  <RiHomeSmile2Fill className="me-2 fs-5"/>
                  Classes
                </li>
              </a>
              <a href="" className="d-flex align-items-center hover-li text-light nav-link rounded-2 my-2">
                <li className="py-2 px-3">
                  <MdDateRange className="me-2 fs-5"/>
                  Attendence
                </li>
              </a>
          </ul>
        </menu>
      </div>
    </aside>
  );
}

export default SideBar;
