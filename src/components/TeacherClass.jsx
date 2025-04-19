import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { PiHouseLineDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const classes = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: "Web-Design",
  chapter: "Introduction",
  students: 10,
  time: "02:00-3:15 (Mon-Thu)",
  location: "ETEC 1 (E102)",
  status: "Physical",
}));

function TeacherClass() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");

  const handleEditClick = () => {
    setIsDisabled(false); // Enable input field
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsDisabled(true); // Disable input field when Enter is pressed
    }
  };

  return (
    <div className="row">
      {classes.map((classData) => (
        <div key={classData.id} className="col-4 my-2">
          <div className="card p-3 border border-warning border-5">
            {/* class course */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="col-11 d-flex">
                <PiHouseLineDuotone className="fs-3 me-2" />
                <h3 className="m-0">{classData.name}</h3>
              </div>
              <div className="col-1 text-end">
                <div className="dropdown">
                  <a className="btn border-0 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsThreeDots />
                  </a>

                  <ul className="dropdown-menu px-2">
                    <button className="btn border w-100 text-start my-1">Add Student</button>
                    <button className="btn border w-100 text-start my-1">Transfer Class</button>
                    <button className="btn border w-100 text-start my-1">Update Class</button>
                    <button className="btn btn-secondary border w-100 text-start my-1">Pre-End</button>
                    <button className="btn btn-danger border w-100 text-start my-1">End Classes</button>
                  </ul>
                </div>
              </div>
            </div>

            <table className="table">
              <tbody>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Chapter:</td>
                  <td className="text-success">
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control shadow-none border-0"
                        placeholder="Enter Chapter"
                        title="Click pen for edit and enter for close"
                        value={value}
                        disabled={isDisabled}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} // Listen for Enter key
                        autoFocus={!isDisabled} // Auto-focus input when editing
                      />
                      <button className="btn border-0 fs-6" onClick={handleEditClick}>
                        <FaPen />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Student:</td>
                  <td className="text-primary">{classData.students}</td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Time:</td>
                  <td className="text-success">{classData.time}</td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Location:</td>
                  <td className="text-dark">{classData.location}</td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Status:</td>
                  <td className="text-dark">{classData.status}</td>
                </tr>
              </tbody>
            </table>
            <NavLink to="/attendance" className="btn bg-blue-700 text-light d-flex align-items-center justify-content-center">
              <IoPeople className="fs-5 me-2" />
              View Students
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeacherClass;
