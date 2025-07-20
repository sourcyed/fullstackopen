import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      {!visible && (
        <button
          onClick={toggleVisibility}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {props.buttonLabel}
        </button>
      )}

      {visible && (
        <div className="mt-4 p-4 border rounded bg-gray-50 shadow-sm">
          {props.children}
          <button
            onClick={toggleVisibility}
            className="mt-4 bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
