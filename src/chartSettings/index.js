import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DropdownSelect from '../common/DropdownSelect'
import Spinner from '../common/Spinner'
import withApi from '../common/withApi'
import chartTypes from '../chart/types'

import './index.css'

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
      metrics: await this.props.apiCall('metrics'),
      dates: await this.props.apiCall('dates')
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

  render () {
    const { isLoading } = this.props
    return (
      <div className='settingsContainer'>
        <h4 className='pTitle'>Settings:</h4>
        <div className={'panel' + (isLoading ? ' panelLoading' : '')}>
          {isLoading && <Spinner color='#2375DF' />}
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
            options={chartTypes}
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

ChartSettings.propTypes = {
  onApply: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default withApi(ChartSettings)
