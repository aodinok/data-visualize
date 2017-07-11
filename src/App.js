import React, { Component } from 'react'
import './App.css'
import ChartSettings from './chartSettings/index.js'
import Chart from './chart/index.js'

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="title">Simple data-visualizer</h1>
        <h3 className="title">Pick some options and press build button. Enjoy!</h3>
        <ChartSettings />
        <Chart />
      </div>
    );
  }
}

export default App;
