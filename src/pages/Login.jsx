import React, { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { FaChalkboardTeacher, FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';
import { FiLock } from "react-icons/fi";
import { IoIosSchool } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import NotFound from './NotFound';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <NotFound/>
      <div className='d-none d-lg-block' style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <ParticleBackground />
      <div className='content-login d-flex font-poppins'>
        <div className="col-6 border-end d-flex justify-content-center align-items-cente px-5">
          <div className='d-flex align-items-center me-2'>
             <IoIosSchool style={{fontSize:220}} className='text-light' />
            <div className='text-start font-poppins text-light border-5 border-start ps-3 ms-2'>
             <h1 style={{fontSize:35}} className='m-0 fw-bold'>FE-SCHOOL</h1>
             <p className='m-0 fs-6'>Become developer with us</p>
            </div>
          </div>
        </div>
        <div className="col-6 px-5 py-3 border-start">
          <FaChalkboardTeacher style={{ fontSize: 150 }} className='text-light' />
          <form action="" className='mt-3'>
            <div className='d-flex bg-light py-2 rounded-3 mb-4'>
              <button type="button" className='btn p-0 border-end px-2 rounded-0'>
                <FaRegUser className='fs-3 text-secondary' />
              </button>
              <input type="text" placeholder='Username or Email' className='form-control bg-transparent border-0 shadow-none' />
            </div>
            <div className='d-flex bg-light py-2 rounded-3 mb-2'>
              <button type="button" className='btn p-0 border-end px-2 rounded-0'>
                <FiLock className='fs-3 text-secondary' />
              </button>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className='form-control bg-transparent border-0 shadow-none'
              />
              <button
                type="button"
                className='btn p-0 px-3 rounded-0 border-0'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash className='fs-3 text-secondary' /> : <FaRegEye className='fs-3 text-secondary' />}
              </button>
            </div>
            <div className='text-end'>
              <NavLink className="text-blue-200 text-decoration-none ">
                Forgot Password?
              </NavLink>
            </div>

            <button className='btn my-3 bg-blue-400 text-light w-100 py-2 fs-5 font-poppins'>
              Login
            </button>
              <span className='text-light '>
                Don't have account?
                <NavLink to="/register" className="text-blue-200  ms-1">
                  Register
                </NavLink>
              </span>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
