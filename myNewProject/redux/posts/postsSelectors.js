const getPosts = (state) => state.posts.posts;
const getOwnPosts = (state) => state.posts.ownPosts;
const getComments = (state) => state.posts.comments;

const postsSelectors = {
  getPosts,
  getOwnPosts,
  getComments,
};

export default postsSelectors;