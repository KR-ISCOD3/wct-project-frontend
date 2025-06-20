  import React, { useEffect, useState,useRef } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { BsListNested, BsThreeDots } from 'react-icons/bs';
  import { FaTrash } from 'react-icons/fa';
  import { IoCall, IoEye, IoMail } from 'react-icons/io5';
  import { NavLink } from 'react-router-dom';
  import echo from '../echo';
  import { fetchInstructors,deleteInstructor } from '../features/admin/instructorSlice';

  function Teacher() {
    const dispatch = useDispatch();
    const closeBtnRef = useRef(null); 
    const { instructors, loading, error } = useSelector((state) => state.instructors);
    const [filter, setFilter] = useState('all');
    const [shiftFilter, setShiftFilter] = useState('');
    const [timeFilter, setTimeFilter] = useState('');
    const [selectedInstructorId, setSelectedInstructorId] = useState(null);
    const [workStatusFilter, setWorkStatusFilter] = useState(''); // Full-time / Part-time
    const keyword = useSelector((state) => state.search.keyword.toLowerCase());

    useEffect(() => {
      dispatch(fetchInstructors());
    }, [dispatch]);

    useEffect(() => {
      const channel = echo.channel('admin-dashboard');
    
      channel.listen('.new-user-registered', (data) => {
        console.log('New user registered:', data);

        dispatch(fetchInstructors());
    
        // Show toast or update UI
        alert(`New ${data.role} registered: ${data.name}`);
      });
      return () => {
        echo.leave('admin-dashboard');
      };
    }, [dispatch]);
    
    const filteredInstructors = instructors.filter((instructor) => {

      // Only show active instructors
      // if (instructor.datated_status !== 'active') return false;
      // 🔍 Search by name (case-insensitive)
      if (keyword && !instructor.name.toLowerCase().includes(keyword)) return false;
    
      // 🔧 Availability filter
      if (filter === 'available' && instructor.status !== 'available') return false;
      if (filter === 'unavailable' && instructor.status !== 'unavailable') return false;
    
      // 🔧 Work Status filter
      if (workStatusFilter) {
        if (workStatusFilter === 'Full-Time' && instructor.work_status !== 'Full-Time') return false;
        if (workStatusFilter === 'Part-Time' && instructor.work_status !== 'Part-Time') return false;
      }
    
      // 🔧 Shift filter
      if (shiftFilter && instructor.shift !== shiftFilter) return false;
    
      // 🔧 Time filter
      if (timeFilter && instructor.work_time !== timeFilter) return false;
    
      return true;
    });
    
    const handleDelete = () => {
      if (!selectedInstructorId) return;

      dispatch(deleteInstructor(selectedInstructorId))
        .unwrap()
        .then(() => {
          // 1) Programmatically click the Close button to dismiss modal
          if (closeBtnRef.current) {
            closeBtnRef.current.click();
          }
          // 2) Clear selection
          setSelectedInstructorId(null);
          // 3) Re-fetch instructors
          dispatch(fetchInstructors());
        })
        .catch(console.error);
    };
    
    return (
      <div>
      <div className="p-3 font-poppins animate__animated animate__fadeIn animate__faster">
        <div>
          <h2>Instructor</h2>
          <p className="text-secondary mb-0">Find the right instructor for your course.</p>
        </div>

        <div className="rounded-0 border-bottom py-3 mb-3 mt-2">
          <div className="d-flex align-items-center mb-4">
            <div className="me-2">
            <select
              name="filter"
              id="filter"
              className="form-select shadow-none rounded-2 border"
              onChange={(e) => {
                const selected = e.target.value;
                setFilter(selected);

                // Reset other filters when switching to 'all'
                if (selected === 'all') {
                  setWorkStatusFilter('');
                  setShiftFilter('');
                  setTimeFilter('');
                }
              }}
              value={filter}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            </div>

            {/* Work Status Filter */}
            <div className="me-2">
              <select
                name="workStatusFilter"
                id="workStatusFilter"
                className="form-select shadow-none rounded-2 border"
                onChange={(e) => setWorkStatusFilter(e.target.value)}
                value={workStatusFilter}
              >
                <option value="">All Work Status</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>

            {/* Show filters for Available instructors */}
            {filter === 'available' && (
              <div className="d-flex gap-2">
                <select
                  name="shiftFilter"
                  id="shiftFilter"
                  className="form-select shadow-none rounded-2 border"
                  onChange={(e) => setShiftFilter(e.target.value)}
                  value={shiftFilter}
                >
                  <option value="">All Shifts</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>

                <select
                  name="timeFilter"
                  id="timeFilter"
                  className="form-select shadow-none rounded-2 border"
                  onChange={(e) => setTimeFilter(e.target.value)}
                  value={timeFilter}
                >
                  <option value="">All Times</option>
                  <option value="0-0">9:00 - </option>
                  <option value="1-5">1-5</option>
                  <option value="6-9">6-9</option>
                </select>
              </div>
            )}
          </div>

          {/* Instructor Stats Section */}
          <div className="d-flex align-items-center justify-content-start">
            <p className="m-0 border-start border-primary border-2 ps-4 col-2 text-secondary">
              <span className="fs-4 text-primary">
                {filteredInstructors.filter((instructor) => instructor.status === 'available').length}
              </span>{' '}
              Available
            </p>
            <p className="m-0 border-start border-danger border-2 ps-4 col-2 text-secondary">
              <span className="fs-4 text-danger">
                {filteredInstructors.filter((instructor) => instructor.status === 'unavailable').length}
              </span>{' '}
              Unavailable
            </p>
            <p className="m-0 border-start border-warning border-2 ps-4 col-2 text-secondary">
              <span className="fs-4 text-warning">
                {filteredInstructors.filter((instructor) => instructor.shift === 'Morning').length}
              </span>{' '}
              Morning Shift
            </p>
            <p className="m-0 border-start border-info border-2 ps-4 col-2 text-secondary">
              <span className="fs-4 text-info">
                {filteredInstructors.filter((instructor) => instructor.shift === 'Afternoon').length}
              </span>{' '}
              Afternoon Shift
            </p>
            <p className="m-0 border-start border-dark border-2 ps-4 col-2 text-secondary">
              <span className="fs-4 text-dark">
                {filteredInstructors.filter((instructor) => instructor.work_status === 'Part-Time').length}
              </span>{' '}
              Part-time
            </p>
            <p className="m-0 border-start border-success border-2 ps-4 col-2 text-secondary">
              <span className="fs-4 text-success">
                {filteredInstructors.filter((instructor) => instructor.work_status === 'Full-Time').length}
              </span>{' '}
              Full-time
            </p>
          </div>
        </div>

        {/* Instructor Cards */}
        <div className="row m-0 my-3">
          {filteredInstructors.map((instructor) => (
            <div key={instructor.id} className="col-3 my-2 ps-0">
              <div className="card border p-4 shadow">
                <div className="d-flex justify-content-between font-poppins">
                  <div>
                    <div style={{ width: 75, height: 75 }} className='rounded-circle bg-secondary overflow-hidden'>
                      {instructor.image ? (
                        <img src={instructor.image} alt={instructor.name} className='w-100 h-100 object-fit-cover' />
                      ) : (
                        <div className='d-flex justify-content-center align-items-center w-100 h-100'>
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <p className="m-0 fs-5">{instructor.name}</p>
                    <span
                      className={`px-3 ${
                        instructor.status === 'Unavailable'
                          ? 'bg-danger-subtle text-danger'
                          : 'bg-primary-subtle'
                      } text-primary rounded-2`}
                    >
                      {instructor.status}
                    </span>
                  </div>
                  <div>
                  <button onClick={() => setSelectedInstructorId(instructor.id)} className="btn nav-link " data-bs-toggle="modal" data-bs-target="#deletemodal">
                        <li className="d-flex align-items-center">
                          <FaTrash className="fs-5 text-danger" />
                          {/* Delete */}
                        </li>
                      </button>
                  </div>
                 
                </div>

                {/* Instructor Info */}
                <div className="d-flex justify-content-between mt-4">
                  <div>
                    <p className="m-0 text-secondary">Day-Shift</p>
                    <p className="m-0">{instructor.shift}</p>
                  </div>
                  <div>
                    <p className="m-0 text-secondary">Work-Status</p>
                    <p className="m-0">{instructor.work_status}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="mb-2">
                    <IoMail className="me-2 fs-3" />
                    <span>{instructor.email || 'No email available'}</span>
                  </div>
                  <div className="mb-2">
                    <IoCall className="me-2 fs-3" />
                    <span>{instructor.phone_number || 'No phone available'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <p>Loading instructors...</p>}
        </div>

        <div className='modal fade' id="deletemodal">
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
            <div className='modal-content p-3'>
                <div className='modal-header p-0'>
                  <p className='m-0 fs-5'>Delete</p>
                </div>
                <div>
                  <h3 className='my-3'>Are you sure you want to delete?</h3>
                </div>
                <div className="modal-footer py-1">
                  <button className='btn btn-secondary' data-bs-dismiss="modal" ref={closeBtnRef}>Close</button>
                  <button className='btn btn-danger' onClick={handleDelete} disabled={loading}>
                      {loading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                          "Delete"
                      )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Teacher;
