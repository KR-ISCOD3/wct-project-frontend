import React from 'react'
import { IoNotifications, IoSearch } from 'react-icons/io5'

function Header() {
  return (
    <div className='container-fluid p-3 font-poppins border-bottom'>
      <div className='d-flex justify-content-between align-items-center'>

        {/* ------------- Form Search ---------------- */}
        <form action="" className='col-3 d-flex align-items-center border rounded-2 '>
          <button className='btn border-0 pe-1' disabled>
              <IoSearch className='fs-5'/>
          </button>
          <input type="text" className='form-control border-0 shadow-none p-2' placeholder='Search...'/>
        </form>

        {/* ------------- User Account -------------- */}
        <div className='d-flex align-items-center'>
          <a href='' className='position-relative'>
            <IoNotifications className='fs-3 text-blue-700'/>
            <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span class="visually-hidden">New alerts</span>
            </span>
          </a>
          <a href="" style={{width:35,height:35}} className='bg-secondary ms-3 rounded-circle overflow-hidden'>
            <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2567" alt="" className='w-100 h-100 object-fit-cover'/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
