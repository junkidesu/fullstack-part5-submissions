import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
  const [full, setFull] = useState(false)

  const blogStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: '5px',
    paddingTop: '10px',
    paddingLeft: '2px',
    marginTop: '5px',
    marginBottom: '5px'
  }

  const detailsStyle = {
    display: full
      ? ''
      : 'none'
  }

  const handleLikeBlog = async () => {
    const changedBlog = {
      ...blog, likes: blog.likes + 1
    }
    await likeBlog(blog.id.toString(), changedBlog)
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id.toString())
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setFull(!full)}>
          {full ? 'hide' : 'view'}
        </button>
      </div>
      <div style={detailsStyle} className='blogDetails'>
        {blog.url} <br />
        {blog.likes}
        <button onClick={handleLikeBlog}>like</button> <br />
        {blog.user.name} <br />
        {username === blog.user.username
          ? <button onClick={handleDeleteBlog}>remove</button>
          : null
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog