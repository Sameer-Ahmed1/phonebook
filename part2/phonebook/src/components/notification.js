const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    border: "solid green",
    fontSize: 50,
    padding: 5,
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
  };
  if (!message) {
    return null;
  }
  return (
    <div style={notificationStyle} className="notification">
      {message}
    </div>
  );
};

export default Notification;
