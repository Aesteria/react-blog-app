import { CurrentUser } from './user';

export type PostAuthor = Pick<CurrentUser, 'username' | 'photoURL' | 'id'>;

export type Post = {
  createdDate: number;
  author: PostAuthor;
  body: string;
  coverImage: string;
  title: string;
  id: string;
};

export type InitialPost = {
  author: PostAuthor;
  body: string;
  title: string;
  cover: File;
};
