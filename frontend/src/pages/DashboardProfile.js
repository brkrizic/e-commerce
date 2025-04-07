import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        location: ""
    });

    const [message, setMessage] = useState("");

    const userData = useSelector((state) => state?.auth?.user);

    useEffect(() => {
        // Simulate API call
        setUser({
            fullname: userData?.fullname,
            email: userData?.email,
            location: "New York, USA"
        });
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Profile updated 🎉");
    };

    const getInitial = (name) => {
        return name ? name.trim()[0].toUpperCase() : '';
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Your Profile</h2>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="row g-5">
                {/* Left Column – Profile Info */}
                <div className="col-md-4 text-center text-md-start">
            <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                style={{
                    width: "120px",
                    height: "120px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    userSelect: "none"
                }}
            >
                {getInitial(user.fullname)}
            </div>
                    <h5 className="mb-0">{user.fullname}</h5>
                    <p className="text-muted">{user.email}</p>
                    <p className="text-muted small">{user.location}</p>
                </div>

                {/* Right Column – Edit Form */}
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullname"
                                value={user.fullname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={user.location}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-dark px-4">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default DashboardProfile;