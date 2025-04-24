import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { TbTrashX } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import { fetchCourses, addCourse, updateCourse,deleteCourse } from "../features/admin/courseSlice"; // Adjust the path if necessary
import Select from "react-select";

const options = [
  { value: "programming", label: "Programming" },
  { value: "networking", label: "Network" },
  { value: "design", label: "Design" },
  { value: "office", label: "Computer Office" },
];

function Course() {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [deleteCourseData, setDeleteCourseData] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [editName, setEditName] = useState(""); // Edit course name
  const [editOptions, setEditOptions] = useState([]); // Edit selected categories
  const [editCourseData, setEditCourseData] = useState(null); // Course data for editing

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleCategoryChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();

    const selectedCategories = selectedOptions.map((opt) => opt.value);

    const newCourse = {
      name: courseName,
      category: selectedCategories,
    };

    setIsLoading(true);

    dispatch(addCourse(newCourse))
      .then(() => {
        dispatch(fetchCourses());
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
      .catch((error) => {
        console.error("Error adding course:", error);
      })
      .finally(() => {
        // Reset the loading state after the request is finished
        setIsLoading(false);
      });
      
    setCourseName("");
    setSelectedOptions([]);
  };

  const openEditModal = (course) => {
    setEditCourseData(course);
    setEditName(course.name);
    setEditOptions(course.category.map((cat) => ({ value: cat, label: cat })));
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    const selectedCategories = editOptions.map(opt => opt.value);

    setIsUpdating(true);

    const updatedCourse = {
      name: editName,
      category: selectedCategories,
    };
  
    dispatch(updateCourse({ id: editCourseData.id, course: updatedCourse }))
      .then(() => {
        const modal = document.getElementById('editCourseModal');
        if (modal) {
          modal.classList.remove('show');
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
        dispatch(fetchCourses());
        toast.success('Update Success!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditCourseData(null);
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      })
      .finally(()=>{
        setIsUpdating(false);
      });
  };

  const handleDeleteCourse = () => {
    if (!deleteCourseData) return;

    setIsDelete(true)
    dispatch(deleteCourse(deleteCourseData.id))
      .then(() => {
        const modal = document.getElementById('deleteCourseModal');
        if (modal) {
          modal.classList.remove('show');
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }
        dispatch(fetchCourses());
        toast.success('Delete Success!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setDeleteCourseData(null);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      })
      .finally(()=>{
        setIsDelete(false)
      });
  };

  
  
  return (
    <>
      <div className="p-3 font-poppins animate__animated animate__fadeIn animate__faster">
        <ToastContainer/>
        <div className="d-flex">
          <form onSubmit={handleAddCourse} className="w-100 pb-3 border-bottom">
            <h2>Course-Form</h2>
            <p className="text-secondary">
              Expand your knowledge and unlock new opportunities. Add a new course and start learning today!
            </p>
            <div className="row m-0">
              <div className="col-4 ps-0 pe-3">
                <label htmlFor="courseName" className="mb-1 text-blue-700">
                  Course-Name*
                </label>
                <input
                  required
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={handleCourseNameChange}
                  placeholder="Enter Course-Name"
                  className={`form-control shadow-none border rounded-0`}
                />
                {/* {courseNameError && <span className="text-danger">Please field the form.</span>} */}
              </div>
              <div className="col-4 ps-0 pe-3">
                <label htmlFor="courseCategory" className="mb-1 text-blue-700">
                  Course-Categories*
                </label>
                <Select
                  required
                  className={`w-100 rounded-0`}
                  options={options}
                  isMulti
                  value={selectedOptions}
                  onChange={handleCategoryChange}
                  placeholder="Select categories"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '0', // Set border-radius to 0
                    }),
                   
                  }}
                />

              </div>
              <div className="col-4 ps-0 pe-3 mt-0">
                <br />
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="mt-1 px-4 btn bg-secondary mx-2 text-light d-flex align-items-center"
                    onClick={() => {
                      setCourseName("");
                      setSelectedOptions([]);
                    }}
                  >
                    <TbTrashX className="me-1 fs-5" />
                    <p className="m-0">Reset</p>
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
                        <p className="m-0">Add-Course</p>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="row mt-3">
          <div className="col-12">
            <table className="table table-bordered text-center">
              <thead className="bg-blue-700 text-light">
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. Render course rows if any */}
                {Array.isArray(courses) && courses.length > 0 &&
                  courses.filter(course => course && course.status === 'enabled').map(course => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.name}</td>
                      <td>
                        {Array.isArray(course.category)
                          ? course.category.join(", ")
                          : course.category}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => setDeleteCourseData(course)}
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCourseModal"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => openEditModal(course)}
                          className="btn bg-blue-700 text-light btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#editCourseModal"
                          type="button"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                ))}



                {/* 2. If loading, show placeholder row below */}
                {loading && (
                  <tr className="placeholder-glow">
                    <td>
                      <span className="placeholder placeholder-lg col-3"></span>
                    </td>
                    <td>
                      <span className="placeholder placeholder-lg col-5"></span>
                    </td>
                    <td>
                      <span className="placeholder placeholder-lg col-2"></span>
                    </td>
                    <td>
                      <span className="placeholder placeholder-lg col-2 me-2"></span>
                      <span className="placeholder placeholder-lg col-2"></span>
                    </td>
                  </tr>
                )}

                {/* 3. If not loading and no courses, show “No courses available” */}
                {!loading && Array.isArray(courses) && courses.length === 0 && (
                  <tr>
                    <td colSpan="4">No courses available</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* Edit Course Modal */}
      <div className="modal fade font-poppins" id="editCourseModal" tabIndex="-1" aria-labelledby="editCourseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editCourseModalLabel">Edit Course</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {editCourseData && (
                <form onSubmit={handleUpdateCourse}>
                  <div className="mb-3">
                    <label htmlFor="editCourseName" className="form-label">Course Name</label>
                    <input
                      required
                      type="text"
                      id="editCourseName"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="form-control shadow-none rounded-0 border"
                      placeholder="Enter Course Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editCourseCategory" className="form-label">Categories</label>
                    <Select
                      required
                      options={options}
                      isMulti
                      value={editOptions}
                      onChange={setEditOptions}
                      placeholder="Select categories"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: '0', // Set border-radius to 0
      
                        }),
                       
                      }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-blue-700 text-light">
                    {isUpdating ? (
                      <div className="spinner-border text-light spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <p className="m-0">Save Changes</p>
                      </>
                    )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

            {/* Delete Course Modal */}
      <div className="modal fade font-poppins" id="deleteCourseModal" tabIndex="-1" aria-labelledby="deleteCourseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteCourseModalLabel">Confirm Delete</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {deleteCourseData && (
                <p>Are you sure you want to delete <strong>{deleteCourseData.name}</strong>?</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteCourse}
              >
                {isDelete ? (
                      <div className="spinner-border text-light spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <p className="m-0">Yes Delete</p>
                      </>
                    )}
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Course;
