import React from 'react'
import { IoCall } from 'react-icons/io5';
import { PiGenderMaleFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

function AccountTeacher() {
  return (
    <div className='container-fluid p-3 font-poppins'>
      <div className='col-5 border-end'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className="col-2" >
            <div style={{width:230,height:320}} className='bg-secondary rounded-2 overflow-hidden border'>
              <img src="./image/placeholder.png" alt="" className='w-100 h-100 object-fit-cover'/>
            </div>
          </div>
          <div className='col-7'>
              <h3 className='fw-bold'>Kung Norasmey</h3>
              <div className='d-flex align-items-center mb-2'>
                <PiGenderMaleFill className='text-primary'/> 
                <span className='text-secondary me-2'>Male</span>
                <span><IoCall/>+855 96 777 213</span>   
              </div>
              <p >Email: <NavLink href="" tabIndex={-1}>vannda@gmail.com</NavLink></p>
              <span className='fs-5 bg-secondary-subtle px-3 rounded-2 text-secondary'>
                Web-Developer
              </span>
              <div className="my-3 ">
                <div className='me-3 d-flex '>
                  <p className='text-secondary m-0 me-2'>Work Status:</p>
                  <p className='m-0'>Full-Time</p>
                </div>
                <div className='d-flex '>
                  <p className='text-secondary m-0 me-2'>Shift: </p>
                  <p className='m-0'>Morning</p>
                </div>
              </div>
              <span className='px-2 bg-danger-subtle text-danger rounded-2'>Unavailable</span>
              {/* <span className='px-2 bg-primary-subtle text-primary rounded-2'>Available</span> */}
          </div>
        </div>
        <div className='border mt-3 p-3 rounded-2 me-4'>
            <h4 className='border-bottom pb-2 text-secondary'>Class Overviews</h4>
            <div className='d-flex '>
              <div className='col-6 d-flex align-items-center fs-5 my-3  border-start border-primary border-2 ps-2 '>
                <span className='text-secondary '>Progress Class: <span className='text-dark'>40</span></span>
              </div>
              <div className='col-6 d-flex align-items-center fs-5 my-3  border-start border-secondary border-2 ps-2'>
                <span className='text-secondary '>Class Closed: <span className='text-dark'>10</span></span>
              </div>
            </div>
            <div className='d-flex border-top'>
              <div className='col-6 d-flex align-items-center fs-5 my-3  border-start border-warning border-2 ps-2 '>
                <span className='text-secondary '>Pre-End Class: <span className='text-dark'>40</span></span>
              </div>
              <div className='col-6 d-flex align-items-center fs-5 my-3  border-start border-secondary border-2 ps-2'>
                <span className='text-secondary '>Class Closed: <span className='text-dark'>10</span></span>
              </div>
            </div>
            <div className='d-flex align-items-center fs-5 border-top pt-2'>
              <span className='text-secondary '>Total Class: <span className='text-blue-700 fw-bold'>40</span></span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AccountTeacher
