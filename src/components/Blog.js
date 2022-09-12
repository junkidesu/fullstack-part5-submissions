import { useState } from 'react'
const Blog = ({ blog }) => {
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
        {blog.likes} <button>like</button> <br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog