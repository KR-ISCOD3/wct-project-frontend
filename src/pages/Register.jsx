import React,{useState} from 'react';
import NotFound from './NotFound';
import { IoIosSchool } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash, FaUpload } from 'react-icons/fa';
import { IoIosCloudUpload } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [image,setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <NotFound/>
      <div className='content-register d-none d-lg-flex justify-content-center align-items-center font-poppins ' style={{height:"100vh"}}>
            <div className='p-5 bg-blue-600 text-light shadow-sm rounded-4'>
              <div className='d-flex justify-content-between align-items-center border-bottom mb-3 pb-3'>
                <div>
                  <h3 className='m-0'>Register Form</h3>
                </div>
                <div className='d-flex align-items-center me-2 '>
                  <IoIosSchool style={{fontSize:30}}  />
                  <div className='text-start font-poppins  border-5 border-start ps-3 ms-2'>
                    <p style={{fontSize:18}} className='m-0 fw-bold'>FE-SCHOOL</p>
                    <p className='m-0' style={{fontSize:12}}>Become developer with us</p>
                  </div>
                </div>
              </div>
              <form action="" >
                <div className='d-flex align-items-center'>
                  <div className='me-4 border-end pe-4'>
                      <div style={{width:200,height:250}} className='bg-secondary border'>
                        <img src={image || "./image/placeholder.png"} alt="Preview" className='w-100 h-100 object-fit-cover'/>
                      </div>
                      {/* Hidden File Input */}
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="fileInput" 
                        style={{display: "none"}} 
                        onChange={handleImageChange} 
                      />
                      <button 
                        tabIndex="-1" 
                        type="button" 
                        className='btn w-100 btn-secondary my-2 rounded-2 align-items-center'
                        onClick={() => document.getElementById('fileInput').click()}
                      >
                        Upload
                        <IoIosCloudUpload className='ms-2'/>
                      </button>
                  </div>
                  <div >

                    {/* name and gender */}
                    <div className='d-flex mb-3'>
                      <div className='pe-2 col-8'>
                          <label htmlFor="" className='form-label fw-medium'>Full-Name*</label>
                          <input type="text" name="" id="" className='form-control rounded-2 shadow-none border' placeholder='Full-Name'/>
                      </div> 
                      <div className='col-4'>
                          <label htmlFor="" className='form-label fw-medium'>Gender*</label>
                          <select name="" id="" className='form-select rounded-2 shadow-none border'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                      </div>
                    </div>

                    {/* email and skills */}
                    <div className='d-flex mb-3'>
                      <div className='pe-2'>
                          <label htmlFor="" className='form-label fw-medium'>Email*</label>
                          <input type="text" name="" id="" className='form-control rounded-2 shadow-none border' placeholder='Email'/>
                      </div> 
                      <div className=''>
                          <label htmlFor="" className='form-label fw-medium'>Password*</label>
                          <div className='d-flex align-items-center border bg-body rounded-2'>
                            <input type={showPassword ? "text" : "password"} name="" id="" className='form-control  shadow-none border-0 ' placeholder='Password'/>
                            <button
                              type="button"
                              className='btn p-0 px-2 rounded-2 border-0'
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaRegEyeSlash className='fs-3 text-secondary' /> : <FaRegEye className='fs-3 text-secondary' />}
                            </button>
                          </div>
                      </div>
                    </div>

                    {/* work-status and  daysift */}
                    <div className='d-flex mb-3'>
                        <div className='col-4'>
                          <label htmlFor="" className='form-label fw-medium'>Skill*</label>
                          <select name="" id="" className='form-select rounded-2 shadow-none border'>
                            <option value="Mobile-App">Mobile-App</option>
                            <option value="Web-developer">Web-developer</option>
                            <option value="Networking">Networking</option>
                            <option value="Graphic-Design">Graphic-Design</option>
                            <option value="All">Hybrid-Skills</option>
                          </select>
                        </div>
                        <div className='px-2 col-4'>
                          <label htmlFor="" className='form-label fw-medium'>Work-Status*</label>
                          <select name="" id="" className='form-select rounded-2 shadow-none border'>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                          </select>
                      </div> 
                      <div className='col-4'>
                          <label htmlFor="" className='form-label fw-medium'>Shift*</label>
                          <select name="" id="" className='form-select rounded-2 shadow-none border'>
                            <option value="Mobile-App">Morning</option>
                            <option value="Web-developer">Afternoon</option>
                          </select>
                      </div>
                    </div>
                  </div>

                  </div>

                  <div className='border-top mt-2 d-flex justify-content-end pt-3'>
                    <NavLink to="/login" className="btn border-0 bg-body text-dark rounded-2 me-2 d-flex align-items-center">
                      <RiLoginBoxFill className='me-2'/> 
                      Back to login 
                    </NavLink>  
                    <button className='btn bg-blue-500 text-light rounded-2 px-5'>
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
