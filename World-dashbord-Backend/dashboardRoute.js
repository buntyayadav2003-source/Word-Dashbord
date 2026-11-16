
const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.get('/totalPopulation', dashboardController.totalPopulation);

router.get('/top10PopulatedCon', dashboardController.top10PopuContry);

router.get('/regionStats', dashboardController.regionStats);

module.exports = router;
