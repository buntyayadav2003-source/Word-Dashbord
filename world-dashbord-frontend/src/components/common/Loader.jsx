
import React from "react";


const Loader = ({
  message = "Loading...",
  size = "md",
  color = "primary",
  fullScreen = false,
}) => {

  const spinnerSize = {
    sm: "spinner-border-sm",
    md: "",
    lg: "loader-lg",
  };

  return (
    <div
      className={`loader-container ${
        fullScreen ? "loader-fullscreen" : ""
      }`}
    >
      <div className="text-center">

        <div
          className={`spinner-border text-${color} ${
            spinnerSize[size] || ""
          }`}
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        {message && (
          <p className="loader-message mt-3 mb-0">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default Loader;
