import React, { Component } from 'react'
import DropdownSelect from '../common/DropdownSelect'
import { fetchResource } from '../utils'

import './ChartSettings.css'

class ChartSettings extends Component {
  async componentDidMount() {
    this.setState({
      metrics: await fetchResource('metrics'),
      dates: await fetchResource('dates')
    })
  }

  applyBtnClick() {
    this.props.onApply && this.props.onApply({
      // TODO: replace with actual choosed settings by user
      startDate: '6/10/17',
      endDate: '7/5/17',
      metric: 'Human Rate',
      chart: 'Line Chart'
    })
  }

  render() {
    return (
      <div className='settingsContainer'>
        <h4 className='pTitle'>Settings:</h4>
        <div className='panel'>
          <label>Start Date:</label>
          <DropdownSelect options={this.state && this.state.dates} />
          <label>End Date:</label>
          <DropdownSelect options={this.state && this.state.dates} />
          <label>Metric:</label>
          <DropdownSelect options={this.state && this.state.metrics} />
          <label>Graph:</label>
          <DropdownSelect options={['Line Chart']} />
          <button onClick={this.applyBtnClick.bind(this)} className='applyBtn'>Build</button>
        </div>
      </div>
    )
  }
}

export default ChartSettings
