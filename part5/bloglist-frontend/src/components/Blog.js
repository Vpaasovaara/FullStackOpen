import React, { useState } from 'react'


const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  return (
    <tr className="table-light">
      <th scope="row" className="blog">
        {!visible
          ? <NotVisible blog={blog}/>
          : <IsVisible blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>}
      </th>
      <td>{blog.author}</td>
      <td>
        <div
          className="btn btn-primary"
          onClick={() => setVisible(!visible)}
        >
          {!visible ? 'Show' : 'Hide'}
        </div>
      </td>
    </tr>
  )}

const IsVisible = ({ blog, addLike, deleteBlog }) => (
  <div>
    {blog.title}
    <br/>
    {blog.url}
    <br/>
    Likes: <i>{blog.likes}</i>
    <button
      className="btn btn-info mx-3"
      onClick={() => addLike(blog.id)}>
      Like
    </button>
    <br/>
    <div
      className="btn btn-danger my-3"
      onClick={() => deleteBlog(blog.id)}>
      Delete blog
    </div>
  </div>
)

const NotVisible = ({ blog }) => (
  <div>
    {blog.title}
  </div>
)



export default Blog