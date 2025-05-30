import React from 'react'

function ClassOverview() {
  return (
    <div className='border mt-3 p-3 rounded-2 me-4'>
        <h4 className='border-bottom pb-2 text-secondary'>Class Overviews</h4>
        <div className='d-flex '>
            <div className='col-6 d-flex align-items-center my-3  border-start border-primary border-2 ps-2 '>
                <span>Progress Class: <span className='text-dark'>40</span></span>
            </div>
        <div className='col-6 d-flex align-items-center my-3  border-start border-secondary border-2 ps-2'>
            <span>Class Closed: <span className='text-dark'>10</span></span>
        </div>
        </div>
        <div className='d-flex border-top'>
            <div className='col-6 d-flex align-items-center my-3  border-start border-warning border-2 ps-2 '>
                <span>Pre-End Class: <span className='text-dark'>40</span></span>
            </div>
            <div className='col-6 d-flex align-items-center my-3  border-start border-secondary border-2 ps-2'>
                <span>Class Closed: <span className='text-dark'>10</span></span>
            </div>
        </div>
        <div className='d-flex align-items-center border-top pt-2'>
            <span>Total Class: <span className='text-blue-700 fw-bold'>40</span></span>
        </div>
    </div>
  )
}

export default ClassOverview
