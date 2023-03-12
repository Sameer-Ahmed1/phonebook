const mongoose = require("mongoose");
const logger = require("./../utils/logger.js");
const config = require("./../utils/config.js");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to mongoDB", error.message);
  });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: {
    type: String,
    minLength: 5,
    required: true,
  },
  url: {
    type: String,
    minLength: 10,
    required: true,
  },
  likes: {
    type: Number,
    minLength: 1,
    required: true,
  },
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
