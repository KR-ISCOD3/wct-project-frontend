import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesById } from "../features/teacher/classSlice";
import { BsThreeDots } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { PiHouseLineDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { FaPen } from "react-icons/fa";

function TeacherClass() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [classes, setClasses] = useState([]);
  const [editStates, setEditStates] = useState({}); // Track edit state per class id
  
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user && user.id) {
      setLoading(true); 
      dispatch(fetchClassesById(user.id))
        .unwrap()
        .then((classList) => {
          console.log("✅ Unwrapped data:", classList);
          if (classList && Array.isArray(classList)) {
            setClasses(classList);
  
            // Initialize edit states: disabled and initial chapter value
            const initialEditStates = {};
            classList.forEach((cls) => {
              initialEditStates[cls.id] = {
                value: cls.chapter || "",
                isDisabled: true,
              };
            });
            setEditStates(initialEditStates);
          } else {
            setClasses([]);
            setEditStates({});
          }
        })
        .catch((err) => {
          console.error("❌ Failed to fetch classes:", err);
        })
        .finally(()=>{
          setLoading(false); 
        });
    }
  }, [dispatch, user]);


  return (
    <div className="row">
      {/* Debug: show raw classes data */}
      {/* <pre>{JSON.stringify(classes, null, 2)}</pre> */}
      {/* {loading && <p>Loading data...</p>} */}

      {
      loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="col-4 my-2">
              <div className="card p-3 border border-warning border-5">
                <div className="placeholder-glow mb-3">
                  <span className="placeholder col-6"></span>
                </div>
                <table className="table">
                  <tbody>
                    {[...Array(5)].map((_, j) => (
                      <tr key={j}>
                        <td><span className="placeholder col-4"></span></td>
                        <td><span className="placeholder col-6"></span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="placeholder btn btn-primary disabled col-12"></div>
              </div>
            </div>
          ))
      ):(
      classes.map((classData) => (
        <div key={classData.id} className="col-4 my-2">
          <div className="card p-3 border border-warning border-5">
            {/* Card Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="col-11 d-flex align-items-center">
                <PiHouseLineDuotone className="fs-3 me-2" />
                <h3 className="m-0">
                  {classData.course_name || `Course ID: ${classData.course_id}`}
                </h3>
              </div>
              <div className="col-1 text-end">
                <div className="dropdown">
                  <a
                    className="btn border-0 p-0"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={e => e.preventDefault()}
                  >
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

            {/* Class Info Table */}
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
                        value={editStates[classData.id]?.value || ""}
                        disabled={true}
                      />
                    </div>
                  </td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Student:</td>
                  <td className="text-primary">{classData.students ?? 0}</td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Time:</td>
                  <td className="text-success">{classData.time || "N/A"}</td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Location:</td>
                  <td className="text-dark">{classData.building_name || "N/A"}</td>
                </tr>
                <tr className="fs-5 text-secondary align-middle">
                  <td className="col-3 py-2">Status:</td>
                  <td className="text-dark">{classData.status || "Unknown"}</td>
                </tr>
              </tbody>
            </table>

            {/* View Students Button */}
            <NavLink
              to="/attendance"
              className="btn bg-blue-700 text-light d-flex align-items-center justify-content-center"
            >
              <IoPeople className="fs-5 me-2" />
              View Students
            </NavLink>
          </div>
        </div>
      )))
      }
    </div>
  );
}

export default TeacherClass;
