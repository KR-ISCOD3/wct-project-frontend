import React from 'react'
import ClassListTeacher from '../components/ClassListTeacher';
import AttOverview from '../components/AttOverview';
import ClassOverview from '../components/ClassOverview';
import ProfileInstructor from '../components/ProfileInstructor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorById,clearInstructor } from '../features/admin/instructorSlice';
import { useParams } from 'react-router-dom';


function AccountTeacher() {
  const { instructorId } = useParams();  // Access the instructorId from the URL params
  const dispatch = useDispatch();
  const { instructor, loading, error } = useSelector((state) => state.instructors);

  useEffect(() => {
    if (instructorId) {
      dispatch(clearInstructor()); // Clear old data
      dispatch(fetchInstructorById(instructorId)); // Load new data
    }
  }, [dispatch, instructorId]);

  return (
    <div className='container-fluid p-3 font-poppins animate__animated animate__fadeIn animate__faster'>
      {/* <h1>{instructor.name}</h1> */}
      <div className="d-flex">
        <div className='col-5 border-end'>

          {/* user-profile */}
          <ProfileInstructor instructor={instructor}/>
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