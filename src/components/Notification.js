import React from 'react'

const Notification = ({ notification }) => {
  return (
    <div className={notification.className}>
      {notification.message}
    </div>
  )
}

export default Notification