const express = require('express')
const csv = require('fast-csv')
const fs = require('fs')

const app = express()
const PATH_TO_CSV = './server/Video_Stats.csv'

app.get('/api/metrics', function (req, res) {
  var stream = fs.createReadStream(PATH_TO_CSV, {encoding: 'utf8'})
  stream.on('data', data => {
    stream.close()
    const header = data.substr(0, data.indexOf('\n'))
    res.send(header.split(','))
  })
})

app.listen(4000, function () {
  console.log('Express server is listening on port 4000!')
})
