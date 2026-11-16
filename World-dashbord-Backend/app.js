const express = require('express')
require('dotenv').config()
const cors = require('cors')
const db = require('./config/db')
const dashboardRoute = require('./roout/dashboardRoute')

const app = express()

const port = process.env.PORT || 5011

app.use(express.json())
app.use(cors())
//http://localhost:5011/dashboard/top10PopulatedCon
app.use('/dashboard', dashboardRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))