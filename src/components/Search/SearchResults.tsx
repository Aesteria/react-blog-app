import { Link } from 'react-router-dom';
import { SearchResultsProps } from '../../types/search';
import { formatDate } from '../../utils/formatDate';

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
          {results.map(
            ({ _id, author: { avatar, username }, title, createdDate }) => {
              const dateFormatted = formatDate(createdDate);

              return (
                <Link
                  onClick={onCloseSearch}
                  key={_id}
                  to={`/post/${_id}`}
                  className="list-group-item list-group-item-action"
                >
                  <img
                    className="avatar-tiny"
                    src={avatar}
                    alt="profile avatar"
                  />{' '}
                  <strong>{title}</strong>{' '}
                  <span className="text-muted small">
                    by {username} on {dateFormatted}
                  </span>
                </Link>
              );
            }
          )}
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
