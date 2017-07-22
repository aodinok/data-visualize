const express = require('express')

const apiData = require('./api/data')
const apiDates = require('./api/dates')
const apiMetrics = require('./api/metrics')

const app = express()

app.get('/api/metrics', apiMetrics)
app.get('/api/dates', apiDates)
app.get('/api/data', apiData)

app.listen(4000, () => console.log('Express server is listening on port 4000!'))
