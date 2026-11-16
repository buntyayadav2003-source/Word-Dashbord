
const db = require('../config/db');

async function totalPopulation(req, res) {
    try {
        const q1 = "SELECT SUM(Population) AS totalPopulation FROM country";
        const [population] = await db.query(q1);

        const totalPopulation = population[0].totalPopulation;

        res.status(200).send({
            totalPopulation: totalPopulation
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "server error" });
    }
}

async function top10PopuContry(req, res) {
    try {
       const q2 = `
  SELECT Name, Region, Continent, Population
  FROM country
  ORDER BY Population DESC
  LIMIT 10
`;

        const [countries] = await db.query(q2);

        res.status(200).send(countries);
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "server error" });
    }
}

// Region Statistics API
async function regionStats(req, res) {
    try {
        const q3 = `
            SELECT
                Continent AS name,
                SUM(Population) AS population,
                COUNT(*) AS count
            FROM country
            GROUP BY Continent
            ORDER BY population DESC
        `;

        const [regions] = await db.query(q3);

        res.status(200).send(regions);
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "server error" });
    }
}

module.exports = {
    totalPopulation,
    top10PopuContry,
    regionStats
};
