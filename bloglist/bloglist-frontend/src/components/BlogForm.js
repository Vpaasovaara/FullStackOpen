import React, { useState } from 'react'

const BlogForm = (props) => {

  const [ showCreate, setShowCreate ] = useState(false)

  if (showCreate) {
    return (
      <Fullform props={props} setShowCreate={setShowCreate}/>
    )
  } else {
    return (
      <MinForm props={props} setShowCreate={setShowCreate} />
    )
  }
}

const Fullform = ({ props, setShowCreate }) => (
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
    <div className="row justify-content-start">
      <button className="btn btn-primary col-2 mx-3" type="submit">save</button>
      <button className="btn btn-warning col-2 mx-3" onClick={() => setShowCreate(false)}>Close</button>
      <button className="btn btn-danger col-2 mx-3" onClick={() => props.handleLogout()}>Logout</button>
    </div>
  </form>
)

const MinForm = ({ props, setShowCreate }) => (
  <div className="container">
    <div className="row my-3">{props.user.username} logged in</div>
    <div className="row">
      <button className="btn btn-primary col-2 mx-3" id="blogCreate" onClick={() => setShowCreate(true)}>Create Blog</button>
    </div>
  </div>
)

export default BlogForm