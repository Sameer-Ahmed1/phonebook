const ErrorMessage = ({ message }) => {
  const errorStyle = {
    color: "red",
    border: "solid red",
    fontSize: 50,
    padding: 5,
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
  };
  if (!message) {
    return null;
  }
  return <div style={errorStyle}>{message}</div>;
};
export default ErrorMessage;
