import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sortBlogs } from '../reducers/blogReducer'


const Buttons = () => {
  const dispatch = useDispatch()

  const sortByLikes = () => {
    dispatch(sortBlogs())
  }

  const style = {
    color: 'inherit',
    textDecoration: 'inherit'
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <button
            onClick={() => sortByLikes()}>
            Sort by likes
          </button>
        </div>
        <div className='col'>
          <button>
            <Link to='/users' style={style}>Show All Users</Link>
          </button>
        </div>
        <div className='col'>
          <button>
            <Link to='/' style={style}>Show All Blogs</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Buttons