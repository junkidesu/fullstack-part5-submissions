import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel }) => {
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
        {children}
        <button onClick={() => setVisible(false)} className='hide-button'>
                    cancel
        </button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)} className='show-button'>
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable