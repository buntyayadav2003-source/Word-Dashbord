
import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  color = "primary",
  percentage,
  trend = "up",
  description = "Compared to last month",
}) => {
  return (
    <div className="card stat-card border-0 shadow-sm h-100">
      <div className="card-body p-4">

        {/* Card Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>
            <p className="stat-title mb-1">
              {title}
            </p>

            <h3 className="stat-value mb-0">
              {value}
            </h3>
          </div>

          {/* Icon */}
          <div className={`stat-icon bg-${color}-subtle text-${color}`}>
            {icon}
          </div>

        </div>

        {/* Card Footer */}
        <div className="d-flex align-items-center gap-2 flex-wrap">

          {percentage && (
            <span
              className={`stat-percentage ${
                trend === "up" ? "text-success" : "text-danger"
              }`}
            >
              {trend === "up" ? "↑" : "↓"} {percentage}
            </span>
          )}

          <span className="stat-description">
            {description}
          </span>

        </div>

      </div>
    </div>
  );
};

export default StatCard;
