import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoSizer } from 'react-virtualized'
import { CHARTS } from './types'

import './index.css'

class Chart extends Component {
  render () {
    const ChartTypeRenderer = CHARTS[this.props.settings.chartType]
    if (!ChartTypeRenderer) return null
    return (
      <AutoSizer>
        {({width, height}) =>
          <ChartTypeRenderer
            {...this.props}
            width={width}
            height={height}
          />}
      </AutoSizer>
    )
  }
}

Chart.propTypes = {
  settings: PropTypes.shape({
    chartType: PropTypes.string
  })
}

export default Chart
