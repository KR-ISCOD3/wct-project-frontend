import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { IoIosSchool, IoIosCloudUpload } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";
import ParticleBackground from '../components/ParticleBackground';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Loading from '../components/Loading';
// import echo from '../echo';


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender_id: 1,
    image: null,
    work_status: 'Full-Time',
    shift: 'Morning',
    position: 'Mobile-App',
    phone_number:''
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('role');
      if (role === 'teacher') navigate('/teacher-dashboard');
      else if (role === 'student') navigate('/student-dashboard');
      else navigate('/');
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);  

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await dispatch(registerUser(data));
      const payload = response.payload;

      if (response.meta.requestStatus === 'rejected') {
        setLoading(false);

        const normalizedErrors = {};

        if (payload?.errors) {
          Object.entries(payload.errors).forEach(([key, value]) => {
            normalizedErrors[key] = Array.isArray(value) ? value : [value];
          });
        } else if (payload?.details) {
          normalizedErrors.general = [payload.details];
        } else if (payload?.detail) {
          normalizedErrors.general = [payload.detail];
        } else if (payload?.message) {
          normalizedErrors.general = [payload.message];
        } else {
          normalizedErrors.general = ['Registration failed.'];
        }

        setErrors(normalizedErrors);
        console.error('Registration failed:', payload);
      } else {
        const role = localStorage.getItem('role');
        if (!role) {
          console.error('No role found in localStorage.');
          return;
        }

        setTimeout(() => {
          setLoading(false);
          if (role === 'teacher') navigate('/teacher-dashboard');
          else if (role === 'student') navigate('/student-dashboard');
          else navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      setLoading(false);
      setErrors({ general: ['Something went wrong. Please try again.'] });
    }
  };
  
  return (
    <>
      <NotFound />
      {loading && <Loading />}
      <div className="bg-blue-600 d-none d-lg-flex justify-content-center align-items-center font-poppins" style={{ height: "100vh" }}>
        <ParticleBackground />
        <div className="p-5 bg-blue-600 text-light shadow rounded-4 z-1">
          <form onSubmit={handleSubmit}>
            {errors && (
              <div className="alert alert-danger">
                <p className='text-danger fw-bold mb-2'>Error-Message:</p>
                {Object.keys(errors).map((key) => {
                  const messages = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
                  return (
                    <span key={key} className='alert-danger'>
                      <strong>{key}:</strong>
                      {messages.map((message, index) => (
                        <span key={index} className='m-0'> {message}</span>
                      ))} <br />
                    </span>
                  );
                })}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center border-bottom mb-3 pb-3">
              <div>
                <h3 className="m-0">Register Form</h3>
              </div>
              <div className="d-flex align-items-center me-2">
                <IoIosSchool style={{ fontSize: 30 }} />
                <div className="text-start font-poppins border-5 border-start ps-3 ms-2">
                  <p style={{ fontSize: 18 }} className="m-0 fw-bold">FE-SCHOOL</p>
                  <p className="m-0" style={{ fontSize: 12 }}>Become a developer with us</p>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="me-4 border-end pe-4">
                <div style={{ width: 200, height: 250 }} className="bg-secondary border">
                  <img src={formData.image ? URL.createObjectURL(formData.image) : "./image/placeholder.png"} alt="Preview" className="w-100 h-100 object-fit-cover" />
                </div>
                <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageChange} />
                <button type="button" className="btn w-100 btn-secondary my-2 rounded-2 align-items-center" onClick={() => document.getElementById('fileInput').click()}>
                  Upload
                  <IoIosCloudUpload className="ms-2" />
                </button>
              </div>

              <div>
                {/* Name & Gender */}
                <div className="d-flex mb-3">
                  <div className="pe-2 col-4">
                    <label htmlFor="name" className="form-label fw-medium">Full-Name*</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control rounded-2 shadow-none border" placeholder="Full-Name" required />
                  </div>   
                  <div className="col-4 pe-2 ">
                    <label htmlFor="gender" className="form-label fw-medium">Gender*</label>
                    <select name="gender_id" id="gender_id" value={formData.gender_id} onChange={handleChange} className="form-select rounded-2 shadow-none border" required>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label htmlFor="phone_number" className="form-label fw-medium">Phone Number*</label>
                    <input type="text" name="phone_number" id="phone_number" value={formData.phone_number} onChange={handleChange} className="form-control rounded-2 shadow-none border" placeholder="Phone Number" required />
                  </div>
                </div>

                {/* Email & Password */}
                <div className="d-flex mb-3">
                  <div className="pe-2 col-6">
                    <label htmlFor="email" className="form-label fw-medium">Email*</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control rounded-2 shadow-none border" placeholder="Email" required />
                  </div>
                  <div className='col-6'>
                    <label htmlFor="password" className="form-label fw-medium">Password*</label>
                    <div className="d-flex align-items-center border bg-body rounded-2">
                      <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} className="form-control shadow-none border-0" placeholder="Password" required />
                      <button type="button" className="btn p-0 px-2 rounded-2 border-0" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEyeSlash className="fs-3 text-secondary" /> : <FaRegEye className="fs-3 text-secondary" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Position, Work-Status & Shift */}
                <div className="d-flex mb-3">
                  <div className="col-4">
                    <label htmlFor="position" className="form-label fw-medium">Position*</label>
                    <select name="position" id="position" value={formData.position} onChange={handleChange} className="form-select rounded-2 shadow-none border" required>
                      <option value="Mobile-App">Mobile-App</option>
                      <option value="Web-developer">Web-developer</option>
                      <option value="Networking">Networking</option>
                      <option value="Graphic-Design">Graphic-Design</option>
                      <option value="All">Hybrid-Skills</option>
                    </select>
                  </div>
                  <div className="px-2 col-4">
                    <label htmlFor="work_status" className="form-label fw-medium">Work-Status*</label>
                    <select name="work_status" id="work_status" value={formData.work_status} onChange={handleChange} className="form-select rounded-2 shadow-none border" required>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label htmlFor="shift" className="form-label fw-medium">Shift*</label>
                    <select name="shift" id="shift" value={formData.shift} onChange={handleChange} className="form-select rounded-2 shadow-none border" required>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-top mt-2 d-flex justify-content-end pt-3">
              <NavLink to="/login" className="btn border-0 bg-body text-dark rounded-2 me-2 d-flex align-items-center">
                <RiLoginBoxFill className="me-2" />
                Back to login
              </NavLink>
              <button type="submit" className="btn btn-primary rounded-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
