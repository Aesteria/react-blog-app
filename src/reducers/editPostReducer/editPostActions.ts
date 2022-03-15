import { CancelTokenSource } from 'axios';
import { Post } from '../../types/post';

type EditPostFetch = {
  type: 'fetchResolved';
  payload: Post;
};

type EditPostTitle = {
  type: 'changeTitle';
  payload: string;
};

type EditPostBody = {
  type: 'changeBody';
  payload: string;
};

type SavePostResolved = {
  type: 'saveResolved';
};

type SavePostPending = {
  type: 'savePending';
};

type SetCancelSource = {
  type: 'setCancelSource';
  payload: CancelTokenSource;
};

export type EditPostAction =
  | EditPostFetch
  | EditPostTitle
  | EditPostBody
  | SavePostResolved
  | SavePostPending
  | SetCancelSource;
