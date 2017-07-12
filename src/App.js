import React, { Component } from 'react'
import ChartSettings from './chartSettings/index'
import Chart from './chart/index'
import { fetchResource } from './utils'
import { chain } from 'lodash'

import './App.css'

class App extends Component {
  applySettings (settings) {
    fetchResource('data', settings).then(data => {
      this.setState({
        // TODO: this logic should be on server side, also metrics should be choosed based on passed settings
        data: chain(data).uniqBy('Date').sortBy('Date').value().map(i => ({
          'Fully On-Screen Measurable Impressions': +i['Fully On-Screen Measurable Impressions'],
          'Date': i['Date']
          })
        ),
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
          {this.state && this.state.data && <Chart data={this.state.data} />}
        </div>
      </div>
    );
  }
}

export default App;
