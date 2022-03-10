import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

const Userblogs = (props) => {
  const id = useParams().id
  const author = props.users.find(author => author.id === id)
  const blogs = props.blogs.filter(blogs => blogs.author === author.username)

  return (
    <div className='container'>
      <ul className='list-group my-3'>
        {blogs.map(blog =>
          <li className='list-group-item' key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login,
    render: state.render,
    users: state.users
  }
}
const mapped = connect(mapStateToProps)(Userblogs)
export default mapped
