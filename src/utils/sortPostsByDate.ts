import { Post } from '../types/post';

const sortPostsByDate = (posts: Post[]) =>
  posts.slice().sort((a, b) => b.createdDate - a.createdDate);

export default sortPostsByDate;
