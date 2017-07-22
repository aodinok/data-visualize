import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import ChartSettings from './chartSettings/index'
import Chart from './chart/index'
import withApi from './common/withApi'
import Spinner from './common/Spinner'

import './App.css'

class App extends Component {
  applySettings (settings) {
    this.props.apiCall('data', settings).then(data => {
      this.setState({
        data,
        settings
      })
    })
  }

  render () {
    return (
      <div className='app'>
        <h1 className='title'>Simple data-visualizer</h1>
        <h3 className='title'>Pick some options and press build button. Enjoy!</h3>
        <div className='content'>
          {this.props.isLoading && <Spinner color='#242C36' />}
          <ChartSettings onApply={this.applySettings.bind(this)} /> {/* Unfortunately decorators are not supported by create-react-app :-( */}
          {this.state && this.state.data && <Chart data={this.state.data} settings={this.state.settings} />}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  apiCall: PropTypes.func,
  isLoading: PropTypes.bool
}

export default withApi(App)
