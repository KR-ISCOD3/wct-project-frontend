import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { TbTrashX } from "react-icons/tb";

const courses = [
  { id: 1, name: "ReactJS", category: "Programming" },
  { id: 2, name: "PHP+Laravel", category: "Programming" },
  { id: 3, name: "Node.js", category: "Programming" },
  { id: 4, name: "Python", category: "Programming" },
  { id: 5, name: "Java", category: "Programming" },
  { id: 6, name: "C++", category: "Programming" },
  { id: 7, name: "Cyber Security", category: "Network" },
  { id: 8, name: "Linux Administration", category: "Network" },
  { id: 9, name: "CCNA", category: "Network" },
  { id: 10, name: "Computer Networking", category: "Network" },
  { id: 11, name: "UI/UX Design", category: "Graphic Design" },
  { id: 12, name: "Adobe Photoshop", category: "Graphic Design" },
  { id: 13, name: "Adobe Illustrator", category: "Graphic Design" },
  { id: 14, name: "Video Editing", category: "Graphic Design" },
  { id: 15, name: "Microsoft Office", category: "Computer Office" },
  { id: 16, name: "Excel Advanced", category: "Computer Office" },
  { id: 17, name: "Word Processing", category: "Computer Office" },
  { id: 18, name: "PowerPoint Presentations", category: "Computer Office" },
  { id: 19, name: "Data Analysis", category: "Computer Office" },
  { id: 20, name: "Database Management", category: "Programming" }
];

function Course() {
  return (
    <div className="p-3 font-poppins">
      <div className="d-flex">
        <form action="" className="w-100 pb-3 border-bottom">
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
                type="text"
                id="courseName"
                placeholder="Enter Course-Name"
                className="form-control shadow-none border rounded-0"
              />
            </div>
            <div className="col-4 ps-0 pe-3">
              <label htmlFor="courseCategory" className="mb-1 text-blue-700">
                Course-Categories*
              </label>
              <select
                id="courseCategory"
                className="form-select shadow-none border rounded-0"
              >
                <option value="" disabled>Select Course</option>
                <option value="Programming">Programming</option>
                <option value="Network">Network</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Computer Office">Computer Office</option>
              </select>
            </div>

            <div className="col-4 ps-0 pe-3 mt-0">
              <br />
              <div className="d-flex">
                <button className="mt-1 px-4 btn bg-secondary mx-2 text-light d-flex align-items-center">
                  <TbTrashX className="me-1 fs-5" />
                  <p className="m-0">Reset</p>
                </button>
                <button className="mt-1 px-4 btn bg-blue-700 text-light d-flex align-items-center">
                  <FiPlusCircle className="me-1 fw-bolder fs-5" />
                  <p className="m-0">Add-Course</p>
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
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.category}</td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2">Delete</button>
                    <button className="btn bg-blue-700 text-light btn-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Course;
