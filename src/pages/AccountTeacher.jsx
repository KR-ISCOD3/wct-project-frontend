import React from 'react'
import { IoCall } from 'react-icons/io5';
import { PiGenderMaleFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

import ClassListTeacher from '../components/ClassListTeacher';
import AttOverview from '../components/AttOverview';
import ClassOverview from '../components/ClassOverview';
import ProfileInstructor from '../components/ProfileInstructor';

function AccountTeacher() {
  return (
    <div className='container-fluid p-3 font-poppins animate__animated animate__fadeIn animate__faster'>
      
      <div className="d-flex">
        <div className='col-5 border-end'>

          {/* user-profile */}
          <ProfileInstructor/>
          {/* user-profile */}

          {/* class-overview */}
          <ClassOverview/>
          {/* class-overview */}

          {/* att-overview */}
          <AttOverview/>
          {/* att-overview */}

        </div>

        <div className='col-7 overflow-y-scroll scrollable-container' style={{height:820}}>      
            <ClassListTeacher/>
        </div>
      </div>
    </div>
  )
}

export default AccountTeacher
