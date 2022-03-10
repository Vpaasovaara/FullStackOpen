import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogView = (props) => {
  const id = useParams().id
  const blogs = props.blogs
  const blog = blogs.find(blog => blog.id === id)
  const { reset: commentReset, ...comment } = useField('text', 'comment')
  const dispatch = useDispatch()

  const sendComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(id, { comment: comment.value }))
    commentReset()
  }

  return (
    <div className='container'>
      <h2>{blog.title}</h2>
      <a>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.author}</p>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
      <form className='my-3' onSubmit={sendComment}>
        <input name='comment' {...comment} />
        <button className='mx-3' type='submit'>Lähetä</button>
      </form>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}
const mapped = connect(mapStateToProps)(BlogView)

export default mapped
