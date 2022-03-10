import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  const users = props.users
  console.log(users)

  return (
    <div className='container'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>User</th>
            <th scope='col'>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr className="table-light" key={user.id}>
              <th scope="row"><Link to={`${user.id}`}>{user.username}</Link></th>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login,
    users: state.users,
    render: state.render
  }
}
const mapped = connect(mapStateToProps)(UserList)
export default mapped