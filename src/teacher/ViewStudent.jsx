import React, { useState,useEffect } from 'react';
import { BiTransfer } from 'react-icons/bi';
import { FaPen, FaTrash } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoEye, IoFemale, IoMale } from 'react-icons/io5';
import { PiExport } from 'react-icons/pi';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsByClassId, updateStudent } from '../features/teacher/teacherStuSlice';
import { toast, ToastContainer } from 'react-toastify';
import { MdSpatialTracking } from "react-icons/md";

function ViewStudent() {
  const { classid: classId } = useParams();
  const dispatch = useDispatch();
  const { students, fetchLoading, error } = useSelector(state => state.teacherStu);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', tel: '', gender_id: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (classId) {
      dispatch(fetchStudentsByClassId(classId));
    }
    console.log("Selected classId:", classId);
  }, [classId, dispatch]);


  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditFormData({ name: student.name, tel: student.tel, gender_id: student.gender_id?.toString() || '' });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = () => {
    if (selectedStudent) {
      setIsUpdating(true);
      console.log('Updating student:', selectedStudent.id, editFormData);
      dispatch(updateStudent({ id: selectedStudent.id, updatedData: editFormData }))
        .unwrap()
        .then(() => {
          toast.success('Student updated successfully!');
          console.log('Update successful, refetching students...');
          dispatch(fetchStudentsByClassId(classId));
          setShowEditModal(false);
          setSelectedStudent(null);
        })
        .catch(err => console.error('Update failed:', err))
        .finally(() => {
            setIsUpdating(false);
        });
    }
  };

  return (
    <>
        <ToastContainer/>
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
                    <button className="btn bg-primary-subtle text-primary d-flex align-items-center me-2">
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
                            students.map((student, index) => (
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
                                        <li className='border-bottom'>
                                            <NavLink className="nav-link p-2 px-3 d-flex align-items-center text-blue-600" to="#">
                                            <IoEye className='fs-4 me-2' />
                                            View
                                            </NavLink>
                                        </li>
                                        <li className='border-bottom'>
                                            <NavLink className="nav-link p-2 px-3 d-flex align-items-center text-blue-600" to="#">
                                            <BiTransfer className='fs-4 me-2' />
                                            Transfer
                                            </NavLink>
                                        </li>
                                        <li className='border-bottom'>
                                            <button
                                            className="nav-link p-2 px-3 d-flex align-items-center text-blue-600 bg-transparent border-0 w-100 text-start"
                                            onClick={() => handleEditClick(student)}
                                            >
                                            <FaPen className='fs-5 me-2' />
                                            Edit
                                            </button>
                                        </li>
                                        <li className='border-bottom'>
                                            <NavLink className="nav-link p-2 px-3 d-flex align-items-center text-danger" to="#">
                                            <FaTrash className='fs-5 me-2' />
                                            Delete
                                            </NavLink>
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

        {showEditModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "#00000099" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Student</h5>
                        <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={editFormData.name} onChange={handleEditChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Telephone</label>
                            <input type="text" className="form-control" name="tel" value={editFormData.tel} onChange={handleEditChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select className="form-select" name="gender_id" value={editFormData.gender_id} onChange={handleEditChange}>
                                <option value="">Select Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleConfirmEdit}>
                        {isUpdating ? (
                            <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            &nbsp;Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                    </div>
                </div>
                {/* <div className="modal-backdrop fade show"></div> */}
            </div>  
        )}
    </>
  );
}

export default ViewStudent;
