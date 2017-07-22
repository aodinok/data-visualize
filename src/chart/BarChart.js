import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarChart as Chart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts'

class BarChart extends Component {
  render () {
    return (
      <Chart
        width={this.props.width - 350}
        height={this.props.height}
        data={this.props.data}
        margin={{top: 55, right: 30, left: 20, bottom: 5}}
      >
        <XAxis dataKey={this.props.settings.xMetric} />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.settings.yMetric} fill='#8884d8' />
      </Chart>
    )
  }
}

BarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  settings: PropTypes.shape({
    xMetric: PropTypes.string,
    yMetric: PropTypes.string
  })
}

export default BarChart
