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
      <h2>Dashboard Overview</h2>
      <p>Welcome back to the school management system</p>
      <div className="row border-bottom  pb-3">
        <div className="col-3">
          <div className=" d-flex align-items-center p-3 border rounded-2">
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
        <div className="col-3">
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
        <div className="col-3">
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
        <div className="col-3">
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
      <div className="row font-poppins ">
        <div className="col-4 p-3">
          <div className="card p-3">
            <div className="border-bottom mb-3 p-2">
              <h5 className="m-0 text-center text-secondary">Student Gender Distribution</h5>
            </div>
            <StudentPieChart />
          </div>
        </div>
        <div className="col-8 p-3">
          <div className="card p-3">
            <div className="border-bottom mb-3 p-2">
              <h5 className="m-0 text-center text-secondary">Monthly Income Trend</h5>
            </div>
            <IncomeLineChart/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
