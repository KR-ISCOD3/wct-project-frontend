import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesById, updateClass, updateClassStatus } from "../features/teacher/classSlice";
import { fetchCourses } from "../features/admin/courseSlice";
import { fetchBuildings } from "../features/admin/buildingSlice";
import { BsThreeDots } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { PiHouseLineDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { addStudent } from "../features/teacher/teacherStuSlice";
import { ToastContainer,toast } from "react-toastify";

function TeacherClass({ refresh }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const { courses } = useSelector((state) => state.courses);
  const { buildings } = useSelector((state) => state.buildings);

  const [classes, setClasses] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [lastUpdatedClassId, setLastUpdatedClassId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    course_id: "",
    building_id: "",
    chapter: "",
    study_term: "",
    time: "",
  });

  const timeSlots = {
    "sat-sun": [
      "08:00 - 11:00 (sat-sun)",
      "11:00 - 01:45 (sat-sun)",
      "02:00 - 05:00 (sat-sun)",
    ],
    "mon-thu": [
      "09:00 - 10:30 (mon-thu)",
      "11:00 - 12:15 (mon-thu)",
      "12:30 - 01:45 (mon-thu)",
      "02:00 - 03:15 (mon-thu)",
      "03:30 - 05:00 (mon-thu)",
      "05:00 - 06:00 (mon-thu)",
      "06:00 - 07:15 (mon-thu)",
      "07:30 - 08:30 (mon-thu)",
    ],
  };

  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      dispatch(fetchClassesById(user.id))
        .unwrap()
        .then((classList) => {
          if (Array.isArray(classList)) {
            let reorderedList = classList;

            if (lastUpdatedClassId) {
              reorderedList = classList.filter(
                (cls) => cls.id !== lastUpdatedClassId
              );
              const updatedClass = classList.find(
                (cls) => cls.id === lastUpdatedClassId
              );
              if (updatedClass) reorderedList.push(updatedClass);
            }

            setClasses(reorderedList);

            const initialEditStates = {};
            reorderedList.forEach((cls) => {
              initialEditStates[cls.id] = {
                value: cls.chapter || "",
                isDisabled: true,
              };
            });
            setEditStates(initialEditStates);
          }
        })
        .catch((err) => console.error("Failed to fetch classes:", err))
        .finally(() => setLoading(false));
    }

    dispatch(fetchCourses());
    dispatch(fetchBuildings());
  }, [dispatch, user, refresh, refreshToggle, lastUpdatedClassId]);

  const handleOpenEditModal = (classData) => {
    const selectedTerm = classData.study_term || "";

    setSelectedClass(classData);
    setUpdatedData({
      course_id: classData.course_id,
      building_id: classData.building_id,
      chapter: classData.chapter || "",
      study_term: selectedTerm,
      time: classData.time || "",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "study_term") {
      setUpdatedData((prev) => ({
        ...prev,
        study_term: value,
        time: "", // Reset time when term changes
      }));
    } else {
      setUpdatedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      await dispatch(
        updateClass({ id: selectedClass.id, updatedData })
      ).unwrap();

      setShowEditModal(false);

      setClasses((prevClasses) => {
        const updatedClass = { ...selectedClass, ...updatedData };
        const filteredClasses = prevClasses.filter(
          (cls) => cls.id !== selectedClass.id
        );
        return [...filteredClasses, updatedClass];
      });

      // Refresh the class list by toggling refreshToggle
      setRefreshToggle((prev) => !prev);
    } catch (error) {
      console.error("Failed to update class:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [loadingStu,setLoadingStu] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender_id: 1,
    tel: "",
    teacher_id: user?.id || null,
    class_id: selectedClassId || null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      teacher_id: user?.id || null,
      class_id: selectedClassId || null,
    }));
  }, [user?.id, selectedClassId]);

  const toggleAddStudentModal = (classId = null) => {
    setSelectedClassId(classId);
    setShowAddStudentModal((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStu(true);
    dispatch(     
      addStudent({
        teacher_id: user.id,
        class_id: selectedClassId,
        ...formData,
      }) 
    )
      .unwrap()
      .then(() => {
        toast.success("Student added successfully!");
        setClasses(prev => 
          prev.map(cls => 
            cls.id === selectedClassId
              ? { ...cls, total_students: (cls.total_students || 0) + 1 }
              : cls
          )
        );
        setFormData({
          name: "",
          gender_id: 1,
          tel: "",
          teacher_id: user?.id || null,
          class_id: selectedClassId,
        });
        dispatch(fetchClassesById(user.id))
        setShowAddStudentModal(false); // Close modal after adding
      })
      .catch((err) => {
        console.error("Failed to add student:", err);
      }).finally(()=>{
        setLoadingStu(false);
      });
  };
  
  const handleMarkPreEnd = async (classId) => {
    try {
      console.log("Marking class as pre-end:", classId);
      await dispatch(updateClassStatus({ id: classId, status_class: "pre-end" })).unwrap();
      console.log("Update successful");
  
      if (user?.id) {
        console.log("Fetching classes for user:", user.id);
        const updatedClasses = await dispatch(fetchClassesById(user.id)).unwrap();
        setClasses(updatedClasses); // ✅ this makes the border update
        console.log("Fetch classes successful");
      } else {
        console.warn("User ID is undefined, cannot fetch classes.");
      }
  
      toast.success("Class marked as Pre-End!");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to mark class as Pre-End.");
    }
  };
  
  const handleMarkEnd = async (classId) => {
    try {
      console.log("Marking class as end:", classId);
      await dispatch(updateClassStatus({ id: classId, status_class: "end" })).unwrap();
      console.log("Update successful");
  
      if (user?.id) {
        console.log("Fetching classes for user:", user.id);
        const updatedClasses = await dispatch(fetchClassesById(user.id)).unwrap();
        setClasses(updatedClasses); // ✅ this makes the border update
        console.log("Fetch classes successful");
      } else {
        console.warn("User ID is undefined, cannot fetch classes.");
      }
  
      toast.success("Class marked as End!");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to mark class as End.");
    }
  };

  return (
    <div className="row">
      <ToastContainer/>
      {loading ? (
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
                      <td>
                        <span className="placeholder col-4"></span>
                      </td>
                      <td>
                        <span className="placeholder col-6"></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="placeholder btn btn-primary disabled col-12"></div>
            </div>
          </div>
        ))
      ) : classes.length === 0 ? (
        <div className="col-12 my-4 text-center text-secondary fs-4">
          No classes found.
        </div>
      ) : (
        classes.map((classData) => (
          
          <div
            key={classData.id}
            className={`col-4 my-2`}
          >
            <div
              className={`card p-3 border border-5 ${
                classData.status_class === "pre-end" ? "border-secondary" : 
                classData.status_class === "end" ? "border-danger" : "border-primary"
              }`}
            >
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
                    onClick={(e) => e.preventDefault()}
                  >
                    <BsThreeDots />
                  </a>
                  <ul className="dropdown-menu px-2">
                    <button
                      type="button"
                      className="btn border w-100 text-start my-1"
                      onClick={() => toggleAddStudentModal(classData.id)}
                    >
                      Add Student
                    </button>

                    <button
                      type="button"
                      className="btn border w-100 text-start my-1"
                      onClick={() => handleOpenEditModal(classData)}
                    >
                      Update Class
                    </button>

                    <button
                      type="button"
                      className={`btn border w-100 text-start my-1 btn-secondary`}
                      onClick={() => handleMarkPreEnd(classData.id)}
                    >
                      Pre-End
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger border w-100 text-start my-1"
                      onClick={() => handleMarkEnd(classData.id)}
                    >
                      End Classes
                    </button>
                  </ul>
                </div>
              </div>
            </div>

              <table className="table">
                <tbody>
                  <tr className="fs-5 text-secondary align-middle">
                    <td className="col-3 py-2">Chapter:</td>
                    <td className="text-success">
                      <input
                        type="text"
                        className="form-control shadow-none border-0"
                        value={editStates[classData.id]?.value || ""}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr className="fs-5 text-secondary align-middle">
                    <td className="col-3 py-2">Student:</td>
                    <td className="text-primary">{classData.total_students ?? 0}</td>
                  </tr>
                  <tr className="fs-5 text-secondary align-middle">
                    <td className="col-3 py-2">Term:</td>
                    <td className="text-dark">
                      {classData.study_term || "Unknown"}
                    </td>
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

              <NavLink
                to={`viewstu/${classData.id}`}
                className="btn bg-blue-700 text-light d-flex align-items-center justify-content-center"
              >
                <IoPeople className="fs-5 me-2" />
                View Students
              </NavLink>
            </div>
          </div>

        ))
      )}

      {/* Edit Modal */}
      {showEditModal && selectedClass && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "#00000099" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Class</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Course</label>
                    <select
                      className="form-select"
                      name="course_id"
                      value={updatedData.course_id}
                      onChange={handleEditChange}
                    >
                      <option value="" disabled>
                        Select Course
                      </option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Building</label>
                    <select
                      className="form-select"
                      name="building_id"
                      value={updatedData.building_id}
                      onChange={handleEditChange}
                    >
                      <option value="" disabled>
                        Select Building
                      </option>
                      {buildings.map((building) => (
                        <option key={building.id} value={building.id}>
                          {building.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Chapter</label>
                    <input
                      type="text"
                      className="form-control"
                      name="chapter"
                      value={updatedData.chapter}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Study Term</label>
                    <select
                      className="form-select"
                      name="study_term"
                      value={updatedData.study_term}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="" disabled>
                        Select term
                      </option>
                      <option value="sat-sun">Sat-Sun</option>
                      <option value="mon-thu">Mon-Thu</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Time</label>
                    <select
                      className="form-select"
                      name="time"
                      value={updatedData.time}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="" disabled>
                        Select time
                      </option>
                      {updatedData.study_term &&
                      timeSlots[updatedData.study_term]
                        ? timeSlots[updatedData.study_term].map((slot, idx) => (
                            <option key={idx} value={slot}>
                              {slot}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saveLoading}
                  >
                    {saveLoading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showAddStudentModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "#00000099" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button
                  className="btn-close"
                  onClick={toggleAddStudentModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <label>Student Name</label>
                  <input
                    className="form-control border shadow-none my-2"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter Student Name"
                    required
                  />
                  <label>Gender</label>
                  <select
                    className="form-select border shadow-none my-2"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender_id: Number(e.target.value),
                      })
                    }
                  >
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                  </select>
                  <label>Telephone</label>
                  <input
                    type="text"
                    className="form-control border shadow-none my-2"
                    value={formData.tel}
                    onChange={(e) =>
                      setFormData({ ...formData, tel: e.target.value })
                    }
                    placeholder="Enter Telephone"
                    required
                  />
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={toggleAddStudentModal}
                    >
                      Close
                    </button>
                    <button className="btn btn-primary" disabled={loadingStu?true:false}>
                      {loadingStu ? "Loading..." : "Add Student"}
                    </button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherClass;
