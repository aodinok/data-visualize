import React, { Component } from 'react'
import DropdownSelect from '../common/DropdownSelect'
import { fetchResource } from '../utils'

import './ChartSettings.css'

class ChartSettings extends Component {
  constructor () {
    super()
    this.state = {
      metrics: [],
      dates: [],
      config: {}
    }
  }

  async componentDidMount () {
    this.setState({
      metrics: await fetchResource('metrics'),
      dates: await fetchResource('dates')
    })
  }

  applyBtnClick () {
    this.props.onApply && this.props.onApply(this.state.config)
  }

  setOption (name, value) {
    this.setState({
      config: {
        ...this.state.config,
        [name]: value
      }
    })
  }

  render() {
    return (
      <div className='settingsContainer'>
        <h4 className='pTitle'>Settings:</h4>
        <div className='panel'>
          <label>Start Date:</label>
          <DropdownSelect
            value={this.state.config.startDate}
            onChange={this.setOption.bind(this, 'startDate')}
            options={this.state.dates}
          />
          <label>End Date:</label>
          <DropdownSelect
            value={this.state.config.endDate}
            onChange={this.setOption.bind(this, 'endDate')}
            options={this.state.dates}
          />
          <label>X Metric:</label>
          <DropdownSelect
            value={this.state.config.xMetric}
            onChange={this.setOption.bind(this, 'xMetric')}
            options={this.state.metrics}
          />
          <label>Y Metric:</label>
          <DropdownSelect
            value={this.state.config.yMetric}
            onChange={this.setOption.bind(this, 'yMetric')}
            options={this.state.metrics}
          />
          <label>Graph:</label>
          <DropdownSelect
            value={this.state.config.chartType}
            onChange={this.setOption.bind(this, 'chartType')}
            options={['Line Chart']}
          />
          <button
            onClick={this.applyBtnClick.bind(this)}
            className='applyBtn'
          >
            Build
          </button>
        </div>
      </div>
    )
  }
}

export default ChartSettings
