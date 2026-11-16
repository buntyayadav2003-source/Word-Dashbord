
import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Amit Patil",
      email: "amit@gmail.com",
      role: "User",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@gmail.com",
      role: "Manager",
    },
  ]);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please enter name and email");
      return;
    }

    if (editId) {
      setUsers(
        users.map((user) =>
          user.id === editId
            ? { ...user, name, email, role }
            : user
        )
      );
      setEditId(null);
    } else {
      const newUser = {
        id: Date.now(),
        name,
        email,
        role,
      };

      setUsers([...users, newUser]);
    }

    setName("");
    setEmail("");
    setRole("User");
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Users Management</h2>
          <p className="text-muted">
            Manage all your users here.
          </p>
        </div>
        <span className="badge bg-primary fs-6">
          Total Users: {users.length}
        </span>
      </div>

      {/* Add / Edit User */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h5 className="mb-3">
            {editId ? "Edit User" : "Add New User"}
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary me-2">
                  {editId ? "Update User" : "Add User"}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditId(null);
                      setName("");
                      setEmail("");
                      setRole("User");
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Search */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>All Users</h5>

            <input
              type="search"
              className="form-control"
              style={{ maxWidth: "280px" }}
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Users;
