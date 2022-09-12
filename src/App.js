import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    'display': visible
      ? 'none'
      : ''
  }

  const showWhenVisible = {
    'display': visible
      ? ''
      : 'none'
  }

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>
          cancel
        </button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>
          {props.buttonLabel}
        </button>
      </div>
    </div>
  )
}
const Notification = (props) => {
  const notificationColor = props.success
    ? 'green'
    : 'red'

  const style = {
    backgroundColor: 'lightgrey',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '20px',
    color: notificationColor,
    borderSize: '3px',
    borderColor: notificationColor,
    borderStyle: 'solid',
    borderRadius: '10px'
  }

  if (!props.message) {
    return null
  }

  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

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
          title <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          author <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          url <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type="submit">save</button><br />
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      setSuccess(true)
      setMessage(`logged in as ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)

      setSuccess(false)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInUser')

    setSuccess(true)
    setMessage('logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = async newBlog => {
    try {
      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog))

      setSuccess(true)
      setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setSuccess(false)
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification message={message} success={success} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button>
            log in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} success={success} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          log out
        </button>
      </p>

      <Togglable buttonLabel="create new">
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
