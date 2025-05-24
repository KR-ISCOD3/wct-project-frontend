import React, { useRef,useState } from 'react'
import { useDispatch } from 'react-redux';
import { disableStudent,getStudents } from '../features/admin/studentSlice';
import { toast } from 'react-toastify';

function DeleteStuRegisterModal({toDeleteId}) {

  const dispatch = useDispatch();
  const modalref = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
        await dispatch(disableStudent(toDeleteId)).unwrap();

        dispatch(getStudents());

        toast.success('Student deletet successfully!', { autoClose: 2000 });

        if (modalref.current) {
            modalref.current.click();
        }
    } 
    catch (err) {
        console.error(err);
        toast.error('Failed to disable student.');
    }
    finally {
        setLoading(false); // ✅ Stop loading
    }
  };
  return (
    <div>
        <div className="modal fade" id="delete" >
          <div className="modal-dialog modal-dialog-centered">
            <div className='modal-content p-3'>
              <div className='modal-header p-0'>
                <p className='m-0 fs-5'>Delete</p>
              </div>
              <div>
                <h3 className='my-3'>Are you sure you want to delete?</h3>
              </div>
              <div className="modal-footer py-1">
                <button className='btn btn-secondary' data-bs-dismiss="modal" ref={modalref}>Close</button>
                <button className='btn btn-danger' onClick={handleDelete} disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Delete"
                    )}
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default DeleteStuRegisterModal
