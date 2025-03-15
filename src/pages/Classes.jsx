import React from 'react';
import { FcBarChart } from "react-icons/fc";
import { IoEye, IoFileTrayFullSharp, IoTrashBin } from "react-icons/io5";
import { BiSolidExit } from "react-icons/bi";
import { MdHourglassTop } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function Classes() {
  const tableData = [
    { teacher: "Sok Chan Vathana", course: "C++, OOP", chapter: "OOP", totalStudents: 30, building: "ETEC 1", room: "E102", status: "Progress" },
    { teacher: "Vannary Chea", course: "Web Development", chapter: "HTML & CSS", totalStudents: 25, building: "ETEC 2", room: "E201", status: "Pre-End" },
    { teacher: "Sok Vannak", course: "Java Programming", chapter: "OOP", totalStudents: 20, building: "ETEC 1", room: "E103", status: "End" },
    { teacher: "Chan Keo", course: "Python Programming", chapter: "Intro to Python", totalStudents: 35, building: "ETEC 3", room: "E301", status: "Progress" },
    { teacher: "Mao Vannak", course: "JavaScript Basics", chapter: "JS Functions", totalStudents: 40, building: "ETEC 1", room: "E104", status: "Pre-End" },
    { teacher: "Sina Sok", course: "PHP Development", chapter: "Basic PHP", totalStudents: 18, building: "ETEC 2", room: "E202", status: "Progress" },
    { teacher: "Ratha Chan", course: "Machine Learning", chapter: "Supervised Learning", totalStudents: 22, building: "ETEC 1", room: "E105", status: "End" },
    { teacher: "Vannary Sok", course: "ReactJS", chapter: "State & Props", totalStudents: 15, building: "ETEC 3", room: "E302", status: "Progress" },
    { teacher: "Vannak Cham", course: "Angular", chapter: "Directives", totalStudents: 30, building: "ETEC 2", room: "E203", status: "Pre-End" },
    { teacher: "Rathana Sok", course: "C++ Advanced", chapter: "Data Structures", totalStudents: 28, building: "ETEC 1", room: "E106", status: "End" },
    { teacher: "Sok Vathana", course: "Java Basics", chapter: "Arrays", totalStudents: 30, building: "ETEC 3", room: "E303", status: "Progress" },
    { teacher: "Sok Chan", course: "NodeJS", chapter: "API Development", totalStudents: 33, building: "ETEC 1", room: "E107", status: "Pre-End" },
    { teacher: "Vannary Sok", course: "VueJS", chapter: "Directives & Components", totalStudents: 40, building: "ETEC 3", room: "E304", status: "Progress" },
    { teacher: "Vannak Theng", course: "Swift Programming", chapter: "Intro to Swift", totalStudents: 12, building: "ETEC 1", room: "E108", status: "End" },
    { teacher: "Keo Ratha", course: "React Native", chapter: "Navigation & Views", totalStudents: 10, building: "ETEC 2", room: "E205", status: "Progress" }
  ];

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
              <div>
                <select name="" id="" className='form-select rounded-0 shadow-none border'>
                 
                  <option value="">C++, Algorithm, OPP</option>
                  <option value="">Web-Design + React</option>
               
                </select>
              </div>
              <div>
                <button className='btn rounded-0 mx-1 btn-outline-success'>All Classes</button>
                <button className='btn rounded-0 mx-1 btn-outline-primary'>Classes Closed</button>
                <button className='btn rounded-0 mx-1 btn-outline-info'>Progress Classes</button>
                <button className='btn rounded-0 mx-1 btn-outline-secondary'>Pre-End Classes</button>
                <button className='btn rounded-0 mx-1 btn-outline-danger'>End Classes</button>
              </div>
            </div>
        </div>

        {/* table */}
        <div style={{ maxHeight: '550px', overflowY: 'scroll' }} className='scrollable-container'>
          <table className='table '>
            <thead style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: 1 }}>
               <tr>
                <td className='text-secondary'>Instructors</td>
                <td className='text-secondary'>Class Course / Chapter</td>
                <td className='text-secondary'>Total-Student</td>
                <td className='text-secondary'>Building</td>
                <td className='text-secondary'>Room</td>
                <td className='text-secondary'>Class Status</td>
                <td className='text-secondary text-center'>Actions</td>
               </tr>
            </thead>
            {/* Teacher row data */}
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index} className='align-middle'>
                  <td className='fw-medium d-flex align-items-center'>
                    <div style={{width:80,height:80}} title='Problem with student' className='me-2 rounded-2 overflow-hidden border border-danger border-3'>
                      <img src="./image/placeholder.png" alt="" className='w-100 h-100 object-fit-cover'/>
                    </div>
                    <div>
                    <p to="" className="text-dark m-0" title='Click to view account' >{data.teacher}</p>
                    <NavLink to="/account" title='Click to view account' >
                      View Account
                    </NavLink>
                    </div>
                  </td>
                  <td >
                    <p className='text-blue-700 m-0'>Coures  : {data.course}</p>
                    <p className='m-0'>Chapter : {data.chapter}</p>
                  </td>
                  <td>{data.totalStudents}</td>
                  <td className='text-primary'>{data.building}</td>
                  <td className='text-blue-700'>{data.room}</td>
                  <td>
                    <span className={`text-${data.status === "Progress" ? 'info' : data.status === "Pre-End" ? 'secondary' : 'danger'} ${data.status === "Progress" ? 'bg-info-subtle' : data.status === "Pre-End" ? 'bg-secondary-subtle' : 'bg-danger-subtle'} px-2 rounded-2`}>
                      {data.status}
                    </span>
                  </td>
                  <td className='text-center'>
                    <button className='btn p-0 '>
                      <IoTrashBin className='fs-5 text-danger'/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Classes;
