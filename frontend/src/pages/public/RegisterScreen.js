import React, { useState } from "react";
import HomeScreen from "./HomeScreen";
import SignService from "../../api/SignService";
import { useNavigate } from "react-router";
import LabelInputBs from "../../components/LabelInputComponent";
import ButtonBs from "../../components/ButtonComponent";
import TitleBs from "../../components/TitleComponent";

const RegisterScreen = () => {
    const [data, setData] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const registerUser = async(userData) => {
        try {
            const response = await SignService.registerUser(userData);
            console.log("Registration Successful:", response);
            localStorage.setItem("justRegisteredUser", response.user.email);
            navigate("/login");
        } catch (error) {
            console.error("Registration Failed:", error);
        }
    };
    
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        registerUser(data);
    };
    

    return (
        <div className="container">
            <TitleBs type={'h2'}>Register</TitleBs>
            <form onSubmit={handleSubmit}>
                {/* <input type="text" name="fullname" placeholder="Fullname" value={data.fullname} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} required />
                <button type="submit">Register</button> */}

                <LabelInputBs 
                    lblChild={"Fullname"} 
                    lblType={"text"}
                    inpType={"text"}
                    inpPlaceholder={"* John Doe"}
                    inpValue={data.fullname}
                    inpName={"email"}
                    inpOnChange={handleChange}
                />
                <LabelInputBs 
                    lblChild={"Email"} 
                    lblType={"email"}
                    inpType={"email"}
                    inpPlaceholder={"* johndoe@gmail.com"}
                    inpValue={data.email}
                    inpName={"email"}
                    inpOnChange={handleChange}
                />
                <LabelInputBs 
                    lblChild={"Password"} 
                    lblType={"password"}
                    inpType={"password"}
                    inpPlaceholder={"* ***"}
                    inpValue={data.password}
                    inpName={"password"}
                    inpOnChange={handleChange}
                />    

                <ButtonBs type={"submit"}>Register</ButtonBs>
            </form>
        </div>
    );
}
export default RegisterScreen;