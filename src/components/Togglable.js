import { useState } from 'react'

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
                <button onClick={() => setVisible(false)}>
                    cancel
                </button>
            </div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
}

export default Togglable