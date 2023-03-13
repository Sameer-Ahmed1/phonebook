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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
