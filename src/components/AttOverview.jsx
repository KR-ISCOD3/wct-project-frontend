import React from 'react'

function AttOverview() {
  return (
    <div class="card mt-3 me-4">
        <div class="card-body">
            <h5 class="card-title  text-secondary">Attendance Overview</h5>
            <div class="mt-3">
                <p class="d-flex justify-content-between border-bottom">
                    <span>Total Students Enrolled:</span> <span class="fw-bold text-dark">150</span>
                </p>
                <p class="d-flex justify-content-between border-bottom">
                    <span>Average Attendance Rate:</span> 
                    <span class="fw-bold text-success">85%</span>
                </p>
                <p class="d-flex justify-content-between border-bottom">
                    <span>Absent Students Today:</span> 
                    <span class="fw-bold text-danger">5</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default AttOverview
