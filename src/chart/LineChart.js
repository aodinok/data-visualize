import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LineChart as Chart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line } from 'recharts'

class LineChart extends Component {
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
        <Line type='monotone' dataKey={this.props.settings.yMetric} stroke='#8884d8' activeDot={{r: 8}} />
      </Chart>
    )
  }
}

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  settings: PropTypes.shape({
    xMetric: PropTypes.string,
    yMetric: PropTypes.string
  })
}

export default LineChart
