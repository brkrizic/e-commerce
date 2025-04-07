import React, { useState } from "react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <>
            <h5>General Settings</h5>
            <div className="mb-3">
              <label className="form-label">Site Name</label>
              <input type="text" className="form-control" placeholder="MyApp" />
            </div>
            <div className="mb-3">
              <label className="form-label">Logo URL</label>
              <input type="text" className="form-control" placeholder="https://..." />
            </div>
            <button className="btn btn-primary">Save</button>
          </>
        );
      case "users":
        return (
          <>
            <h5>User Roles & Permissions</h5>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="adminAccess" />
              <label className="form-check-label" htmlFor="adminAccess">
                Allow Admin Role Access
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="userEdit" />
              <label className="form-check-label" htmlFor="userEdit">
                Allow Users to Edit Profile
              </label>
            </div>
            <button className="btn btn-primary">Save</button>
          </>
        );
      case "email":
        return (
          <>
            <h5>Email Settings</h5>
            <div className="mb-3">
              <label className="form-label">SMTP Server</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">SMTP Port</label>
              <input type="number" className="form-control" />
            </div>
            <button className="btn btn-primary">Save</button>
          </>
        );
      case "security":
        return (
          <>
            <h5>Security Settings</h5>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="passwordPolicy" />
              <label className="form-check-label" htmlFor="passwordPolicy">
                Enforce Strong Passwords
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="twoFactor" />
              <label className="form-check-label" htmlFor="twoFactor">
                Enable 2FA (Two-Factor Authentication)
              </label>
            </div>
            <button className="btn btn-danger">Apply</button>
          </>
        );
      case "system":
        return (
          <>
            <h5>System Info</h5>
            <ul className="list-group">
              <li className="list-group-item">Version: 1.0.3</li>
              <li className="list-group-item">Uptime: 3 days</li>
              <li className="list-group-item text-success">Status: Running</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Admin Settings</h3>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>General</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Users</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "email" ? "active" : ""}`} onClick={() => setActiveTab("email")}>Email</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "security" ? "active" : ""}`} onClick={() => setActiveTab("security")}>Security</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "system" ? "active" : ""}`} onClick={() => setActiveTab("system")}>System</button>
        </li>
      </ul>

      <div>{renderTabContent()}</div>
    </div>
  );
}
export default AdminSettings;