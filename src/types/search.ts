import { Post } from './post';

export type SearchResultsProps = {
  show: string;
  results: Post[];
  onCloseSearch: () => void;
};
