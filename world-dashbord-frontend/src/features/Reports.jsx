
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaDownload } from "react-icons/fa";
import { getRegionStats, getTop10Countries } from "./dashboardService";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

const Reports = () => {
  const [regionData, setRegionData] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      setError("");

      const [regions, countries] = await Promise.all([
        getRegionStats(),
        getTop10Countries(),
      ]);

      const formattedRegions = regions.map((r) => ({
        ...r,
        population: Number(r.population),
        count: Number(r.count),
      }));

      setRegionData(formattedRegions);
      setTopCountries(countries);
    } catch (err) {
      console.error("Reports Error:", err);
      setError("Reports डेटा लोड करताना अडचण आली. Backend तपास.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const exportToCSV = () => {
    const headers = [
      "Rank",
      "Country",
      "Region",
      "Continent",
      "Population",
    ];

    const rows = topCountries.map((c, idx) => [
      idx + 1,
      `"${c.Name || ""}"`,
      `"${c.Region || ""}"`,
      `"${c.Continent || ""}"`,
      c.Population || 0,
    ].join(","));

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "World_Population_Report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <Loader message="Generating Reports..." />;
  }

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="mb-1 fw-bold">Reports & Analytics</h2>
          <p className="text-muted mb-0">
            MySQL World Database Population Insights
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="btn btn-primary d-flex align-items-center gap-2"
          disabled={topCountries.length === 0}
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchReportsData}
        />
      )}

      {!error && (
        <>
          {/* Charts */}
          <div className="row g-4 mb-4">

            {/* Population Bar Chart */}
            <div className="col-lg-6">
              <div
                className="card border-0 shadow-sm p-4 h-100"
                style={{ borderRadius: "12px" }}
              >
                <h6 className="fw-bold mb-3">
                  Population by Continent
                </h6>

                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11 }}
                      />

                      <YAxis
                        tickFormatter={(val) =>
                          `${(val / 1e9).toFixed(1)}B`
                        }
                        tick={{ fontSize: 11 }}
                      />

                      <Tooltip
                        formatter={(val) => [
                          Number(val).toLocaleString(),
                          "Population",
                        ]}
                      />

                      <Bar
                        dataKey="population"
                        fill="#2563eb"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Countries Pie Chart */}
            <div className="col-lg-6">
              <div
                className="card border-0 shadow-sm p-4 h-100"
                style={{ borderRadius: "12px" }}
              >
                <h6 className="fw-bold mb-3">
                  Countries Count by Continent
                </h6>

                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        label
                      >
                        {regionData.map((item, idx) => (
                          <Cell
                            key={item.name}
                            fill={COLORS[idx % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Top 10 Countries Table */}
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            <div className="card-header bg-white border-bottom py-3">
              <h6 className="mb-0 fw-bold">
                Top 10 Most Populated Countries
              </h6>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Rank</th>
                    <th>Country</th>
                    <th>Region</th>
                    <th>Continent</th>
                    <th className="text-end pe-4">
                      Population
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topCountries.length > 0 ? (
                    topCountries.map((c, idx) => (
                      <tr key={c.Name}>
                        <td className="ps-4 fw-semibold">
                          #{idx + 1}
                        </td>

                        <td className="fw-medium">
                          {c.Name}
                        </td>

                        <td>{c.Region || "-"}</td>

                        <td className="text-muted">
                          {c.Continent || "-"}
                        </td>

                        <td className="text-end pe-4 fw-bold">
                          {Number(c.Population).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No country data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
