import React from 'react'
import { IoTrashBin } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

function ClassTable() {
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
    <div style={{ maxHeight: '550px', overflowY: 'scroll' }} className='scrollable-container border-top'>
      <table className='table '>
        <thead style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: 1 }}>
          <tr>
            <td className='text-secondary'>Instructors</td>
            <td className='text-secondary'>Class Course / Chapter</td>
            <td className='text-secondary'>Time</td>
            <td className='text-secondary '>Total-Student</td>
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
              <td>
                02:00 - 03:15 (pm)
              </td>
              <td >{data.totalStudents} <span className='text-secondary'>students</span></td>
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
  )
}

export default ClassTable
