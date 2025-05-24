import React, { useRef } from 'react';

function ReceiptModal({ selectedForReceipt }) {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div
      className="modal fade"
      id="receiptModal"
      tabIndex="-1"
      aria-labelledby="receiptModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="receiptModalLabel">Student Receipt</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body" ref={printRef}>
            {selectedForReceipt ? (
              <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  {/* Optional: Add logo here */}
                  {/* <img src="logo.png" alt="Logo" style={{ width: 80 }} /> */}
                  <h2 style={{ margin: '10px 0' }}>FE-School</h2>
                  <p style={{ margin: 0 }}>123 School Road 4, Phnom Penh</p>
                  <p style={{ margin: 0 }}>Phone: (855) 10-406-414 </p>
                  <hr style={{ marginTop: '20px' }} />
                </div>

                <h4 style={{ textAlign: 'center', marginBottom: '20px', textDecoration: 'underline' }}>Official Receipt</h4>

                <table style={{ width: '100%', lineHeight: 2 }}>
                  <tbody>
                    <tr>
                      <td><strong>Receipt No:</strong></td>
                      <td>#{selectedForReceipt.id}</td>
                      <td><strong>Date:</strong></td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Student Name:</strong></td>
                      <td colSpan={3}>{selectedForReceipt.student_name}</td>
                    </tr>
                    <tr>
                      <td><strong>Course Title:</strong></td>
                      <td colSpan={3}>{selectedForReceipt.course_title}</td>
                    </tr>
                    <tr>
                      <td><strong>Gender:</strong></td>
                      <td>{selectedForReceipt.gender_name}</td>
                      <td><strong>Start Date:</strong></td>
                      <td>{selectedForReceipt.startdate}</td>
                    </tr>
                    <tr>
                      <td><strong>Payment Method:</strong></td>
                      <td>{selectedForReceipt.payment_method}</td>
                      <td><strong>Total Price:</strong></td>
                      <td>${selectedForReceipt.total_price}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p>_______________________</p>
                    <p>Authorized Signature</p>
                  </div>
                  <div>
                    <p>_______________________</p>
                    <p>Student Signature</p>
                  </div>
                </div>
              </div>
              
            ) : (
              <p>No receipt data.</p>
            )}
          </div>
          <div className="modal-footer">
            <button onClick={handlePrint} className="btn btn-primary">Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
