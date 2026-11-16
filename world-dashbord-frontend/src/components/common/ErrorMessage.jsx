
import React from "react";

import {
  FaExclamationCircle,
  FaTimes,
  FaRedo,
} from "react-icons/fa";



const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
  title = "Error",
  type = "danger",
  onRetry,
  onClose,
}) => {
  return (
    <div
      className={`alert alert-${type} error-message d-flex align-items-start justify-content-between`}
      role="alert"
    >
      <div className="d-flex align-items-start gap-3">

        {/* Error Icon */}
        <FaExclamationCircle className="error-icon" />

        {/* Error Content */}
        <div>
          <h6 className="error-title mb-1">
            {title}
          </h6>

          <p className="error-text mb-0">
            {message}
          </p>

          {/* Retry Button */}
          {onRetry && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger mt-3"
              onClick={onRetry}
            >
              <FaRedo className="me-2" />
              Try Again
            </button>
          )}
        </div>

      </div>

      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          className="error-close"
          onClick={onClose}
          aria-label="Close error message"
        >
          <FaTimes />
        </button>
      )}

    </div>
  );
};

export default ErrorMessage;
