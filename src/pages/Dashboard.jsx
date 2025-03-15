import React from "react";
import { FaDollarSign, FaUser } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { RiHomeOfficeFill } from "react-icons/ri";
// import DashboardChart from "../components/DashboardChart";
import StudentPieChart from "../components/StudentPieChart";
import IncomeLineChart from "../components/IncomeLineChart";

function Dashboard() {
  return (
    <div className="p-3 font-poppins">
      <div className="animate__animated animate__fadeIn animate__faster">
        <h2>Dashboard Overview</h2>
        <p className="text-secondary">Welcome back to the school management system</p>
      </div>
      <div className="row border-bottom  pb-3">
        <div className="col-3 animate__animated animate__fadeIn animate__faster">
          <div className="d-flex align-items-center p-3 border rounded-2">
            <div className="col-7 ">
              <p className="m-0 text-secondary">Total Students</p>
              <h4 className="my-2">1,202</h4>
              <p className="m-0 text-success">+12% this month</p>
            </div>
            <div className="col-5 text-end">
              <IoPeople className="fs-1 p-1 rounded-1 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="col-3 animate__animated animate__fadeIn animate__faster">
          <div className=" d-flex align-items-center p-3 border rounded-2">
            <div className="col-7 ">
              <p className="m-0 text-secondary">Teachers</p>
              <h4 className="my-2">89</h4>
              <p className="m-0 text-warning">All records</p>
            </div>
            <div className="col-5 text-end">
              <FaUser className="fs-1 p-1 rounded-1 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="col-3 animate__animated animate__fadeIn animate__faster">
          <div className=" d-flex align-items-center p-3 border rounded-2">
            <div className="col-7">
              <p className="m-0 text-secondary">Classes</p>
              <h4 className="my-2">45</h4>
              <p className="m-0 text-primary">All Classes</p>
            </div>
            <div className="col-5 text-end">
              <RiHomeOfficeFill className="fs-1 p-1 rounded-1 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="col-3 animate__animated animate__fadeIn animate__faster">
          <div className=" d-flex align-items-center p-3 border rounded-2">
            <div className="col-7 ">
              <p className="m-0 text-secondary">Monthly Income</p>
              <h4 className="my-2">$13,202</h4>
              <p className="m-0 text-success">+8% this month</p>
            </div>
            <div className="col-5 text-end">
              <FaDollarSign className="fs-1 p-1 rounded-1 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* <DashboardChart/> */}
      <div className="row font-poppins animate__animated animate__fadeInUp animate__faster">
        <div className="col-9 p-3">
          <div className="card p-3">
            <div className="border-bottom mb-3 p-2">
              <h5 className="m-0 text-center text-secondary">Monthly Income Trend</h5>
            </div>
            <IncomeLineChart/>
          </div>
        </div>
        <div className="col-3 p-3">
          <div className="card p-3">
            <div className="border-bottom mb-3 p-2">
              <h5 className="m-0 text-center text-secondary">Student Gender Distribution</h5>
            </div>
            <StudentPieChart />
          </div>
        </div>
       
      </div>

      <div className="animate__animated animate__fadeInUp animate__faster">
          <h2 class="mt-4">Popular Courses 📊</h2>
          <p class="text-secondary border-bottom pb-2">Only the most enrolled courses are displayed.</p>
          <table class="table font-poppins table-hover border">
              <thead>
                  <tr> 
                      <td className="text-secondary">Course/Code</td>
                      <td className="text-secondary">Male Students</td>
                      <td className="text-secondary">Female Students</td>
                      <td className="text-secondary">Total Students</td>
                      <td className="text-secondary">Total Income ($)</td>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>C++</td>
                      <td>120</td>
                      <td>80</td>
                      <td>200</td>
                      <td>12,500</td>
                  </tr>
                  <tr>
                      <td>React</td>
                      <td>90</td>
                      <td>110</td>
                      <td>200</td>
                      <td>10,200</td>
                  </tr>
                  <tr>
                      <td>Java</td>
                      <td>150</td>
                      <td>100</td>
                      <td>250</td>
                      <td>16,100</td>
                  </tr>
                  <tr>
                      <td>Python</td>
                      <td>110</td>
                      <td>90</td>
                      <td>200</td>
                      <td>10,100</td>
                  </tr>
                  <tr class="fw-bold ">
                      <td>Total</td>
                      <td>470</td>
                      <td>380</td>
                      <td>850</td>
                      <td>48,900</td>
                  </tr>
              </tbody>
          </table>
      </div>

    </div>
  );
}

export default Dashboard;
