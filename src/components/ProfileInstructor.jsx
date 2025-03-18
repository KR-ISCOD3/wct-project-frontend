import React from 'react'
import { IoCall } from 'react-icons/io5'
import { PiGenderMale } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

function ProfileInstructor() {
  return (
    <div className='d-flex align-items-center justify-content-between'>
        <div className="col-2" >
            <div style={{width:230,height:320}} className='bg-secondary rounded-2 overflow-hidden border'>
                <img src="./image/placeholder.png" alt="" className='w-100 h-100 object-fit-cover'/>
            </div>
        </div>
        <div className='col-7'>
            <h3 className='fw-bold'>Kung Norasmey</h3>
            <div className='d-flex align-items-center mb-2'>
                <PiGenderMale className='text-primary'/> 
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
  )
}

export default ProfileInstructor
