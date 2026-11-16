
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchPopulation = async () => {
      try {
        const response = await fetch(
          "http://localhost:5011/dashboard/top10PopulatedCon"
        );

        if (!response.ok) {
          throw new Error("API data not found");
        }

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Population data load failed");
      } finally {
        setLoading(false);
      }
    };

    fetchPopulation();
  }, []);

  const totalPopulation = countries.reduce(
    (total, country) =>
      total + Number(country.Population || 0),
    0
  );

  // Search country by name
  const filteredCountries = countries.filter((country) =>
    String(country.Name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-3">Dashboard</h2>

      <p className="text-muted">
        Welcome to World Dashboard!
      </p>

      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h6>Top 10 Population</h6>
            <h3>
              {loading
                ? "Loading..."
                : error
                ? "--"
                : totalPopulation.toLocaleString("en-IN")}
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h6>Total Countries (API Results)</h6>
            <h3>
              {loading ? "Loading..." : error ? "--" : countries.length}
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h6>Total Regions</h6>
            <h3>--</h3>
            <small className="text-muted">
              Region API not connected
            </small>
          </div>
        </div>

      </div>

      <div className="card shadow-sm p-4">
        <h4 className="mb-3">
          {search
            ? `Search Results: ${search}`
            : "Top 10 Populated Countries"}
        </h4>

        {loading ? (
          <p>Loading countries...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : filteredCountries.length === 0 ? (
          <p className="text-muted">
            No matching country found.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Sr. No.</th>
                  <th>Country Name</th>
                  <th>Population</th>
                </tr>
              </thead>

              <tbody>
                {filteredCountries.map((country, index) => (
                  <tr key={country.Name}>
                    <td>{index + 1}</td>
                    <td>{country.Name}</td>
                    <td>
                      {Number(country.Population).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
