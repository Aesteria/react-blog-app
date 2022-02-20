type PostAuthor = {
  avatar: string;
  username: string;
};

export type Post = {
  author: PostAuthor;
  body: string;
  title: string;
  createdDate: string;
  isVisitorOwner: boolean;
  _id: string;
};
