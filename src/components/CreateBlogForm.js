import { useState } from 'react'
import PropTypes from 'prop-types'
const CreateBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleAddBlog = async event => {
    event.preventDefault()

    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleAddBlog}>
        <div>
          <input
            id='title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder='Title'
          />
        </div>
        <div>
          <input
            id='author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder='Author'
          />
        </div>
        <div>
          <input
            id='url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button id='submit-button' type="submit">save</button><br />
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm