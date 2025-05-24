import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildings, addBuilding, deleteBuilding, updateBuilding } from "../features/admin/buildingSlice";
import { TbTrashX } from "react-icons/tb";
import { FiPlusCircle, FiEdit } from "react-icons/fi";

function Building() {
  const dispatch = useDispatch();
  const { buildings, fetchLoading, addLoading, error } = useSelector((state) => state.buildings);

  const [buildingName, setBuildingName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  // --- New state for modals and selected building ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [editBuildingName, setEditBuildingName] = useState("");
  const [editRoomNumber, setEditRoomNumber] = useState("");
  // Add this to your state declarations:
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buildingName || !roomNumber) return;

    try {
      await dispatch(addBuilding({ buildingName: buildingName, roomNumber: roomNumber })).unwrap();
      setBuildingName("");
      setRoomNumber("");
    } catch (err) {
      console.error("Failed to add building:", err);
    }
  };

  const clearForm = () => {
    setBuildingName("");
    setRoomNumber("");
  };

  // --- Delete Handlers ---
  const openDeleteModal = (building) => {
    setSelectedBuilding(building);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedBuilding(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteBuilding(selectedBuilding.id)).unwrap();
      closeDeleteModal();
    } catch (err) {
      console.error("Failed to delete building:", err);
    }
    setDeleteLoading(false);
  };

  // --- Edit Handlers ---
  const openEditModal = (building) => {
    setSelectedBuilding(building);
    setEditBuildingName(building.name);
    setEditRoomNumber(building.room_number);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedBuilding(null);
    setShowEditModal(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editBuildingName || !editRoomNumber) return;
    setUpdateLoading(true);
    try {
      await dispatch(updateBuilding({
        id: selectedBuilding.id,
        buildingName: editBuildingName,
        roomNumber: editRoomNumber,
      })).unwrap();
      closeEditModal();
    } catch (err) {
      console.error("Failed to update building:", err);
    }
    setUpdateLoading(false);
  };

  return (
    <div className="p-3 font-poppins">
      <form onSubmit={handleSubmit} className="w-100 pb-3 border-bottom">
        <h2>Add Building</h2>
        <p className="text-secondary">
          Register a new building and manage room availability efficiently.
        </p>

        <div className="row m-0">
          <div className="col-4 ps-0 pe-3">
            <label className="mb-1 text-blue-700">Building Name*</label>
            <input
              type="text"
              placeholder="Enter building name"
              className="form-control shadow-none border rounded-0"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              required
            />
          </div>

          <div className="col-4 ps-0 pe-3">
            <label className="mb-1 text-blue-700">Room Number*</label>
            <input
              type="text"
              placeholder="Enter room number"
              className="form-control shadow-none border rounded-0"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>

          <div className="col-4 ps-0 mt-4 d-flex align-items-end justify-content-end">
            <button
              type="button"
              className="px-4 btn bg-secondary mx-2 text-light d-flex align-items-center"
              onClick={clearForm}
              disabled={addLoading}
            >
              <TbTrashX className="me-1 fs-5" />
              <p className="m-0">Clear</p>
            </button>

            <button
              type="submit"
              className="px-4 btn bg-blue-700 text-light d-flex align-items-center"
              disabled={addLoading}
            >
              {addLoading ? (
                <div className="spinner-border text-light spinner-border-sm fs-5" role="status">
                  <span className="visually-hidden fs-5">Loading...</span>
                </div>
              ) : (
                <>
                  <FiPlusCircle className="me-1 fw-bolder fs-5" />
                  <p className="m-0">Add Building</p>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Building list */}
      <div className="row mt-4">
        <div className="col-12">
          <h5>Existing Buildings</h5>
          {error && <p className="text-danger">{error}</p>}

          <table className="table table-bordered text-center">
            <thead className="bg-blue-700 text-light">
              <tr>
                <th>#</th>
                <th>Building Name</th>
                <th>Room Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchLoading ? (
                <tr className="placeholder-glow">
                  <td><span className="placeholder col-1"></span></td>
                  <td><span className="placeholder col-5"></span></td>
                  <td><span className="placeholder col-2"></span></td>
                  <td><span className="placeholder col-3"></span></td>
                </tr>
              ) : buildings.length > 0 ? (
                buildings.map((b, idx) => (
                  <tr key={b.id}>
                    <td>{idx + 1}</td>
                    <td>{b.name}</td>
                    <td>{b.room_number}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger me-2 fs-6"
                        onClick={() => openDeleteModal(b)}
                      >
                        <TbTrashX />
                      </button>
                      <button
                        className="btn btn-sm btn-primary fs-6"
                        onClick={() => openEditModal(b)}
                      >
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No buildings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-modal="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete building <strong>{selectedBuilding?.name}</strong>?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                
                <button type="button" className="btn btn-danger" onClick={confirmDelete} disabled={deleteLoading}>
                    {deleteLoading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        "Delete"
                    )}
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-modal="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Building</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Building Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editBuildingName}
                    onChange={(e) => setEditBuildingName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Room Number*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editRoomNumber}
                    onChange={(e) => setEditRoomNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                {updateLoading ? (
                    <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    "Save Changes"
                )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Building;
