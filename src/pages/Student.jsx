import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { TbTrashX } from "react-icons/tb";
import { fetchCourses } from "../features/admin/courseSlice";
import { registerStudent,getStudents } from "../features/admin/studentSlice";
import { toast } from "react-toastify";
import TableStudent from "../components/TableStudent";

function Student() {
  const dispatch = useDispatch();
  const { courses, loading:courseLoading } = useSelector((state) => state.courses);
  const { success, loading:stuLoading, error } = useSelector((state) => state.student || {});

  // Form states
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [customCourse, setCustomCourse] = useState(""); // ✅ new custom course field
  const [coursePrice, setCoursePrice] = useState("");
  const [documentFee, setDocumentFee] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cashing");
  const [startDate, setStartDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Place the useEffect for error handling here
  useEffect(() => {
    if (error) {
      console.error("Registration Error:", error);  // Log detailed error
      // alert("Error: " + (error.message || error));
    }
  }, [error]);

  const clearForm = () => {
    setFullName("");
    setGender(1);
    setSelectedCourse(0);
    setCustomCourse(""); // ✅ clear custom course too
    setCoursePrice("");
    setDocumentFee("");
    setPaymentMethod("Cashing");
    setStartDate("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const courseIdToSend = selectedCourse > 0 ? Number(selectedCourse) : null;
    const customCourseToSend = selectedCourse > 0 ? "" : customCourse.trim();

    const studentData = {
      student_name: fullName,
      gender_id: Number(gender),
      course_id: courseIdToSend,
      custom_course: customCourseToSend, // ✅ send custom course name
      price: Number(coursePrice),
      document_fee: Number(documentFee) || 0,
      payment_method: paymentMethod || "Cashing",
      startdate: startDate,
    };

    dispatch(registerStudent(studentData))
      .then(()=>{
        dispatch(getStudents());
        clearForm();
        toast.success('Add Success!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
         });
      })
      .finally(() => {
        setIsLoading(false);
      });
    
  };

  return (
    <div className="p-3 font-poppins ">
      <div className="d-flex animate__animated animate__fadeIn animate__faster">
        <form onSubmit={handleRegister} className="w-100 pb-3 border-bottom">
          <h2>Register-Form</h2>
          <p className="text-secondary">
            Every great achievement begins with a single step. Register and start learning!
          </p>

          <div className="row m-0">
            {/* Full Name */}
            <div className="col-3 ps-0 pe-3">
              <label className="mb-1 text-blue-700">Full-Name*</label>
              <input
                
                type="text"
                placeholder="Enter Full-Name"
                className="form-control shadow-none border rounded-0"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="col-3 ps-0 pe-3">
              <label className="mb-1 text-blue-700">Gender*</label>
              <select
                className="form-select shadow-none border rounded-0"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>

            {/* Course */}
            <div className="col-3 ps-0 pe-3">
              <label className="mb-1 text-blue-700">Select Course</label>
              <select
                className="form-select shadow-none border rounded-0"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value={0} className="text-secondary">-- Choose Course --</option>
                {courseLoading ? (
                  <option>Loading...</option>
                ) : (
                  courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Custom Course */}
            <div className="col-3 ps-0 pe-3">
              <label className="mb-1 text-blue-700">Or Custom Course</label>
              <input
                
                type="text"
                placeholder="Enter Custom Course"
                className="form-control shadow-none border rounded-0"
                value={customCourse}
                onChange={(e) => setCustomCourse(e.target.value)}
              />
            </div>

            {/* Course Price */}
            <div className="col-2 ps-0 mt-3">
              <label className="mb-1 text-blue-700">Course-Price*</label>
              <input
                
                type="text"
                placeholder="Enter Price"
                className="form-control shadow-none border rounded-0"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                required
              />
            </div>

            {/* Document Fee + Payment Method */}
            <div className="col-4 ps-0 pe-3 mt-3 d-flex">
              <div className="col-6 me-3">
                <label className="mb-1 text-blue-700">Document-Fee*</label>
                <input
                  
                  type="text"
                  placeholder="Enter Document Fee"
                  className="form-control shadow-none border rounded-0"
                  value={documentFee}
                  onChange={(e) => setDocumentFee(e.target.value)}
                  required
                />
              </div>

              <div className="col-6">
                <label className="mb-1 text-blue-700">Payment-Method*</label>
                <select
                  className="form-select shadow-none border rounded-0"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="Cashing">Cashing</option>
                  <option value="Online-Payment">Online-Payment</option>
                  <option value="QR-Payment">QR-Payment</option>
                </select>
              </div>
            </div>

            {/* Start Date */}
            <div className="col-2 ps-0 ps-3 mt-3">
              <label className="mb-1 text-blue-700">Start-Date*</label>
              <input
                
                type="date"
                className="form-control shadow-none border rounded-0"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div className="col-4 ps-0 pe-3 mt-3">
              <br />
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="mt-1 px-4 btn bg-secondary mx-2 text-light d-flex align-items-center"
                  onClick={clearForm}
                >
                  <TbTrashX className="me-1 fs-5" />
                  <p className="m-0">Clear</p>
                </button>

                <button
                  type="submit"
                  className="mt-1 px-4 btn bg-blue-700 text-light d-flex align-items-center"
                >
                {isLoading ? (
                    <div className="spinner-border text-light spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>
                     <FiPlusCircle className="me-1 fw-bolder fs-5" />
                     <p className="m-0">Register</p>
                    </>
                  )}
                  
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* TableStudent */}
      <div className="row mt-3">
        <div className="col-12">
          <TableStudent />
        </div>
      </div>
    </div>
  );
}

export default Student;
