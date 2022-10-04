const Notification = ({ message, success }) => {
  const notificationColor = success
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

  if (!message) {
    return null
  }

  return (
    <div className='error' style={style}>
      {message}
    </div>
  )
}

export default Notification