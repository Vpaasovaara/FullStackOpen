import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { initializeBlogs, updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { notificationOn } from '../reducers/notificationReducers'


const BlogList = (props) => {
  const dispatch = useDispatch()

  const addLike = (id) => {
    dispatch(updateBlog(id))
  }

  const deleteBlog = async(id) => {
    let copyBlogs = [...props.blogs]
    let newBlog = copyBlogs.filter(blog => blog.id === id)

    try {
      if (window.confirm(`do you want to delete blog ${newBlog[0].title} by ${newBlog[0].author}`)) {
        await blogService.destroy(id)
        dispatch(initializeBlogs())
      }
    } catch (exception) {
      dispatch(notificationOn('You are not authorized to delete this blog', 'danger', 5)) // 1. content 2. type 3. time/secs
    }
  }

  return (
    <div className='container my-3'>
      <h2>blogs</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Author</th>
            <th scope='col'>Info</th>
          </tr>
        </thead>
        <tbody>
          {props.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}/>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}
const mapped = connect(mapStateToProps)(BlogList)

export default mapped