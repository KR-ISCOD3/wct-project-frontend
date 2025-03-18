import React from 'react';
import { PiExport } from "react-icons/pi";
import * as XLSX from "xlsx";

function TableStudent() {
  const data = [
    { name: 'Kim Dara', course: 'C/C++/OOP', price: '$69', gender: 'Male', paymentMethod: 'Cashing', startDate: '31-02-2025' },
    { name: 'Srey Khouch', course: 'C/C++/OOP', price: '$69', gender: 'Female', paymentMethod: 'QR-Payment', startDate: '31-02-2025' },
    { name: 'Sokha Lee', course: 'JavaScript/React', price: '$79', gender: 'Male', paymentMethod: 'Online Payment', startDate: '05-03-2025' },
    { name: 'Sreyna Chan', course: 'Java', price: '$59', gender: 'Female', paymentMethod: 'Online Payment', startDate: '12-03-2025' },
    { name: 'Bora Keo', course: 'PHP/Laravel', price: '$89', gender: 'Male', paymentMethod: 'Cashing', startDate: '20-03-2025' },
    { name: 'Chanrith Keo', course: 'Python/Django', price: '$99', gender: 'Male', paymentMethod: 'Online Payment', startDate: '22-03-2025' },
    { name: 'Davuth Pech', course: 'Go/Gin', price: '$109', gender: 'Male', paymentMethod: 'QR-Payment', startDate: '25-03-2025' },
    { name: 'Malis Yin', course: 'Kotlin/Android', price: '$89', gender: 'Female', paymentMethod: 'Cashing', startDate: '28-03-2025' },
    { name: 'Kosal Pheak', course: 'Swift/iOS', price: '$119', gender: 'Male', paymentMethod: 'Online Payment', startDate: '30-03-2025' },
    { name: 'Sokmean Heng', course: 'Ruby/Rails', price: '$99', gender: 'Male', paymentMethod: 'QR-Payment', startDate: '02-04-2025' },
    { name: 'Ravuth So', course: 'C#/.NET', price: '$129', gender: 'Male', paymentMethod: 'Cashing', startDate: '05-04-2025' },
    { name: 'Sreynith Kim', course: 'TypeScript/Next.js', price: '$109', gender: 'Female', paymentMethod: 'Online Payment', startDate: '08-04-2025' },
  ];

  // ✅ Export to Excel Function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upcoming Register");
    XLSX.writeFile(workbook, "Upcoming_Register.xlsx");
  };

  return (
    <div className="border rounded-3 p-3">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
        <div className='d-flex col-3 align-items-center'>
          <p className="m-0 fs-5 col-5">Student-Table</p>
          <select name="" id="" className='form-select shadow-none rounded-0 border'>
            <option value="recent">Recent</option>
            <option value="last-week">Last-Week</option>
          </select>
        </div>
        <button onClick={exportToExcel} className="btn bg-success-subtle text-success d-flex align-items-center">
          <PiExport className="me-2 fs-5"/>
          Export Excel
        </button>
      </div>

      {/* Scrollable Container */}
      <div className="scrollable-container" style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <table className="mt-2 table">
          <thead>
            <tr>
              <td className="text-secondary">Student/Course</td>
              <td className="text-secondary">Gender</td>
              <td className="text-secondary">Payment-Method</td>
              <td className="text-secondary">Price/Khmer</td>
              <td className="text-secondary">Starting-Date</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="align-middle border-bottom" key={index}>
                <td className="py-2">
                  <div className="border-start border-primary border-5 ps-3">
                    <p className="m-0 fw-medium fs-5">{item.name}</p>
                    <p className="m-0 text-muted">{item.course} </p>
                  </div>
                </td>
                <td>
                  <p className="m-0">
                    <span className={`bg-${item.gender === 'Male' ? 'info' : 'danger'}-subtle text-${item.gender === 'Male' ? 'primary' : 'danger'} rounded-5 px-3`}>{item.gender}</span>
                  </p>
                </td>
                <td>
                  <p className="m-0">{item.paymentMethod}</p>
                </td>
                <td>
                  <p className='m-0'>
                    <span className="text-danger">
                      {item.price} /
                    </span>
                    <span className="text-danger">
                      { parseFloat(item.price.replace('$', '')) * 4100 }៛
                    </span>
                  </p>
                </td>
                <td className="text-start">
                  <p className="m-0">
                    <span className="bg-secondary-subtle px-4 rounded-5">{item.startDate}</span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableStudent;
