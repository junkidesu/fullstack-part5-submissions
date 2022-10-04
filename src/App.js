import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

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

  const likeBlog = async (id, changedBlog) => {
    console.log(`like ${id}`)
    const updatedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map(b => b.id.toString() !== id ? b : updatedBlog))
  }

  const deleteBlog = async id => {
    try {
      console.log(`delete ${id}`)
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      setSuccess(true)
      setMessage('deleted successfully')
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
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button'>
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

      <div id='blogs'>
        {blogs
          .sort((b1, b2) => b1.likes - b2.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              username={user.username}
            />
          )}
      </div>
    </div>
  )
}

export default App
