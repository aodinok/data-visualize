import React, { Component } from 'react'
import './ChartSettings.css'

class ChartSettings extends Component {
  async componentWillMount() {
    const response = await fetch('/api/metrics')
    const data = await response.json()
    this.setState({metrics: data})
  }

  render() {
    return (
      <div>
        hello world from setup
        {this.state && this.state.metrics.map(m => <span>{m}<br/></span>)}
      </div>
    );
  }
}

export default ChartSettings
