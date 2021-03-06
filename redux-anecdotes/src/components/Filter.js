import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from "react-redux";

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterInput(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterInput: filter
}

const mapped = connect(null, mapDispatchToProps)(Filter)
export default mapped