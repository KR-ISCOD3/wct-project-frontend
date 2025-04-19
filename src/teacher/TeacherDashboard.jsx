import React from 'react'
import { HiTrendingDown } from 'react-icons/hi'
import { IoHome, IoPeople } from 'react-icons/io5'
import { SiProgress } from 'react-icons/si'
import TeacherClass from '../components/TeacherClass'

function TeacherDashboard() {
  return (

      <div className='p-3 font-poppins'>
          <div className="animate__animated animate__fadeIn animate__faster">
            <h2>Dashboard Overview</h2>
            <p className="text-secondary">Welcome back to the school management system</p>
          </div>
          <div className="row border-bottom  pb-3">
            <div className="col-3 animate__animated animate__fadeIn animate__faster">
              <div className="d-flex align-items-center p-3 border rounded-2">
                <div className="col-7 ">
                  <p className="m-0 text-secondary">Total Students</p>
                  <h4 className="my-2">1,202</h4>
                  <p className="m-0 text-success">Your students</p>
                </div>
                <div className="col-5 text-end">
                  <IoPeople className="fs-1 p-1 rounded-1 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="col-3 animate__animated animate__fadeIn animate__faster">
              <div className=" d-flex align-items-center p-3 border rounded-2">
                <div className="col-7 ">
                  <p className="m-0 text-secondary">Classes</p>
                  <h4 className="my-2">89</h4>
                  <p className="m-0 text-warning">All Classes</p>
                </div>
                <div className="col-5 text-end">
                  <IoHome className="fs-1 p-1 rounded-1 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="col-3 animate__animated animate__fadeIn animate__faster">
              <div className=" d-flex align-items-center p-3 border rounded-2">
                <div className="col-7">
                  <p className="m-0 text-secondary">Progress Classes</p>
                  <h4 className="my-2">4</h4>
                  <p className="m-0 text-primary">Progress </p>
                </div>
                <div className="col-5 text-end">
                  <SiProgress className="fs-1 p-1 rounded-1 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="col-3 animate__animated animate__fadeIn animate__faster">
              <div className=" d-flex align-items-center p-3 border rounded-2">
                <div className="col-7 ">
                  <p className="m-0 text-secondary">Pre End</p>
                  <h4 className="my-2">3</h4>
                  <p className="m-0 text-success">Class pre-end</p>
                </div>
                <div className="col-5 text-end">
                  <HiTrendingDown className="fs-1 p-1 rounded-1 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
          <TeacherClass/>
 
      </div>

  )
}

export default TeacherDashboard
