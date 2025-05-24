import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents  } from '../features/admin/studentSlice';
import { BsThreeDots } from 'react-icons/bs';
import { PiExport } from "react-icons/pi";
import { fetchCourses } from '../features/admin/courseSlice';
import * as XLSX from "xlsx";
import EditStuRegisterModal from '../modal/EditStuRegisterModal';
import DeleteStuRegisterModal from '../modal/DeleteStuRegisterModal';
import ReceiptModal from '../modal/ReceiptModal';

const genders = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" }
];

function TableStudent() {
  const dispatch = useDispatch();
  
  const tableRef = useRef();
  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);
  
  

  const { courses } = useSelector((state) => state.courses);
  const { students, loading } = useSelector((state) => state.student);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [selectedForReceipt, setSelectedForReceipt] = useState(null);

  const [form, setForm] = useState({
    student_name: '',
    course_title: '',
    gender_id: '',
    payment_method: '',
    price: '',
    doc_fee: '',
    startdate: '',
  });
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [customCourseName, setCustomCourseName] = useState('');

  useEffect(() => {dispatch(getStudents());}, [dispatch]);
  useEffect(() => {dispatch(fetchCourses());}, [dispatch]);

  // Sync selected student data to form
  useEffect(() => {
    if (!selectedStudent) return;
    setForm({
      student_name: selectedStudent.student_name || '',
      course_title: courses.find(c => c.id === selectedStudent.course_id)?.name || '',
      gender_id: selectedStudent.gender_id?.toString() || "",
      payment_method: selectedStudent.payment_method || '',
      price: selectedStudent.price || '',
      doc_fee:selectedStudent.document_fee || '',
      startdate: selectedStudent.startdate || '',
    });

    if (selectedStudent.course_id) {
      setSelectedCourseId(selectedStudent.course_id);
      setCustomCourseName('');
    } else {
      setSelectedCourseId(-1);
      setCustomCourseName(selectedStudent.custom_course || '');
    }
  }, [selectedStudent, courses]);

  // Export to Excel Function
  const exportToExcel = () => {
    // 1. Pick only the fields you want in the sheet
    const exportData = students.map((s) => ({
      ID:           s.id,
      Name:         s.student_name,
      Course:       s.course_title,
      Gender:       s.gender_name,
      Payment:      s.payment_method,
      PriceUSD:     s.price,
      PriceKHR:     parseFloat(s.price) * 4100,
      StartDate:    s.startdate,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Register Report");
    XLSX.writeFile(workbook, "Register_Report.xlsx");
  };

  // Call this when you click the “Delete” item in the dropdown
  const openDeleteModal = (id) => { setToDeleteId(id);};

  return (
    <>
      <div className="border rounded-3 p-3 animate__animated animate__fadeIn animate__faster">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
          <div className="d-flex col-3 align-items-center">
            <p className="m-0 fs-5 col-5">Student-Table</p>
            <select name="" id="" className="form-select shadow-none rounded-0 border">
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
          <table className="mt-2 table" ref={tableRef}>
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
              {students.filter((item) => item.status === 'enabled').length > 0 ? (
                [...students]
                  .filter((item) => item.status === 'enabled')
                  .sort((a, b) => b.id - a.id)
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
                        <p className="m-0">
                          <span className="text-danger">
                            {item.total_price}
                          </span>
                         
                        </p>
                      </td>
                      <td className="text-start">
                        <p className="m-0">
                          <span className="bg-secondary-subtle px-4 rounded-5">{item.startdate}</span>
                        </p>
                      </td>
                      <td className="text-center">
                        <div className="col-1 text-center">
                          <div className="dropdown">
                            <a className="btn border-0 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <BsThreeDots />
                            </a>
                            <ul className="dropdown-menu px-2">
                              <p className="border-bottom mb-1">Action</p>
                              <button 
                                  className="btn btn-secondary w-100 text-start my-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#receiptModal"
                                  onClick={() => setSelectedForReceipt(item)} // Set student
                                >
                                  Print
                                </button>
                              <button
                                ref={modalRef}
                                className="btn bg-blue-700 text-light border w-100 text-start my-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit"
                                onClick={() => setSelectedStudent(item)}
                              >
                                Edit
                              </button>
                              <button 
                                ref={deleteModalRef}
                                className="btn btn-danger border w-100 text-start my-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete"
                                onClick={() => openDeleteModal(item.id)}
                              >
                                Delete
                              </button>
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
      </div>

      {/* Edit Modal */}
      <EditStuRegisterModal
        selectedStudent={selectedStudent}
        form={form}
        setForm={setForm}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        customCourseName={customCourseName}
        setCustomCourseName={setCustomCourseName}
        loading={loading}
        courses={courses}
        genders={genders} // ✅ add this line

      />

      <DeleteStuRegisterModal toDeleteId={toDeleteId}/>
      <ReceiptModal selectedForReceipt={selectedForReceipt} />

    </>
  );
}

export default TableStudent;
