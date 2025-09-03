"use client";

import { useState, useEffect } from "react";
import { supabase, Scout } from "@/lib/supabase";

export default function ScoutManagementPage() {
  const [scouts, setScouts] = useState<Scout[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedScout, setSelectedScout] = useState<Scout | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    troop: "",
    age: "",
    email: "",
  });

  useEffect(() => {
    fetchScouts();
  }, []);

  async function fetchScouts() {
    try {
      const { data, error } = await supabase
        .from("scouts")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching scouts:", error);
        alert("Error loading scouts");
      } else {
        setScouts(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddScout() {
    if (!formData.name.trim()) {
      alert("Scout name is required");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("scouts")
        .insert([
          {
            name: formData.name.trim(),
            troop: formData.troop.trim() || null,
            age: formData.age ? parseInt(formData.age) : null,
            email: formData.email.trim() || null,
          },
        ])
        .select();

      if (error) {
        console.error("Error adding scout:", error);
        alert("Error adding scout");
      } else {
        setShowAddModal(false);
        resetForm();
        fetchScouts(); // Refresh the list
        alert("Scout added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding scout");
    }
  }

  async function handleEditScout() {
    if (!selectedScout || !formData.name.trim()) {
      alert("Scout name is required");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("scouts")
        .update({
          name: formData.name.trim(),
          troop: formData.troop.trim() || null,
          age: formData.age ? parseInt(formData.age) : null,
          email: formData.email.trim() || null,
        })
        .eq("id", selectedScout.id);

      if (error) {
        console.error("Error updating scout:", error);
        alert("Error updating scout");
      } else {
        setShowEditModal(false);
        setSelectedScout(null);
        resetForm();
        fetchScouts(); // Refresh the list
        alert("Scout updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating scout");
    }
  }

  async function handleDeleteScout(scout: Scout) {
    if (
      !confirm(
        `Are you sure you want to delete ${scout.name}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("scouts")
        .delete()
        .eq("id", scout.id);

      if (error) {
        console.error("Error deleting scout:", error);
        alert("Error deleting scout");
      } else {
        fetchScouts(); // Refresh the list
        alert("Scout deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting scout");
    }
  }

  function openAddModal() {
    resetForm();
    setShowAddModal(true);
  }

  function openEditModal(scout: Scout) {
    setSelectedScout(scout);
    setFormData({
      name: scout.name,
      troop: scout.troop || "",
      age: scout.age?.toString() || "",
      email: scout.email || "",
    });
    setShowEditModal(true);
  }

  function resetForm() {
    setFormData({
      name: "",
      troop: "",
      age: "",
      email: "",
    });
  }

  function closeModals() {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedScout(null);
    resetForm();
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading scouts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Scout Management</h1>
          <p className="text-muted">Manage your scout roster</p>
        </div>
        <button className="btn btn-success" onClick={openAddModal}>
          <i className="fas fa-plus me-2"></i>
          Add New Scout
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="fas fa-users fa-2x me-3"></i>
                <div>
                  <h5 className="card-title mb-0">{scouts.length}</h5>
                  <small>Total Scouts</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scout List */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-list me-2"></i>
            Scout Roster ({scouts.length})
          </h5>
        </div>
        <div className="card-body p-0">
          {scouts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No scouts registered yet</h5>
              <p className="text-muted">Click "Add New Scout" to get started</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Troop</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scouts.map((scout) => (
                    <tr key={scout.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle me-3">
                            {scout.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong>{scout.name}</strong>
                            {scout.email && (
                              <div className="small text-muted">
                                {scout.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {scout.troop || "No troop"}
                        </span>
                      </td>
                      <td>{scout.age || "N/A"}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => openEditModal(scout)}
                            title="Edit Scout"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteScout(scout)}
                            title="Delete Scout"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Scout Modal */}
      {showAddModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="fas fa-user-plus me-2"></i>
                    Add New Scout
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModals}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter scout's full name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Troop</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.troop}
                        onChange={(e) =>
                          setFormData({ ...formData, troop: e.target.value })
                        }
                        placeholder="e.g., Troop 123"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        placeholder="Age"
                        min="6"
                        max="21"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="scout@example.com"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModals}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddScout}
                  >
                    <i className="fas fa-save me-2"></i>
                    Add Scout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Scout Modal */}
      {showEditModal && selectedScout && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="fas fa-user-edit me-2"></i>
                    Edit Scout: {selectedScout.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModals}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter scout's full name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Troop</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.troop}
                        onChange={(e) =>
                          setFormData({ ...formData, troop: e.target.value })
                        }
                        placeholder="e.g., Troop 123"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        placeholder="Age"
                        min="6"
                        max="21"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="scout@example.com"
                      />
                    </div>
                  </form>

                  <div className="alert alert-info mt-3">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Scout ID:</strong> {selectedScout.id}
                    <br />
                    <strong>Created:</strong>{" "}
                    {new Date(selectedScout.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModals}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditScout}
                  >
                    <i className="fas fa-save me-2"></i>
                    Update Scout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .avatar-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .modal {
          background: rgba(0, 0, 0, 0.5);
        }

        .btn-group .btn {
          margin-right: 0.25rem;
        }

        .table tbody tr:hover {
          background-color: rgba(0, 123, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
