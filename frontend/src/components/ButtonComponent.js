import React from "react";

const ButtonBs = ({ onClick, children, type, disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled} type={type} className="btn btn-primary" style={{ backgroundColor: "black"}}>{children}</button>
    );
}
export default ButtonBs