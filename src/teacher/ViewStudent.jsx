import React, { useState, useEffect, use } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoEye, IoFemale, IoMale } from 'react-icons/io5';
import { PiExport } from 'react-icons/pi';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, fetchStudentsByClassId, updateStudent } from '../features/teacher/teacherStuSlice';
import { toast, ToastContainer } from 'react-toastify';
import { MdSpatialTracking } from "react-icons/md";
import { fetchAttendanceByClass, submitAttendance } from '../features/teacher/attendanceSlice';

function ViewStudent() {
  const { classid: classId } = useParams();
  const dispatch = useDispatch();
  const { classAttendance, loading } = useSelector(state => state.attendance);
  const { students, fetchLoading, error } = useSelector(state => state.teacherStu);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', tel: '', gender_id: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    if (classId) {
      dispatch(fetchStudentsByClassId(classId));
      dispatch(fetchAttendanceByClass(classId));
    }
    
  }, [classId, dispatch]);

  const studentsWithAttendance = students
    .map((student) => ({
      ...student,
      ...classAttendance[student.id], // attendance keyed by student id
    }))
    .sort((a, b) => a.id - b.id);

  // Optional: Log or use attendance data
  useEffect(() => {
    if (classAttendance) {
      console.log('Fetched Attendance:', classAttendance);
      // You can initialize attendance state here if needed
    }
  }, [classAttendance]);
  

  // Initialize attendanceData when students change
  useEffect(() => {
    if (students.length > 0) {
      const initialAttendance = {};
      students.forEach(student => {
        initialAttendance[student.id] = {
          absent: true,
          present: false,
          permission: false,
        };
      });
      setAttendanceData(initialAttendance);
    }
  }, [students]);
  

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditFormData({ name: student.name, tel: student.tel || '', gender_id: student.gender_id?.toString() || '' });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = () => {
    if (selectedStudent) {
      setIsUpdating(true);
      dispatch(updateStudent({ id: selectedStudent.id, updatedData: editFormData }))
        .unwrap()
        .then(() => {
          toast.success('Student updated successfully!');
          dispatch(fetchStudentsByClassId(classId));
          setShowEditModal(false);
          setSelectedStudent(null);
        })
        .catch(err => {
          toast.error('Failed to update student.');
          console.error('Update failed:', err);
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        absent: status === 'absent',
        present: status === 'present',
        permission: status === 'permission',
      }
    }));
  };

  const [loadingAtt,setLoadingAtt] = useState(false)

  const handleAttendanceSave = async () => {
  setLoadingAtt(true); // Show loading

  const attendances = students.map(student => {
    const status = attendanceData[student.id] || {
      absent: true,
      present: false,
      permission: false,
    };

    let attendance_status = null;
    if (status.present) attendance_status = "P";
    else if (status.permission) attendance_status = "PM";
    else if (status.absent) attendance_status = "A";

    return {
      student_id: student.id,
      attendance_status,
      reason: null,
    };
  });

    const attendancePayload = {
      class_id: classId,
      teacher_id: 2,
      date: new Date().toISOString().slice(0, 10),
      attendances,
    };

    try {
      await dispatch(submitAttendance(attendancePayload)).unwrap(); // Use unwrap if you're using createAsyncThunk
      await dispatch(fetchAttendanceByClass(classId));
      setShowAttendanceModal(false);
      toast.success("Attendance Was Recorded.");
    } catch (error) {
      console.error("Failed to submit attendance:", error);
    } finally {
      setLoadingAtt(false); // Hide loading regardless of success or failure
    }
  };

  const handleDelete = (studentId) => {
    dispatch(deleteStudent(studentId));
    toast.success("Delete Success.");
  };

  return (
    <>
      <ToastContainer />
      <div className='container-fluid p-3 font-poppins animate__animated animate__fadeIn animate__faster'>
        <div className="row mb-3">
          <div className="col-3">
            <div className="card d-flex p-2 px-3">
              <p className='mb-2 text-secondary border-bottom'>Course</p>
              <p className='m-0 fs-5'>Web-Design + React</p>
            </div>
          </div>

          <div className="col-3">
            <div className="card d-flex p-2 px-3">
              <p className='mb-2 text-secondary border-bottom'>Total Student</p>
              <div className='d-flex align-items-center justify-content-between'>
                <p className='m-0 fs-5'>{students.length} Students</p>
                <span className='px-2 bg-primary-subtle rounded-2 text-primary'>Close</span>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="card d-flex p-2 px-3">
              <p className='mb-2 text-secondary border-bottom'>Location / Room</p>
              <p className='m-0 fs-5'>ETEC 1 (E102)</p>
            </div>
          </div>

          <div className="col-3">
            <div className="card d-flex p-2 px-3">
              <p className='mb-2 text-secondary border-bottom'>Status</p>
              <p className='m-0 fs-5'>Physical</p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center border-top py-3 font-poppins border-bottom">
          <p className="m-0 fs-5 col-7 ">Attendance-Table</p>
          <div className='d-flex '>
            <button
              className="btn bg-primary-subtle text-primary d-flex align-items-center me-2"
              onClick={() => setShowAttendanceModal(true)}
            >
              <MdSpatialTracking className="me-2 fs-5" />
              Track Attendance
            </button>
            <button className="btn bg-success-subtle text-success d-flex align-items-center">
              <PiExport className="me-2 fs-5" />
              Export Excel
            </button>
          </div>
        </div>

        <div style={{ maxHeight: "600px", overflowY: "auto", overflowX: "auto" }} className='scrollable-container border-bottom'>
          {fetchLoading ? (
            <p>Loading students...</p>
          ) : error ? (
            <p className="text-danger">Failed to load students: {error}</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <td className='text-secondary'>Name</td>
                  <td className='text-secondary'>Gender</td>
                  <td className='text-secondary'>Tel</td>
                  <td colSpan={3} className='text-secondary'>Attendance Score</td>
                  <td className='text-secondary'>Absent</td>
                  <td className='text-secondary'>Project Score</td>
                  <td className='text-secondary'>Total Score</td>
                  <td className='text-secondary'>Action</td>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center text-secondary py-4">
                      No students...
                    </td>
                  </tr>
                ) : (
                  studentsWithAttendance.map((student, index) => (
                    <tr key={index} className='align-middle'>
                      <td><p className='m-0 fs-5 pe-4'>{student.name}</p></td>
                      <td>
                        <p className={`m-0 d-flex align-items-center ${student.gender_name === "Male" ? "text-primary" : "text-danger"}`}>
                          {student.gender_name === "Male" ? <IoMale /> : <IoFemale />}
                          {student.gender_name}
                        </p>
                      </td>
                      <td>{student.tel || "N/A"}</td>
                      <td><p className='mb-0 me-4'>Present: <span className='text-success fw-medium'>{student.present || 0} pt</span></p></td>
                      <td><p className='mb-0 me-4'>Permission: <span className='text-warning fw-medium'>{student.permission || 0} pt</span></p></td>
                      <td><p className='mb-0'>Total: <span className='text-info fw-medium'>{(student.present || 0) + (student.permission || 0)} pt</span></p></td>
                      <td><p className='mb-0 me-4'>Absent: <span className='text-danger fw-medium'>{student.absent || 0}</span></p></td>
                      <td><span className='text-primary fw-medium'>{student.score || 0} pt</span></td>
                      <td><span className='text-blue-700 fw-medium'>{student.final || 0} pt</span> <span className='text-primary bg-primary-subtle px-2 rounded-2'>Pass</span></td>
                      <td>
                        <div className="btn-group">
                          <button className="btn shadow-none border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <HiDotsVertical />
                          </button>
                          <ul className="dropdown-menu pb-0">
                            {/* <li className='border-bottom'>
                              <NavLink className="nav-link p-2 d-flex align-items-center" to={`/student/info/${student.id}`}>
                                <IoEye className='me-2' /> Detail
                              </NavLink>
                            </li> */}
                            <li className='border-bottom'>
                              <button
                                className="btn w-100 text-start p-2 d-flex align-items-center"
                                onClick={() => handleEditClick(student)}
                              >
                                <FaPen className='me-2' /> Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn w-100 text-start p-2 d-flex align-items-center"
                                onClick={() => handleDelete(student.id)}
                              >
                                <FaTrash className='me-2' /> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedStudent && (
        <div className="modal show fade d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content font-poppins">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student: {selectedStudent.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">Name</label>
                    <input
                      type="text"
                      id="editName"
                      name="name"
                      className="form-control"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editTel" className="form-label">Phone Number</label>
                    <input
                      type="text"
                      id="editTel"
                      name="tel"
                      className="form-control"
                      value={editFormData.tel}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editGender" className="form-label">Gender</label>
                    <select
                      id="editGender"
                      name="gender_id"
                      className="form-select"
                      value={editFormData.gender_id}
                      onChange={handleEditChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmEdit}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="modal show fade d-block" tabIndex={-1}
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content font-poppins">
              <div className="modal-header">
                <h5 className="modal-title">Track Attendance</h5>
                <button type="button" className="btn-close" onClick={() => setShowAttendanceModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className='table table-bordered align-middle'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className='text-center text-danger'>A</th>
                      <th className='text-center text-success'>P</th>
                      <th className='text-center text-warning'>PM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => {
                        const status = attendanceData[student.id] || { absent: true, present: false, permission: false };
                        return (
                            <tr key={student.id}>
                            <td>{student.name}</td>
                            <td className='col-1 text-center'>
                                <input
                                style={{ width: '24px', height: '24px',cursor:"pointer"}}
                                type="radio"
                                name={`attendance_${student.id}`}
                                checked={status.absent}
                                onChange={() => handleAttendanceChange(student.id, 'absent')}
                                />
                            </td>
                            <td className='col-1 text-center'>
                                <input
                                style={{ width: '24px', height: '24px',cursor:"pointer"}}
                                type="radio"
                                name={`attendance_${student.id}`}
                                checked={status.present}
                                onChange={() => handleAttendanceChange(student.id, 'present')}
                                />
                            </td>
                            <td className='col-1 text-center'>
                                <input
                                style={{ width: '24px', height: '24px',cursor:"pointer"}}
                                type="radio"
                                name={`attendance_${student.id}`}
                                checked={status.permission}
                                onChange={() => handleAttendanceChange(student.id, 'permission')}
                                />
                            </td>
                            </tr>
                        );
                    })}

                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAttendanceModal(false)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  onClick={handleAttendanceSave}
                  disabled={loadingAtt}
                >
                  {loadingAtt ? "Saving..." : "Save Attendance"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewStudent;
