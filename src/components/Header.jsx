import React, { useState } from 'react';
import { IoNotifications, IoSearch } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeyword } from '../features/search/searchSlice'; // ✅ Import action

function Header() {
  const dispatch = useDispatch();

  // Get user data from Redux
  const user = useSelector((state) => state.auth.user);
  const userImage = user?.image || './image/placeholder.png';

  // Local state for input
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearchKeyword(value)); // ✅ Dispatch to global state
  };

  return (
    <div className="container-fluid p-3 font-poppins border-bottom">
      <div className="d-flex justify-content-between align-items-center">

        {/* ---------- Search Form ---------- */}
        <form className="col-3 d-flex align-items-center border rounded-2" onSubmit={(e) => e.preventDefault()}>
          <button className="btn border-0 pe-1" disabled>
            <IoSearch className="fs-5" />
          </button>
          <input
            type="text"
            className="form-control border-0 shadow-none p-2"
            placeholder="Search instructors or students..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>

        {/* ---------- Notifications & Profile ---------- */}
        {/* <div className="d-flex align-items-center">
          <a href="#" className="position-relative">
            <IoNotifications className="fs-3 text-blue-700" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </a>
          <a href="#" style={{ width: 35, height: 35 }} className="bg-secondary ms-3 rounded-circle overflow-hidden">
            <img
              src={userImage}
              alt="User Profile"
              className="w-100 h-100 object-fit-cover"
            />
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default Header;
