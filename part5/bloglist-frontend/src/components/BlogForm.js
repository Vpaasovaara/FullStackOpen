import React from 'react'

const BlogForm = (props) => (
  <form className="container" id="submitForm" onSubmit={props.addBlog}>
    <div className="row my-3">{props.user.username} logged in</div>
    <h2 className="row my-3">Add your new blog here</h2>
    <div className="row my-3">
      <label></label>
      <input
        id='inputTitle'
        placeholder="Title"
        value={props.title}
        onChange={({ target }) =>
          props.setTitle(target.value)}
      />
    </div>
    <div className="row my-3">
      <label></label>
      <input
        id='urlTitle'
        placeholder="Url"
        value={props.url}
        onChange={({ target }) =>
          props.setUrl(target.value)}
      />
    </div>
    <div className="row">
      <button className="btn btn-primary col" type="submit">save</button>
      <div className="col-6"></div>
      <button className="btn btn-danger col" onClick={() => props.handleLogout()}>Logout</button>
    </div>
  </form>
)

export default BlogForm