import React from "react";

const BsActionButton = ({
  label,
  variant = "primary",  // Default to primary, can be success, warning, danger, etc.
  dataBsTarget,
  disabled = false,
  onClick,
  type = "button"
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      data-bs-toggle={dataBsTarget ? "modal" : undefined}
      data-bs-target={dataBsTarget}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BsActionButton;
