import { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setFull(!full)}>
          {full ? 'hide' : 'view'}
        </button>
      </div>
      <div style={detailsStyle}>
        {blog.url} <br />
        {blog.likes}
        <button onClick={handleLikeBlog}>like</button> <br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog