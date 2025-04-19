import React from 'react';
import { FcBarChart } from "react-icons/fc";
import { IoFileTrayFullSharp, IoFilter, IoSearch } from "react-icons/io5";
import { BiSolidExit } from "react-icons/bi";
import { MdHourglassTop } from "react-icons/md";
import ClassTable from '../components/ClassTable';

function Classes() {
 

  return (
    <div className='container-fluid p-3 font-poppins animate__animated animate__fadeIn animate__faster'>
        <div className='p-0'>
            {/* title */}
            <div>
              <h2>Classes Overviews</h2> 
              <p className='text-secondary'>Take a look at the classes available for students in your school.</p>
            </div>

            {/* card overviews */}
            <div className="row ">
                <div className="col-3">
                  <div className="d-flex align-items-center p-3 border rounded-2">
                    <div className='col-2  border-end me-3 border-success border-2'>
                      <IoFileTrayFullSharp className='fs-1 me-3 text-success'/>
                    </div>
                    <div className='col-8 '>
                      <p className='m-0 text-secondary'>Total Classes</p>
                      <p className='m-0 fs-5 text-success'>120</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-3">
                  <div className="d-flex align-items-center p-3 border rounded-2">
                    <div className='col-2 border-end me-3 border-info border-2'>
                      <FcBarChart className='fs-1 me-3'/>
                    </div>
                    <div className='col-8'>
                      <p className='m-0 text-secondary'>Progress Classes</p>
                      <p className='m-0 fs-5 text-info'>30</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex align-items-center p-3 border rounded-2">
                    <div className='col-2 border-end me-3 border-secondary border-2'>
                      <BiSolidExit className='fs-1 me-3 text-secondary'/>
                    </div>
                    <div className='col-8'>
                      <p className='m-0 text-secondary'>Pre End</p>
                      <p className='m-0 fs-5 text-secondary'>30</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex align-items-center p-3 border rounded-2">
                    <div className='col-2 border-end me-3 border-danger border-2'>
                      <MdHourglassTop className='fs-1 me-3 text-danger'/>
                    </div>
                    <div className='col-8'>
                      <p className='m-0 text-secondary'>End Classes</p>
                      <p className='m-0 fs-5 text-danger'>30</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* button */}
            <div className='py-3 d-flex justify-content-between'>
                <form action="">
                  <div className='d-flex'>
                    <select name="" id="" className='form-select rounded-0 shadow-none border'>
                    
                    <option value="">C++, Algorithm, OPP</option>
                    <option value="">Web-Design + React</option>
                    
                    </select>
                    <select name="" id="" className='form-select shadow-none rounded-0 border ms-2'>
                      <option className='text-success'>All Classes</option>
                      <option className='text-primary'>Classes Closed</option>
                      <option className='text-info'>Progress Classes</option>
                      <option className='text-secondary'>Pre-End Classes</option>
                      <option className='text-danger'>End Classes</option>
                    </select>
                    <select name="" id="" className='form-select shadow-none rounded-0 border ms-2'>
                      <option className='' disabled>(Mon-Thu)</option>
                      <option value="">09:00 - 10:30 am</option>
                      <option value="">11:00 - 12:15 am</option>
                      <option value="">12:30 - 01:45 pm</option>
                      <option value="">02:00 - 03:15 pm</option>
                    </select>     
                    <button className='btn bg-blue-700 text-light rounded-0  d-flex align-items-center ms-2'>
                      <IoSearch className='me-2'/>
                      Find
                    </button>        
                  </div>
                  
                </form>
              <div className='ms-2'>
                <form action="" className='d-flex'>
                  <div className='d-flex align-items-center mx-2'>
                    <label htmlFor="" className='mx-1 text-primary col-4'>Date Start:</label>
                    <input type="date" name="" id="" className='form-control shadow-0 rounded-0'/>
                  </div>
                  <div className='d-flex align-items-center pe-4'>
                    <label htmlFor="" className='mx-1 text-danger col-4'>Date End:</label>
                    <input type="date" name="" id="" className='form-control shadow-0 rounded-0'/>
                  </div>
                  <button className='btn bg-blue-700 text-light rounded-0  d-flex align-items-center'>
                    <IoFilter className='me-2'/>
                    Filter
                  </button>
                </form>
               

              </div>
            </div>
        </div>

        {/* table */}
        <ClassTable/>
    </div>
  );
}

export default Classes;
