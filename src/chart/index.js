import React, { Component } from 'react'
import { AutoSizer } from 'react-virtualized'
import { LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line } from 'recharts'

import './Chart.css'

class Chart extends Component {
  render() {
    // TODO: metrics should be taken from settings
    return (
      <AutoSizer>
        {({ width, height }) =>
          <LineChart width={width - 350} height={height} data={this.props.data}
            margin={{top: 55, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="Date"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Line type="monotone" dataKey="Fully On-Screen Measurable Impressions" stroke="#8884d8" activeDot={{r: 8}}/>
          </LineChart>
        }
      </AutoSizer>
    )
  }
}

export default Chart
