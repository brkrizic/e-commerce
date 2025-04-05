import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { Navigate, useNavigate } from "react-router";
import ButtonBs from "../../components/ButtonComponent";
import LabelInputBs from "../../components/LabelInputComponent";
import TitleBs from "../../components/TitleComponent";

const LoginScreen = () => {
    const [email, setEmail] = useState(localStorage.getItem("justRegisteredUser") || "");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error, user, isLoggedIn } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(loginUser({ email, password }));

        localStorage.removeItem("justRegisteredUser");
    };

    if(isLoggedIn) {
        return <Navigate to="/dashboard" replace/>
    }

    return (
        <div className="container">
        <TitleBs type={'h2'}>Login</TitleBs>
        
        <form onSubmit={handleSubmit} className="mb-3">
            <LabelInputBs 
                lblChild={"Email Adress"} 
                lblType={"email"}
                inpType={"email"}
                inpId={"email"}
                inpPlaceholder={"Email"}
                inpValue={email}
                inpOnChange={(e) => setEmail(e.target.value)}
            />
            <LabelInputBs 
                lblChild={"Password"} 
                lblType={"password"}
                inpType={"password"}
                inpId={"password"}
                inpPlaceholder={"Password"}
                inpValue={password}
                inpOnChange={(e) => setPassword(e.target.value)}
            />

            {/* <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "black"}} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button> */}
            <ButtonBs type={"submit"} disabled={loading}>{loading ? "Logging in..." : "Login"}</ButtonBs>
        </form>

        {error && <p style={{ color: "red" }}>{error.message}</p>}

    </div>
    );
}
export default LoginScreen;