import React, { Component } from 'react'
import ChartSettings from './chartSettings/index'
import Chart from './chart/index'
import { fetchResource } from './utils'

import './App.css'

class App extends Component {
  applySettings (settings) {
    fetchResource('data', settings).then(data => {
      this.setState({
        data,
        settings
      })
    })
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Simple data-visualizer</h1>
        <h3 className="title">Pick some options and press build button. Enjoy!</h3>
        <div className='content'>
          <ChartSettings onApply={this.applySettings.bind(this) /* Unfortunately decorators are not supported by create-react-app :-( */} />
          {this.state && this.state.data && <Chart data={this.state.data} settings={this.state.settings} />}
        </div>
      </div>
    );
  }
}

export default App;
