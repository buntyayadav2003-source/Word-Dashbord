
import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("Sourabh Yadav");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    const settings = {
      name,
      email,
      darkMode,
      notifications,
    };

    localStorage.setItem("userSettings", JSON.stringify(settings));
    setMessage("Settings saved successfully!");
  };

  return (
    <div className="container-fluid py-3">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Settings</h2>
        <p className="text-muted">
          Manage your account and application preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Profile Settings</h5>
        </div>

        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-4">
            <img
              src="./sourabh.jpg.jpeg"
              alt="Sourabh Yadav"
              width="75"
              height="75"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <h6 className="fw-bold mb-1">Sourabh Yadav</h6>
              <small className="text-muted">Administrator</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Appearance</h5>
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Dark Mode</h6>
              <small className="text-muted">
                Enable dark appearance preference
              </small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Notifications</h5>
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Enable Notifications</h6>
              <small className="text-muted">
                Receive dashboard notifications
              </small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notifications}
                onChange={(e) =>
                  setNotifications(e.target.checked)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Password Settings */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Security</h5>
        </div>

        <div className="card-body">
          <h6>Change Password</h6>
          <p className="text-muted mb-0">
            Password changes require backend authentication.
            This section is currently a placeholder.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary px-4"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

    </div>
  );
};

export default Settings;
