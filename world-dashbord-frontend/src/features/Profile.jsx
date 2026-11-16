
import React from "react";

const Profile = () => {
  return (
    <div className="container-fluid p-4">

      <h2 className="mb-4">My Profile</h2>

      <div className="row g-4">

        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">

            <img
              src="/sourabh.jpg.jpeg"
              alt="Sourabh Yadav"
              className="rounded-circle mx-auto mb-3"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "4px solid #0d6efd",
              }}
            />

            <h4 className="fw-bold">Sourabh Yadav</h4>

            <p className="text-muted mb-3">
              Administrator
            </p>

            <span className="badge bg-success mx-auto">
              Admin Profile
            </span>

          </div>
        </div>

        {/* Profile Information */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4">

            <h4 className="mb-4">Personal Information</h4>

            <div className="row mb-3">
              <div className="col-sm-4 text-muted">
                Full Name
              </div>
              <div className="col-sm-8 fw-semibold">
                Sourabh Yadav
              </div>
            </div>

            <hr />

            <div className="row mb-3">
              <div className="col-sm-4 text-muted">
                Email Address
              </div>
              <div className="col-sm-8">
                Not added
              </div>
            </div>

            <hr />

            <div className="row mb-3">
              <div className="col-sm-4 text-muted">
                Account Role
              </div>
              <div className="col-sm-8">
                Administrator
              </div>
            </div>

            <hr />

            <div className="row mb-3">
              <div className="col-sm-4 text-muted">
                Project
              </div>
              <div className="col-sm-8">
                World Dashboard
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
