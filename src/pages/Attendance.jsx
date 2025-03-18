import React from 'react'
import {BiTransfer } from 'react-icons/bi'
import { FaPen, FaTrash } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { IoEye, IoMale,IoFemale } from 'react-icons/io5'
import { PiExport } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

function Attendance() {
  return (
    <div className='container-fluid p-3 font-poppins animate__animated animate__fadeIn animate__faster'>
      <h2 className='mb-2'>Instructor's Name: Kung Norasmey</h2>
      <div className="row mb-3">
        <div className="col-3">
          <div className="card d-flex p-2 px-3">
            <div>
              <p className='mb-2 text-secondary border-bottom'>Course</p>
              <p className='m-0 fs-5'>Web-Design + React</p>
            </div>
            <div>       
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="card d-flex p-2 px-3">
            <div>
              <p className='mb-2 text-secondary border-bottom'>Total Student</p>
              <div className='d-flex align-items-center justify-content-between'>
                <p className='m-0 fs-5'>12 Students</p>
                <span className='px-2 bg-primary-subtle rounded-2 text-primary'>Close</span>
              </div>
            </div>
            <div>       
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="card d-flex p-2 px-3">
            <div>
              <p className='mb-2 text-secondary border-bottom'>Location / Room</p>
              <p className='m-0 fs-5'>
                ETEC 1 (E102)
              </p>
            </div>
            <div>       
            </div>
          </div>
        </div>

        

        <div className="col-3">
          <div className="card d-flex p-2 px-3">
            <div>
              <p className='mb-2 text-secondary border-bottom'>Status</p>
              <p className='m-0 fs-5'>Physical</p>
            </div>
            <div>       
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center border-top py-3 font-poppins"> 
        <p className="m-0 fs-5 col-7 ">Attendance-Table</p>
        <button className="btn bg-success-subtle text-success d-flex align-items-center">
          <PiExport className="me-2 fs-5"/>
          Export Excel
        </button>
      </div>
      <div style={{ maxHeight: "600px", overflowY: "auto",overflowX:"auto" }} className='scrollable-container '>
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
            {[
              { name: "Kak Kada", gender: "male", phone: "093 999 222", present: 20, permission: 20, absent: 20, total: 40, score: 30, final: 70 },
              { name: "Sok Dara", gender: "male", phone: "098 777 111", present: 18, permission: 15, absent: 25, total: 33, score: 28, final: 61 },
              { name: "Ly Sreyneang", gender: "female", phone: "089 123 456", present: 22, permission: 18, absent: 10, total: 40, score: 35, final: 75 },
              { name: "Chan Vannak", gender: "male", phone: "087 654 321", present: 25, permission: 10, absent: 5, total: 35, score: 40, final: 75 },
              { name: "Ngin Sopha", gender: "female", phone: "015 999 888", present: 19, permission: 12, absent: 29, total: 31, score: 20, final: 51 },
              { name: "Chea Rith", gender: "male", phone: "092 555 333", present: 23, permission: 14, absent: 13, total: 37, score: 33, final: 70 },
              { name: "Pov Kimsan", gender: "male", phone: "011 222 333", present: 20, permission: 20, absent: 10, total: 40, score: 38, final: 78 },
              { name: "Mouy Linda", gender: "female", phone: "097 111 222", present: 21, permission: 17, absent: 12, total: 38, score: 30, final: 68 },
              { name: "Heng Visal", gender: "male", phone: "096 888 999", present: 22, permission: 15, absent: 13, total: 37, score: 32, final: 69 },
              { name: "Long Bopha", gender: "female", phone: "013 444 555", present: 19, permission: 18, absent: 13, total: 37, score: 31, final: 68 },
              { name: "Som Ratha", gender: "male", phone: "067 777 888", present: 24, permission: 12, absent: 8, total: 36, score: 35, final: 71 },
              { name: "Kim Sokha", gender: "female", phone: "085 666 777", present: 20, permission: 14, absent: 16, total: 34, score: 30, final: 64 },
            ].map((student, index) => (
              <tr key={index} className='align-middle'>
                <td><p className='m-0 fs-5 pe-4'>{student.name}</p></td>
                <td>
                  <p className={`m-0 d-flex align-items-center ${student.gender === "male" ? "text-primary" : "text-danger"}`}>
                    {student.gender === "male" ? <IoMale /> : <IoFemale />}
                    {student.gender}
                  </p>
                </td>
                <td>{student.phone}</td>
                <td><p className='mb-0 me-4'>Present: <span className='text-success fw-medium'>{student.present} pt</span></p></td>
                <td><p className='mb-0 me-4'>Permission: <span className='text-warning fw-medium'>{student.permission} pt</span></p></td>
                <td><p className='mb-0'>Total: <span className='text-info fw-medium'>{student.total} pt</span></p></td>
                <td><p className='mb-0 me-4'>Absent: <span className='text-danger fw-medium'>{student.absent}</span></p></td>
                <td><span className='text-primary fw-medium'>{student.score} pt</span></td>
                <td><span className='text-blue-700 fw-medium'>{student.final} pt</span> <span className='text-primary bg-primary-subtle px-2 rounded-2'>Pass</span></td>
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
                        <NavLink className="nav-link p-2 px-3 d-flex align-items-center text-blue-600" to="#">
                          <FaPen className='fs-5 me-2' />
                          Edit
                        </NavLink>
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
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default Attendance
