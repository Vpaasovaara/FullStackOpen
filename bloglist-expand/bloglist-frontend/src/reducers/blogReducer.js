import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOG_ADD':
    return action.content
  case 'BLOG_UPDATE':
    return action.content
  case 'BLOG_INIT':
    return action.content
  case 'BLOG_SORT':
    return action.content
  case 'BLOG_DELETE':
    return action.content
  case 'BLOG_COMMENT':
    return action.content
  default:
    return state
  }
}

export const createBlog = (content, users) => {
  const res = window.localStorage.getItem('loggedBlogappUser')
  const obj = JSON.parse(res)
  const user = users.find(x => x.username === obj.username)

  let newBlog =  {
    title: content.title,
    author: user.username,
    url: content.url,
    userID: user.id
  }

  return async dispatch => {
    await blogService.create(newBlog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG_ADD',
      content: blogs
    })
  }
}

export const destroyBlog = (id, blogs) => {
  const copyBlogs = [...blogs]
  const newBlog = copyBlogs.filter(blog => blog.id === id)
  //console.log('newBlog', newBlog[0])
  if (window.confirm(`do you want to delete blog ${newBlog[0].title} by ${newBlog[0].author}`)) {
    return async dispatch => {
      const res = await blogService.destroy(id)
      console.log(res)
      if (res.error) throw ''
      const blogs = await blogService.getAll()
      dispatch({
        type: 'BLOG_DELETE',
        content: blogs
      })
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG_INIT',
      content: blogs
    })
  }
}

export const updateBlog = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blog = blogs.find(x => x.id === id)
    blog.likes++
    await blogService.update(id, blog)
    const updated = await blogService.getAll()
    dispatch({
      type: 'BLOG_UPDATE',
      content: updated
    })
  }
}

export const sortBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogsCopy = [...blogs]
    const content = blogsCopy.sort((a, b) => {
      return b.likes - a.likes
    })
    dispatch({
      type: 'BLOG_SORT',
      content: content
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await blogService.commentBlog(id, comment)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG_COMMENT',
      content: blogs
    })
  }
}

export default blogReducer