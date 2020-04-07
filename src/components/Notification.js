import React from 'react'

const Notification = ({ message, className }) => {
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification