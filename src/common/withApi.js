import React from 'react'
import { fetchResource } from './utils'

import './Spinner.css'

// TODO: replace with redux API middleware
const withApi = (WrappedComponent) => {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isLoading: false,
        pendingRequests: 0
      }
    }

    async apiCall (...params) {
      try {
        if (!this.state.pendingRequests) {
          this.setState({
            isLoading: true,
            pendingRequests: this.state.pendingRequests + 1
          })
        }
        return await fetchResource(...params)
      } catch (e) {
        console.warn(e)
      } finally {
        const { pendingRequests } = this.state
        this.setState({
          pendingRequests: pendingRequests - 1,
          isLoading: pendingRequests > 1
        })
      }
    }

    render () {
      return <WrappedComponent
        {...this.props}
        isLoading={this.state.isLoading}
        apiCall={this.apiCall.bind(this)}
       />
    }
  }
}
export default withApi
