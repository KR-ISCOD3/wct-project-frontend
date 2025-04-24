import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../features/admin/studentSlice';
import { BsThreeDots } from 'react-icons/bs';
import { PiExport } from "react-icons/pi";
import * as XLSX from "xlsx";

function TableStudent() {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  // ✅ Export to Excel Function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upcoming Register");
    XLSX.writeFile(workbook, "Upcoming_Register.xlsx");
  };

  return (
    <div className="border rounded-3 p-3">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
        <div className='d-flex col-3 align-items-center'>
          <p className="m-0 fs-5 col-5">Student-Table</p>
          <select name="" id="" className='form-select shadow-none rounded-0 border'>
            <option value="recent">Recent</option>
            <option value="last-week">Last-Week</option>
          </select>
        </div>
        <button onClick={exportToExcel} className="btn bg-success-subtle text-success d-flex align-items-center">
          <PiExport className="me-2 fs-5" />
          Export Excel
        </button>
      </div>

      {/* Scrollable Container */}
      <div className="scrollable-container" style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <table className="mt-2 table">
          <thead>
            <tr>
              <td className="text-secondary">Student/Course</td>
              <td className="text-secondary">Gender</td>
              <td className="text-secondary">Payment-Method</td>
              <td className="text-secondary">Price/Khmer</td>
              <td className="text-secondary">Starting-Date</td>
              <td className="text-secondary "></td>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              [...students] // Create a shallow copy of the students array
                .sort((a, b) => b.id - a.id) // Sort students by 'id' in ascending order
                .map((item, index) => (
                  <tr className="align-middle border-bottom" key={index}>
                    <td className="py-2">
                      <div className="border-start border-primary border-5 ps-3">
                        <p className="m-0 fw-medium fs-5">{item.student_name}</p>
                        <p className="m-0 text-muted">{item.course_title}</p>
                      </div>
                    </td>
                    <td>
                      <p className="m-0">
                        <span className={`bg-${item.gender_name === 'Male' ? 'info' : 'danger'}-subtle text-${item.gender_name === 'Male' ? 'primary' : 'danger'} rounded-5 px-3`}>
                          {item.gender_name}
                        </span>
                      </p>
                    </td>
                    <td><p className="m-0">{item.payment_method}</p></td>
                    <td>
                      <p className='m-0'>
                        <span className="text-danger">
                          {item.price} /
                        </span>
                        <span className="text-danger">
                          {parseFloat(item.price.toString().replace('$', '')) * 4100}៛
                        </span>
                      </p>
                    </td>
                    <td className="text-start">
                      <p className="m-0">
                        <span className="bg-secondary-subtle px-4 rounded-5">{item.startdate}</span>
                      </p>
                    </td>
                    <td className='text-center'>
                      <div className="col-1 text-center">
                        <div className="dropdown">
                          <a className="btn border-0 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <BsThreeDots />
                          </a>
                          <ul className="dropdown-menu px-2">
                            <p className='border-bottom mb-1'>Action</p>
                            <button className="btn btn-secondary w-100 text-start my-1">Print</button>
                            <button className="btn bg-blue-700 text-light border w-100 text-start my-1" data-bs-toggle="modal">Edit</button>
                            <button className="btn btn-danger border w-100 text-start my-1">Delete</button>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">No students found.</td>
                </tr>
              )
            )}
          </tbody>


        </table>
        {loading && <p className="text-center mt-3">Loading...</p>}
      </div>

      <div className='modal fade'>

      </div>
    </div>
  );
}

export default TableStudent;
