const fs = require('fs')
const csv = require('fast-csv')
const {
  PATH_TO_CSV
} = require('../constants')

module.exports = (req, res) => {
  const stream = fs.createReadStream(PATH_TO_CSV, {encoding: 'utf8'})
  stream.on('data', data => {
    stream.close()
    const header = data.substr(0, data.indexOf('\n'))
    csv.fromString(header).on('data', arr => res.send(arr))
  })
}
