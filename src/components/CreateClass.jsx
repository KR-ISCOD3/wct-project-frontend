import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/admin/courseSlice';
import { fetchBuildings } from '../features/admin/buildingSlice';
import { addClass } from '../features/teacher/classSlice';
import { toast, ToastContainer } from 'react-toastify';

function CreateClass() {
  const dispatch = useDispatch();

  // Fetch user from auth state
  const user = useSelector((state) => state.auth.user);
  const { courses } = useSelector((state) => state.courses);
  const { buildings } = useSelector((state) => state.buildings);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingBuildings, setLoadingBuildings] = useState(true);

  const [formData, setFormData] = useState({
    teacher_id: '',
    course_id: '',
    building_id: '',
    time: '',
    study_term: '',
    chapter: '',
    status: '',
  });

  const timeSlots = {
    'sat-sun': ['08:00 - 11:00 (sat-sun)', '11:00 - 01:45 (sat-sun)', '02:00 - 05:00 (sat-sun)'],
    'mon-thu': [
      '09:00 - 10:30 (mon-thu)',
      '11:00 - 12:15 (mon-thu)',
      '12:30 - 01:45 (mon-thu)',
      '02:00 - 03:15 (mon-thu)',
      '03:30 - 05:00 (mon-thu)',
      '05:00 - 06:00 (mon-thu)',
      '06:00 - 07:15 (mon-thu)',
      '07:30 - 08:30 (mon-thu)',
    ],
  };

  // Fetch courses and buildings on mount
  useEffect(() => {
    setLoadingCourses(true);
    dispatch(fetchCourses())
      .unwrap()
      .finally(() => setLoadingCourses(false));
  
    setLoadingBuildings(true);
    dispatch(fetchBuildings())
      .unwrap()
      .finally(() => setLoadingBuildings(false));
  }, []);
  

  // Set teacher_id when user is available
  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({
        ...prev,
        teacher_id: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'study_term' && { time: '' }), // Reset time if term changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.course_id || !formData.building_id || !formData.time) {
      alert('Please fill all required fields.');
      return;
    }

    console.log('Submitting with teacher_id:', formData.teacher_id);

    dispatch(addClass(formData))
      .unwrap()
      .then(() => {
        toast.success('Class created successfully!');
        setFormData({
          teacher_id: user?.id || '',
          course_id: '',
          building_id: '',
          time: '',
          study_term: '',
          chapter: '',
          status: '',
        });
      })
      .catch((err) => {
        console.error('Failed to create class:', err);
      });
  };

  return (
    <div className="mt-3 border-bottom mb-3">
      <ToastContainer/>
      <div className="mb-4">
        <h3 className="fw-medium mb-1">Create a New Class</h3>
        <p className="text-muted m-0">
          Fill out the form below to add a new class with schedule and details.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-4">
            <label className="fw-medium">Course*</label>
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="form-select rounded-2 shadow-none"
              required
              disabled={loadingCourses}
            >
              <option value="">
                {loadingCourses ? "Loading courses..." : "Select Course"}
              </option>
              {!loadingCourses &&
                courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-4">
            <label className="fw-medium">Building*</label>
            <select
                name="building_id"
                value={formData.building_id}
                onChange={handleChange}
                className="form-select rounded-2 shadow-none"
                required
                disabled={loadingBuildings}
              >
                <option value="">
                  {loadingBuildings ? "Loading buildings..." : "Select Building"}
                </option>
                {!loadingBuildings &&
                  buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
              </select>
          </div>

          <div className="col-4">
            <label className="fw-medium">Term*</label>
            <select
              name="study_term"
              value={formData.study_term}
              onChange={handleChange}
              className="form-select rounded-2 shadow-none"
              required
            >
              <option value="">Select Term</option>
              <option value="sat-sun">Sat - Sun</option>
              <option value="mon-thu">Mon - Thu</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4">
            <label className="fw-medium">Time*</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-select rounded-2 shadow-none"
              required
              disabled={!formData.study_term}
            >
              <option value="">Select Time</option>
              {(timeSlots[formData.study_term] || []).map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="col-3">
            <label className="fw-medium">Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select rounded-2 shadow-none"
              required
            >
              <option value="">Select Status</option>
              <option value="physical">Physical</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="col-3">
            <label className="fw-medium">Chapter</label>
            <input
              type="text"
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              className="form-control rounded-2 shadow-none"
              placeholder="e.g. Chapter 1 - Basics"
            />
          </div>

          <div className="col-2 d-flex justify-content-end align-items-end">
            <button type="submit" className="btn bg-blue-700 text-light px-5">
              + Create Class
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateClass;
