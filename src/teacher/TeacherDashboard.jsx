import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiTrendingDown } from 'react-icons/hi';
import { IoHome, IoPeople } from 'react-icons/io5';
import { SiProgress } from 'react-icons/si';
import TeacherClass from '../components/TeacherClass';
import CreateClass from '../components/CreateClass';
import { fetchClassSummary } from '../features/teacher/classSlice';

function TeacherDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const teacherId = user?.id;

  const [refresh, setRefresh] = useState(false);

  const { summary, summaryLoading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchClassSummary(teacherId));
    }
  }, [dispatch, teacherId, refresh]);

  const handleAddClass = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className='p-3 font-poppins'>
      <div className='animate__animated animate__fadeIn animate__faster'>
        <p className='text-secondary'>Welcome back to the school management system</p>
      </div>

      <div className='row border-bottom pb-3'>
        <div className='col-3 animate__animated animate__fadeIn animate__faster'>
          <div className='d-flex align-items-center p-3 border rounded-2'>
            <div className='col-7'>
              <p className='m-0 text-secondary'>Total Students</p>
              <h4 className='my-2'>
                {summaryLoading ? '...' : summary?.total_students ?? 0}
              </h4>
              <p className='m-0 text-success'>Your students</p>
            </div>
            <div className='col-5 text-end'>
              <IoPeople className='fs-1 p-1 rounded-1 text-blue-500' />
            </div>
          </div>
        </div>

        <div className='col-3 animate__animated animate__fadeIn animate__faster'>
          <div className='d-flex align-items-center p-3 border rounded-2'>
            <div className='col-7'>
              <p className='m-0 text-secondary'>Classes</p>
              <h4 className='my-2'>
                {summaryLoading ? '...' : summary?.total_classes ?? 0}
              </h4>
              <p className='m-0 text-warning'>All Classes</p>
            </div>
            <div className='col-5 text-end'>
              <IoHome className='fs-1 p-1 rounded-1 text-blue-500' />
            </div>
          </div>
        </div>

        <div className='col-3 animate__animated animate__fadeIn animate__faster'>
          <div className='d-flex align-items-center p-3 border rounded-2'>
            <div className='col-7'>
              <p className='m-0 text-secondary'>Progress Classes</p>
              <h4 className='my-2'>
                {summaryLoading ? '...' : summary?.progress_classes ?? 0}
              </h4>
              <p className='m-0 text-primary'>Progress</p>
            </div>
            <div className='col-5 text-end'>
              <SiProgress className='fs-1 p-1 rounded-1 text-blue-500' />
            </div>
          </div>
        </div>

        <div className='col-3 animate__animated animate__fadeIn animate__faster'>
          <div className='d-flex align-items-center p-3 border rounded-2'>
            <div className='col-7'>
              <p className='m-0 text-secondary'>Pre End</p>
              <h4 className='my-2'>
                {summaryLoading ? '...' : summary?.pre_end_classes ?? 0}
              </h4>
              <p className='m-0 text-success'>Class pre-end</p>
            </div>
            <div className='col-5 text-end'>
              <HiTrendingDown className='fs-1 p-1 rounded-1 text-blue-500' />
            </div>
          </div>
        </div>
      </div>

      <CreateClass onAdd={handleAddClass} />
      <TeacherClass refresh={refresh} />
    </div>
  );
}

export default TeacherDashboard;
