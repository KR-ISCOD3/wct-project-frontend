import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoCall, IoEye, IoMail} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

function Teacher() {
  // Sample data for the cards (you can replace this with dynamic data)
  const instructors = [
    { name: "Chea Senghour", email: "erikson@gmial.etec.com", phone: "+855 96 777 212", status: "Available", shift: "Morning", workStatus: "Part-Time" },
    { name: "John Doe", email: "johndoe@gmial.etec.com", phone: "+855 96 777 213", status: "Unavailable", shift: "Evening", workStatus: "Full-Time" },
    { name: "Jane Smith", email: "janesmith@gmial.etec.com", phone: "+855 96 777 214", status: "Available", shift: "Morning", workStatus: "Part-Time" },
    { name: "Michael Brown", email: "michaelbrown@gmial.etec.com", phone: "+855 96 777 215", status: "Unavailable", shift: "Afternoon", workStatus: "Full-Time" },
    { name: "Sarah Lee", email: "sarahlee@gmial.etec.com", phone: "+855 96 777 216", status: "Available", shift: "Morning", workStatus: "Part-Time" },
    { name: "David Clark", email: "davidclark@gmial.etec.com", phone: "+855 96 777 217", status: "Available", shift: "Evening", workStatus: "Full-Time" },
    { name: "Alice Green", email: "alicegreen@gmial.etec.com", phone: "+855 96 777 218", status: "Unavailable", shift: "Afternoon", workStatus: "Part-Time" },
    { name: "Robert King", email: "robertk@gmial.etec.com", phone: "+855 96 777 219", status: "Available", shift: "Morning", workStatus: "Full-Time" },
    { name: "Maria Gonzalez", email: "mariagonzalez@gmial.etec.com", phone: "+855 96 777 220", status: "Unavailable", shift: "Evening", workStatus: "Part-Time" },
    { name: "Thomas White", email: "thomaswhite@gmial.etec.com", phone: "+855 96 777 221", status: "Available", shift: "Morning", workStatus: "Full-Time" }
  ];

  return (
    <div className='p-3 font-poppins animate__animated animate__fadeIn animate__faster'>
      <div>
        <h2>Instructor</h2>
        <p className='text-secondary mb-0'>Find the right instructor for your course.</p>
      </div>

      <div className=' rounded-0 border-bottom py-3 mb-3 mt-2'>
          <div className='d-flex align-items-center mb-4'>
            <div className='me-2'>
              <select name="" id="" className='form-select shadow-none rounded-2 border'>
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-start'>
            <p className='m-0 border-start border-primary border-2 ps-4 col-2 text-secondary'><span className='fs-4 text-primary'>10</span> Available</p>
            <p className='m-0 border-start border-danger border-2 ps-4 col-2 text-secondary'><span className='fs-4 text-danger'>15</span> Unavailable</p>
            <p className='m-0 border-start border-warning border-2 ps-4 col-2 text-secondary'><span className='fs-4 text-warning'>5</span> Morning Shift</p>
            <p className='m-0 border-start border-info border-2 ps-4 col-2 text-secondary'><span className='fs-4 text-info'>6</span> Afternoon Shift</p>
            <p className='m-0 border-start border-dark border-2 ps-4 col-2 text-secondary'><span className='fs-4 text-dark'>3</span> Part-time</p>
            <p className='m-0 border-start border-success border-2 ps-4 col-2 text-secondary'><span className='fs-4 text-success'>3</span> Full-time</p>
          </div>
      </div>

     
      <div className="row m-0 my-3">
        {instructors.map((instructor, index) => (
          <div key={index} className="col-3 my-2 ps-0">
            <div className="card border p-4 shadow">

              {/* ------------ User Account ------------- */}
              <div className='d-flex justify-content-between font-poppins'>
                <div>
                  <div style={{ width: 75, height: 75 }} className='rounded-circle bg-success overflow-hidden'>
                    <img src="" alt="" className='w-100 h-100 object-fit-cover' />
                  </div>
                  <p className='m-0 fs-5'>{instructor.name}</p>
                  <span className={`px-3 ${instructor.status === "Unavailable" ? "bg-danger-subtle text-danger" : "bg-primary-subtle"} text-primary rounded-2`}>{instructor.status}</span>
                </div>
                <div className="dropdown">
                  <a className="btn border-0 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsThreeDots />
                  </a>

                  <ul className="dropdown-menu px-2">
                    <NavLink className="nav-link p-2" to="/account">
                      <li className='d-flex align-items-center'>
                        <IoEye className='fs-5 me-2' />
                        View Profile
                      </li>
                    </NavLink>
                    <NavLink className="nav-link p-2" href="#">
                      <li className='d-flex align-items-center'>
                        <FaTrash className='fs-5 me-2' />
                        Delete
                      </li>
                    </NavLink>
                    <NavLink className="nav-link p-2" href="#">
                      <li className='d-flex align-items-center'>
                        <FaEdit className='fs-5 me-2' />
                        Edit
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </div>

              <div className='d-flex justify-content-between mt-4'>
                <div>
                  <p className='m-0 text-secondary'>Day-Shift</p>
                  <p className='m-0'>{instructor.shift}</p>
                </div>
                <div>
                  <p className='m-0 text-secondary'>Work-Status</p>
                  <p className='m-0'>{instructor.workStatus}</p>
                </div>
              </div>

              <div className='mt-3'>
                <div className='mb-2'>
                  <IoMail className='me-2 fs-3' />
                  <span>{instructor.email}</span>
                </div>
                <div className='mb-2'>
                  <IoCall className='me-2 fs-3' />
                  <span>{instructor.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teacher;
