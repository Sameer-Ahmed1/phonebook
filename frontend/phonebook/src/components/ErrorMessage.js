const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="text-center my-3">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
