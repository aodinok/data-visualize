const _ = require('lodash')
const csv = require('fast-csv')
const {
  DATE_COL_NAME,
  PATH_TO_CSV
} = require('../constants')

module.exports = (req, res) => {
  const dates = []
  csv.fromPath(PATH_TO_CSV, {headers: true})
    .on('data', data => {
      dates.push(data[DATE_COL_NAME])
    })
    .on('end', () => {
      res.send(
        _.uniq(dates)
         .sort((a, b) => new Date(a) - new Date(b))
       )
    })
}
