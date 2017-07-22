const csv = require('fast-csv')
const _ = require('lodash')
const {
  DEFAULT_X_METRIC,
  DEFAULT_Y_METRIC,
  DATE_COL_NAME,
  PATH_TO_CSV
} = require('../constants')

module.exports = (req, res) => {
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
        [xMetric]: data[xMetric].replace('%', ''),
        [yMetric]: +(data[yMetric].replace('%', ''))
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
}
