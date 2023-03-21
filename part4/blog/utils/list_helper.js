const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};
function totalLikes(blogs) {
  if (!blogs) return 0;
  const total = blogs.reduce((sum, a) => (sum += a.likes), 0);
  return total;
}
function favoriteBlog(blogs) {
  if (!blogs || !blogs.length) return null;
  return blogs.reduce(
    (max, crnt) => (max = crnt.likes > max.likes ? crnt : max),
    { likes: 0 }
  );
}
function mostBlogs(blogs) {
  const result = _(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      blogs: _.size(objs),
    }))
    .orderBy("blogs", "desc")
    .head();

  return result;
}
function mostLikes(blogs) {
  const result = _(blogs)
    .groupBy("likes")
    .map((objs, key) => ({ likes: +key, author: objs[0].author }))
    .orderBy("likes", "desc")
    .head();
  return result;
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
