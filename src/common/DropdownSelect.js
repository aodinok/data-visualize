import React from 'react'
import PropTypes from 'prop-types'

import { getHash } from '../utils'
import './Dropdown.css'

const DropdownSelect = (props) => (
  <select className='dropdown'>
  {props.options && props.options.map(i =>
    <option key={getHash(i)} value={i}>{i}</option>)}
  </select>
)

DropdownSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string)
}

export default DropdownSelect
