import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { TbTrashX } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";

function Student() {
  return (
    <div className="p-3 font-poppins">
      <div className="d-flex">
        <form action="" className="w-100 pb-3">
          <h2>Register-Form</h2>
          <p className="text-secondary">
            Every great achievement begins with a single step. Register and
            start learning!
          </p>
          <div className="row m-0 ">
            <div className=" col-4 ps-0 pe-3">
              <label htmlFor="" className="mb-1 text-blue-700">
                Full-Name*
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Full-Name"
                className="form-control shadow-none border rounded-0"
              />
            </div>
            <div className=" col-4 ps-0 pe-3">
              <label htmlFor="" className="mb-1 text-blue-700">
                Gender*
              </label>
              <select
                name=""
                id=""
                className="form-select shadow-none border rounded-0"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className=" col-4 ps-0 pe-3">
              <label htmlFor="" className="mb-1 text-blue-700">
                Course*
              </label>
              <select
                name=""
                id=""
                className="form-select shadow-none border rounded-0"
              >
                <option value="C/C++/OOP">C/C++/OOP</option>
                <option value="C/C++/OOP">C++/OOP/MySQL</option>
              </select>
            </div>
            <div className=" col-4 ps-0 pe-3 mt-3">
              <label htmlFor="" className="mb-1 text-blue-700">
                Course-Price*
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Price"
                className="form-control shadow-none border rounded-0"
              />
            </div>
            <div className=" col-4 ps-0 pe-3 mt-3">
              <label htmlFor="" className="mb-1 text-blue-700">
                Start-Date*
              </label>
              <input
                type="date"
                name=""
                id=""
                placeholder="Enter Price"
                className="form-control shadow-none border rounded-0"
              />
            </div>
            <div className="col-4 ps-0 pe-3 mt-3">
              <br />
              <div className="d-flex justify-content-end">
                <button className="mt-1 px-4 btn bg-secondary mx-2 text-light d-flex align-items-center">
                  <TbTrashX className="me-1 fs-5" />
                  <p className="m-0">Clear</p>
                </button>
                <button className="mt-1 px-4 btn bg-blue-700 text-light d-flex align-items-center">
                  <FiPlusCircle className="me-1 fw-bolder fs-5" />
                  <p className="m-0">Register</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="row mt-3">
        <div className="col-7 ">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                  <button class="nav-link text-dark active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link text-dark" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
              </li>    
          </ul>
          <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">...</div>
              <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
