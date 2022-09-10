import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleAddBlog = async event => {
    event.preventDefault()
    console.log('save', newTitle)

    try {
      const newBlog = {
        id: Math.floor(Math.random() * 10000),
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }

      await blogService.create(newBlog)

      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
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

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          log out
        </button>
      </p>

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
        <button>save</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
