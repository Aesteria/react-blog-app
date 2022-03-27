import { SearchResultsProps } from '../../types/search';
import PostItem from '../PostItem/PostItem';

const SearchResults = ({
  show,
  results,
  onCloseSearch,
}: SearchResultsProps) => {
  return (
    <div
      className={
        'live-search-results ' +
        (show === 'results' ? 'live-search-results--visible' : '')
      }
    >
      {Boolean(results.length) && (
        <div className="list-group shadow-sm">
          <div className="list-group-item active">
            <strong>Search Results</strong> ({results.length}
            {results.length > 1 ? ' items ' : ' item '}
            found)
          </div>
          {results.map((post) => (
            <PostItem key={post._id} post={post} onClick={onCloseSearch} />
          ))}
        </div>
      )}
      {!Boolean(results.length) && (
        <p className="alert alert-danger text-center shadow-sm">
          We could not find any results
        </p>
      )}
    </div>
  );
};

export default SearchResults;
