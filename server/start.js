const express = require('express')
const csv = require('fast-csv')
const fs = require('fs')
const _ = require('lodash')

const app = express()
const PATH_TO_CSV = './server/Video_Stats.csv'

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
       dates.push(data['Date'])
      })
     .on('end', () => {
       res.send(_.uniq(dates).sort())
    })
})

app.get('/api/data', (req, res) => {
  const result = []
  csv.fromPath(PATH_TO_CSV, {headers: true})
     .on('data', data => {
        result.push(data)
      })
     .on('end', () => {
       res.send(result)
    })
})

app.listen(4000, () => {
  console.log('Express server is listening on port 4000!')
})
