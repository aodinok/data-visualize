import React from 'react'
import PropTypes from 'prop-types'

import './Spinner.css'

const Spinner = ({color}) => {
  const style = {backgroundColor: color}
  return (
    <div className='spinner'>
      <div className='rect1' style={style} />
      <div className='rect2' style={style} />
      <div className='rect3' style={style} />
      <div className='rect4' style={style} />
      <div className='rect5' style={style} />
    </div>
  )
}

Spinner.propTypes = {
  color: PropTypes.string
}

export default Spinner
