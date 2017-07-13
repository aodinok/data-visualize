const express = require('express')
const csv = require('fast-csv')
const fs = require('fs')
const _ = require('lodash')

const app = express()
const PATH_TO_CSV = './server/Video_Stats.csv'
const DATE_COL_NAME = 'Date'
const DEFAULT_X_METRIC = 'Date'
const DEFAULT_Y_METRIC = 'Fully On-Screen Measurable Impressions'

app.get('/api/metrics', (req, res) => {
  const stream = fs.createReadStream(PATH_TO_CSV, {encoding: 'utf8'})
  stream.on('data', data => {
    stream.close()
    const header = data.substr(0, data.indexOf('\n'))
    csv.fromString(header).on("data", arr => res.send(arr))
  })
})

app.get('/api/dates', (req, res) => {
  const dates = []
  csv.fromPath(PATH_TO_CSV, {headers: true})
     .on('data', data => {
       dates.push(data[DATE_COL_NAME])
      })
     .on('end', () => {
       res.send(_.uniq(dates).sort())
    })
})

app.get('/api/data', (req, res) => {

  const result = []
  const startDate = req.query.startDate && new Date(req.query.startDate)
  const endDate = req.query.endDate && new Date(req.query.endDate)
  const xMetric = req.query.xMetric || DEFAULT_X_METRIC
  const yMetric = req.query.yMetric || DEFAULT_Y_METRIC

  csv.fromPath(PATH_TO_CSV, {headers: true})
     .on('data', data => {
       if (startDate && startDate > new Date(data[DATE_COL_NAME])) return
       if (endDate && endDate < new Date(data[DATE_COL_NAME])) return
       result.push({
         [xMetric]: data[xMetric],
         [yMetric]: +data[yMetric]
       })
      })
     .on('end', () => {
       res.send(
         _.chain(result)
          .uniqBy(xMetric)
          .sortBy(xMetric)
          .value()
        )
    })
})

app.listen(4000, () => {
  console.log('Express server is listening on port 4000!')
})
