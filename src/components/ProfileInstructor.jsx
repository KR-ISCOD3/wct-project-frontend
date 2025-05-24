import React from 'react'
import { IoCall } from 'react-icons/io5'
import { PiGenderMale } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

function ProfileInstructor({ instructor }) {
  if (!instructor) {
    // Skeleton placeholder
    return (
      <div className='d-flex align-items-center justify-content-between'>
        <div className="col-2">
          <div style={{ width: 230, height: 320 }} className='bg-secondary-subtle rounded-2 border'></div>
        </div>
        <div className='col-7'>
          <div className="placeholder-glow mb-2">
            <h3 className="placeholder col-6"></h3>
          </div>
          <div className="d-flex align-items-center mb-2 placeholder-glow">
            <span className="placeholder col-3 me-2"></span>
            <span className="placeholder col-5"></span>
          </div>
          <p className="placeholder-glow">
            <span className="placeholder col-8"></span>
          </p>
          <div className="placeholder-glow mb-2">
            <span className="placeholder col-4 py-2 rounded-2 d-inline-block"></span>
          </div>
          <div className="placeholder-glow mb-2 d-flex">
            <span className="placeholder col-3 me-2"></span>
            <span className="placeholder col-5"></span>
          </div>
          <div className="placeholder-glow d-flex">
            <span className="placeholder col-2 me-2"></span>
            <span className="placeholder col-4"></span>
          </div>
          <div className="placeholder-glow mt-3">
            <span className="placeholder col-3 py-2 rounded-2 d-inline-block"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div className="col-2">
        <div style={{ width: 230, height: 320 }} className='bg-secondary-subtle rounded-2 overflow-hidden border'>
          <img src={instructor.image || "./image/placeholder.png"} alt="" className='w-100 h-100 object-fit-cover' />
        </div>
      </div>
      <div className='col-7'>
        <h3 className='fw-bold'>{instructor.name}</h3>
        <div className='d-flex align-items-center mb-2'>
          <PiGenderMale className='text-primary' />
          <span className='text-secondary me-2'>{instructor.gender.gender}</span>
          <span><IoCall /> +855 96 777 213</span>
        </div>
        <p>Email: <NavLink to="">{instructor.email}</NavLink></p>
        <span className='fs-5 bg-secondary-subtle px-3 rounded-2 text-secondary'>
          {instructor.position}
        </span>
        <div className="my-3">
          <div className='me-3 d-flex'>
            <p className='text-secondary m-0 me-2'>Work Status:</p>
            <p className='m-0'>{instructor.work_status}</p>
          </div>
          <div className='d-flex'>
            <p className='text-secondary m-0 me-2'>Shift: </p>
            <p className='m-0'>{instructor.shift}</p>
          </div>
        </div>
        <span
          className={`px-2 rounded-2 ${
            instructor.status.toLowerCase() === 'available'
              ? 'bg-primary-subtle text-primary'
              : 'bg-danger-subtle text-danger'
          }`}
        >
          {instructor.status}
        </span>
      </div>
    </div>
  );
}

export default ProfileInstructor;
