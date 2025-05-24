import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
// import { Modal } from 'bootstrap';
import { useDispatch } from 'react-redux';
import { getStudents, updateStudents } from '../features/admin/studentSlice';
// import EditStuRegisterModal from '../modal/EditStuRegisterModal';

function EditStuRegisterModal({
    selectedStudent,
    form,
    setForm,
    selectedCourseId,
    setSelectedCourseId,
    customCourseName,
    setCustomCourseName,
    loading,
    courses,
    genders
  })  {
    const modalRef = useRef(null)
    const dispatch = useDispatch()
    const handleUpdate = (studentId) => {
        const courseIdToSend = selectedCourseId > 0 ? Number(selectedCourseId) : null;
        const customCourseToSend = customCourseName.trim() !== "" ? customCourseName : "";

        const updatedStudentData = {
            student_id: studentId,
            student_name: form.student_name,
            gender_id: Number(form.gender_id),
            course_id: courseIdToSend,
            custom_course: customCourseToSend,
            price: Number(form.price),
            document_fee: Number(form.doc_fee),
            payment_method: form.payment_method,
            startdate: form.startdate,
        };

        dispatch(updateStudents({ id: studentId, updatedData: updatedStudentData }))
        .then(() => {
            dispatch(getStudents());
            if (modalRef.current) {
                modalRef.current.click();
            }
            toast.success('Update Success!', {
                position: "top-right",
                autoClose: 2000,  // Auto close after 2 seconds
                hideProgressBar: false,
                closeOnClick: false,  // Disable closing when clicking
                pauseOnHover: true,
                draggable: false,  // Disable dragging
                progress: undefined,
                theme: "light",
            });
        })
        .catch((error) => {
            console.error('Update failed:', error);
        });
    };
  return (
    <div>
        <div className="modal fade" id="edit" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3 ">
                    <div className="modal-header px-0 mb-2">
                     <h5 className="m-0">Edit Student</h5>
                    </div>
                    {selectedStudent ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(selectedStudent.id);
                    }}>
                        <div className="mb-2">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control shadow-none border rounded-0"
                            value={form.student_name}
                            onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                        />
                        </div>

                        <div className="mb-2">
                        <label className="form-label">Course</label>
                        <select
                            className="form-select shadow-none border rounded-0"
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                        >
                            <option value={0}>Select Course</option>
                            {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                            ))}
                            <option value={-1}>Custom Course</option>
                        </select>

                        {selectedCourseId === -1 && (
                            <input
                            type="text"
                            className="form-control shadow-none border rounded-0 mt-2"
                            placeholder="Enter custom course name"
                            value={customCourseName}
                            onChange={(e) => setCustomCourseName(e.target.value)}
                            />
                        )}
                        </div>

                        <div className="mb-2">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select shadow-none border rounded-0"
                            value={form.gender_id}
                            onChange={(e) => setForm({ ...form, gender_id: e.target.value })}
                        >
                            {genders.map((gender) => (
                            <option key={gender.id} value={gender.id}>{gender.label}</option>
                            ))}
                        </select>
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Payment Method</label>
                            <select
                                className="form-select shadow-none border rounded-0"
                                value={form.payment_method}
                                onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                                >
                                <option value="" disabled>Select Payment Method</option>
                                <option value="Cashing">Cashing</option>
                                <option value="Online-Payment">Online-Payment</option>
                                <option value="QR-Payment">QR-Payment</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control shadow-none border rounded-0"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Document_fee</label>
                            <input
                                type="number"
                                className="form-control shadow-none border rounded-0"
                                value={form.doc_fee}
                                onChange={(e) => setForm({ ...form, doc_fee: e.target.value })}
                            />
                        </div>

                        <div className="mb-2">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control shadow-none border rounded-0"
                            value={form.startdate}
                            onChange={(e) => setForm({ ...form, startdate: e.target.value })}
                        />
                        </div>
                        <div className='modal-footer'>
                        <button  className="btn btn-secondary  mt-3" type='button' data-bs-dismiss="modal" ref={modalRef}>
                            Close
                        </button>
                        <button className="btn btn-primary mt-3" type="submit">
                            {loading ? "Loading...":"Update"}
                        </button>
                        </div>
                    </form>
                    ) : (
                        <p>Loading student data...</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditStuRegisterModal
