import React from "react";

const LabelInputBs = ({ lblChild, lblType, inpType, inpId, inpPlaceholder, inpValue, inpOnChange, inpName }) => {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={lblType}>{lblChild}</label>
            <input
                type={inpType}
                id={inpId}
                name={inpName}
                className="form-control"
                placeholder={inpPlaceholder}
                value={inpValue}
                onChange={inpOnChange}
                required
            />
        </div>
    );
};

export default LabelInputBs;