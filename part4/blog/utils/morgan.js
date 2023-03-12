const morgan = require("morgan");
morgan.token("data", (request) => {
  return JSON.stringify(request.body);
});
const postLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :data",
  {
    skip: function (req) {
      return req.method !== "POST";
    },
  }
);
module.exports = {
  postLogger,
};
